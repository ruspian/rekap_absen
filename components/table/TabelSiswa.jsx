import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { formatTanggal } from "@/lib/formatTanggal";
import Link from "next/link";

function TableSiswa({ data, onDelete }) {
  const [kelas] = data;

  return (
    <div className="bg-background max-w-[1200px] mx-auto rounded-md shadow-md border">
      {/* Wrapper biar bisa slide kalau overflow */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          {/* Judul Utama */}
          <thead>
            <tr>
              {kelas?.kelasId ? (
                <th
                  colSpan={11}
                  className="text-center font-bold text-lg bg-slate-100 text-black py-3"
                >
                  DATA SISWA KELAS {kelas?.kelas?.nama_kelas}{" "}
                  {kelas?.kelas?.jurusan.toUpperCase()}
                </th>
              ) : (
                <th
                  colSpan={11}
                  className="text-center font-bold text-lg bg-slate-100 text-black py-3"
                >
                  DATA SISWA
                </th>
              )}
            </tr>
          </thead>

          {/* Header Kolom */}
          <thead className="bg-slate-100">
            <tr>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                No
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Nama
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Jenis Kelamin
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Tempat Lahir
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Tanggal Lahir
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" colSpan={2}>
                Nama Orang Tua
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" colSpan={2}>
                No HP
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Alamat
              </th>
              <th
                className="border px-2 py-2 whitespace-nowrap print-hidden"
                rowSpan={2}
              >
                Aksi
              </th>
            </tr>
            <tr>
              <th className="border px-2 py-1 whitespace-nowrap">Ayah</th>
              <th className="border px-2 py-1 whitespace-nowrap">Ibu</th>
              <th className="border px-2 py-1 whitespace-nowrap">Ayah</th>
              <th className="border px-2 py-1 whitespace-nowrap">Ibu</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length ? (
              data.map((siswa, i) => (
                <tr key={siswa.id || i} className="hover:bg-slate-50">
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {siswa.nama}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {siswa.gender}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {siswa.tempat_lahir}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {formatTanggal(siswa.tanggal_lahir)}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {siswa.nama_ayah}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {siswa.nama_ibu}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {siswa.no_hp_ayah}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {siswa.no_hp_ibu}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {siswa.alamat}
                  </td>
                  <td className="border px-2 py-1 text-center print-hidden">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <Link href={`/siswa/edit?id=${siswa.id}`}>
                          <Pencil size={16} />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(siswa.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </Button>
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

export { TableSiswa };
