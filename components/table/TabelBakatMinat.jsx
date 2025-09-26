import { singkatanJurusan } from "@/lib/singkatan";
import TambahButtonMinat from "@/components/button/TambahButtonMinat";
import EditButtonMinat from "@/components/button/EditButtonMinat";

function TabelBakatMinat({ data, kepsek, bakat, onSuccess }) {
  const [kelas] = data;

  console.log("data tabel bakat minat:", data);
  console.log("data bakat minat:", bakat);

  return (
    <div className="bg-background max-w-[1200px] mx-auto rounded-md shadow-md border">
      {/* Wrapper biar bisa slide kalau overflow */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          {/* Judul Utama */}
          <thead>
            <tr>
              {kelas?.kelasId && (
                <th
                  colSpan={11}
                  className="text-center font-bold text-lg bg-slate-100 text-black py-3"
                >
                  DAFTAR MINAT DAN BAKAT
                  <br />
                  SISWA SMK SALAFIYAH SYAFI'IYAH <br />
                  TP. 2025/2026
                </th>
              )}
            </tr>
          </thead>

          {/* Header Kolom */}
          <thead className="bg-slate-100">
            <tr>
              <th colSpan={11} className="text-start font-medium px-2 py-2">
                KELAS : {kelas?.kelas?.nama_kelas}{" "}
                {singkatanJurusan(kelas?.kelas?.jurusan)}
              </th>
            </tr>
            <tr>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                No
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Nama
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Minat/Bakat
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Keterangan
              </th>

              <th
                className="border px-2 py-2 whitespace-nowrap print-hidden"
                rowSpan={2}
              >
                Aksi
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length ? (
              bakat.map((bakat, i) => (
                <tr key={bakat.id || i} className="hover:bg-slate-50">
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {bakat.siswa.nama}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {bakat.bakat}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {bakat.keterangan}
                  </td>

                  <td className="border px-2 py-1 text-center print-hidden">
                    <div className="flex gap-2 items-center justify-center">
                      <TambahButtonMinat siswa={bakat.siswa} />
                      <EditButtonMinat bakat={bakat} onSuccess={onSuccess} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="h-24 text-center text-gray-500 border"
                >
                  Data Siswa Kosong!
                </td>
              </tr>
            )}

            <tr>
              <td colSpan={11} className="text-start font-medium px-6 py-8">
                Mengetahui
                <br />
                Kepala Sekolah
                <br />
                <br />
                <br />
                <br />
                <u>
                  <b>{kepsek?.nama}</b>
                </u>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { TabelBakatMinat };
