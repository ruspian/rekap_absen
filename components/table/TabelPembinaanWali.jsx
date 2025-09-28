import { singkatanJurusan } from "@/lib/singkatan";
import TambahPembinaanWaliButton from "../button/TambahPembinaanWaliButton";
import { formatTanggal } from "@/lib/formatTanggal";

function TabelPembinaanWali({ data, pembinaanWali }) {
  const [kelas] = data;

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
                  colSpan={12}
                  className="text-center font-bold text-lg bg-slate-100 text-black py-3"
                >
                  DAFTAR PEMBINAAN SISWA
                </th>
              )}
            </tr>
          </thead>

          {/* Header Kolom */}
          <thead className="bg-slate-100">
            <tr>
              <th colSpan={12} className="text-start font-medium px-2 py-2">
                KELAS : {kelas?.kelas?.nama_kelas}{" "}
                {singkatanJurusan(kelas?.kelas?.jurusan)}
              </th>
            </tr>
            <tr>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                No
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Tanggal
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Nama
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Uraian Kejadian
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Tanggapan Siswa
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Arahan Wali Kelas
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Tindak Lanjut
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                TTD Siswa
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                TTD Wali Siswa
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Surat Perjanjian
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
              pembinaanWali.map((binaanWali, i) => (
                <tr key={pembinaanWali.id || i} className="hover:bg-slate-50">
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {formatTanggal(binaanWali.tanggal)}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {binaanWali.siswa.nama}
                  </td>

                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {binaanWali.uraian_kejadian}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {binaanWali.tanggapan_siswa}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {binaanWali.arahan}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {binaanWali.kesepakatan}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {""}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {""}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {binaanWali.no_surat}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {""}
                  </td>

                  <td className="border px-2 py-1 text-center print-hidden">
                    <div className="flex gap-2 items-center justify-center">
                      <TambahPembinaanWaliButton siswa={binaanWali.siswa} />
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { TabelPembinaanWali };
