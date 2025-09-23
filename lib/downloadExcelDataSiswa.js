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
