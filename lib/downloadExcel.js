import { formatTanggal } from "./formatTanggal";
import * as XLSX from "xlsx";

// FUNGSI DOWNLOAD EXCEL
export const handleDownloadExcelDataSiswa = (dataSiswa) => {
  // Mapping data sesuai field yang mau ditampilkan
  const cleanData = dataSiswa.map((siswa, index) => ({
    No: index + 1,
    Nama: siswa.nama,
    Jenis_Kelamin: siswa.gender || "-",
    Tempat_Lahir: siswa.tempat_lahir || "-",
    Tanggal_Lahir: formatTanggal(siswa.tanggal_lahir) || "-",
    No_Hp_Ayah: siswa.no_hp_ayah || "-",
    No_Hp_ibu: siswa.no_hp_ibu || "-",
    Nama_Ayah: siswa.nama_ayah || "-",
    Nama_Ibu: siswa.nama_ibu || "-",
    Alamat: siswa.alamat || "-",
  }));

  // Convert ke worksheet
  const worksheet = XLSX.utils.json_to_sheet(cleanData);

  // Atur lebar kolom biar rapi
  worksheet["!cols"] = [
    { wch: 5 }, // No
    { wch: 25 }, // Nama
    { wch: 15 }, // Jenis Kelamin
    { wch: 20 }, // Tempat Lahir
    { wch: 15 }, // Tanggal Lahir
    { wch: 15 }, // no hp ayah
    { wch: 15 }, // no hp ibu
    { wch: 25 }, // Ayah
    { wch: 25 }, // Ibu
    { wch: 25 }, // alamat
  ];

  // Buat workbook & export
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");
  XLSX.writeFile(workbook, "data-siswa.xlsx");
};

// FUNGSI DOWNLOAD EXCEL REKAP KEHADIRAN
export const handleDownloadExcelRekapKehadiran = (
  dataMinggu,
  rekapKehadiran,
  selectedBulan
) => {
  // ambil data minggu
  const mingguList =
    dataMinggu && dataMinggu.length > 0
      ? Array.from(new Map(dataMinggu.map((m) => [m.nomorMinggu, m])).values())
      : Array.from({ length: 4 }, (_, i) => ({ nomorMinggu: i + 1 }));

  // jumlah minggu / bulan
  const weeksCount = mingguList.length;

  // ambil nama bulan
  const monthName =
    selectedBulan?.namaBulan ||
    (rekapKehadiran && rekapKehadiran[0]?.bulan?.namaBulan) ||
    "BULAN";

  // kolom: No, Nama, (weeksCount * 3 cols), Jumlah(3), Aksi(1)
  const totalCols = 2 + weeksCount * 3 + 3 + 1;
  const jumStart = 2 + weeksCount * 3; // index kolom untuk awal "Jumlah"

  // --- buat header ---
  const headerRow0 = Array(totalCols).fill("");
  headerRow0[0] = "No";
  headerRow0[1] = "Nama";
  headerRow0[2] = monthName;
  headerRow0[jumStart] = "Jumlah";

  const headerRow1 = Array(totalCols).fill("");
  // Minggu parent (span 3 kolom masing-masing)
  mingguList.forEach((m, i) => {
    headerRow1[2 + i * 3] = `Minggu ${m.nomorMinggu}`;
  });
  // headerRow1[jumStart] tetap kosong karena "Jumlah" parent di row0

  const headerRow2 = Array(totalCols).fill("");
  // subheaders Alfa / Izin / Sakit per minggu
  mingguList.forEach((m, i) => {
    headerRow2[2 + i * 3] = "Alfa";
    headerRow2[2 + i * 3 + 1] = "Izin";
    headerRow2[2 + i * 3 + 2] = "Sakit";
  });
  // subheaders untuk Jumlah
  headerRow2[jumStart] = "Alfa";
  headerRow2[jumStart + 1] = "Izin";
  headerRow2[jumStart + 2] = "Sakit";
  // aksi kolom di row2 bisa kosong

  // --- DATA ROWS ---
  const rows = rekapKehadiran.map((item, idx) => {
    // urutkan data per minggu
    const mingguVals = mingguList.flatMap((m) => {
      // jika tidak ada data minggu, default 0
      const nilai = item.minggu?.[m.nomorMinggu] ?? {
        alfa: 0,
        izin: 0,
        sakit: 0,
      };
      // pastikan angka
      return [
        Number(nilai.alfa) || 0,
        Number(nilai.izin) || 0,
        Number(nilai.sakit) || 0,
      ];
    });

    // jumlah tiap kategori
    const totalAlfa = mingguList.reduce(
      (s, m) => s + (Number(item.minggu?.[m.nomorMinggu]?.alfa) || 0),
      0
    );
    const totalIzin = mingguList.reduce(
      (s, m) => s + (Number(item.minggu?.[m.nomorMinggu]?.izin) || 0),
      0
    );
    const totalSakit = mingguList.reduce(
      (s, m) => s + (Number(item.minggu?.[m.nomorMinggu]?.sakit) || 0),
      0
    );

    // susun baris: No, Nama, [minggu vals], JumlahAlfa, JumlahIzin, JumlahSakit, Aksi (kosong)
    return [
      idx + 1,
      item.siswa?.nama ?? "-",
      ...mingguVals,
      totalAlfa,
      totalIzin,
      totalSakit,
    ];
  });

  // gabungkan header + data
  const sheetData = [headerRow0, headerRow1, headerRow2, ...rows];

  // buat worksheet dari array-of-arrays
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  // --- merges ---
  // s = start, e = end
  // r = row, c = col
  const merges = [];

  // No & Nama (rowspan 3)
  merges.push({ s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }); // No
  merges.push({ s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }); // Nama

  // gabungkan monthName (baris 0) di seluruh weeksCount * 3 kolom dimulai dari kolom 2
  if (weeksCount * 3 > 0) {
    merges.push({
      s: { r: 0, c: 2 },
      e: { r: 0, c: 2 + weeksCount * 3 - 1 },
    });
  } else {
    // jika tidak ada minggu, monthName tetap di kolom 2 tanpa merge
  }

  // Jumlah parent (rowspan 1, colspan 3)
  merges.push({
    s: { r: 1, c: jumStart },
    e: { r: 0, c: jumStart + 2 },
  });

  // setiap Minggu parent di row1 spanning 3 cols
  mingguList.forEach((_, i) => {
    merges.push({
      s: { r: 1, c: 2 + i * 3 },
      e: { r: 1, c: 2 + i * 3 + 2 },
    });
  });

  worksheet["!merges"] = merges;

  // kolom lebar (opsional)
  const cols = [
    { wch: 5 }, // No
    { wch: 30 }, // Nama
    // untuk minggu: tiap 3 kolom set wch
    ...Array(weeksCount * 3).fill({ wch: 8 }),
    { wch: 10 }, // Jumlah Alfa
    { wch: 10 }, // Jumlah Izin
    { wch: 10 }, // Jumlah Sakit
    { wch: 12 }, // Aksi
  ];
  worksheet["!cols"] = cols;

  // buat workbook & simpan
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Kehadiran");
  XLSX.writeFile(workbook, `rekap-kehadiran-${monthName || "bulan"}.xlsx`);
};
