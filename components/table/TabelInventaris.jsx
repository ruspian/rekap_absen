import { Button } from "@/components/ui/button";
import { singkatanJurusan } from "@/lib/singkatan";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

function TabelInventaris({ data, filterKelas, kelasOptions, onDelete }) {
  // filter data sesuai filterKelas
  const filteredInventaris =
    filterKelas === "Pilih Kelas"
      ? [] // Jika belum ada kelas dipilih, tampilkan array kosong
      : data
          // Pilih hanya inventaris yang memiliki kelas yang sesuai dengan filterKelas
          .filter((inventaris) =>
            inventaris.kelas.some((k) => k.id === filterKelas)
          )
          // Ubah setiap inventaris yang sudah terpilih
          .map((inventaris) => {
            // Kembalikan objek inventaris BARU
            return {
              ...inventaris, // Salin semua properti lama
              // Timpa properti 'kelas' dengan array baru yang hanya berisi kelas yang sesuai
              kelas: inventaris.kelas.filter((k) => k.id === filterKelas),
            };
          });

  return (
    <div className="bg-background max-w-[1200px] mx-auto rounded-md shadow-md border">
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          {/* Judul Utama */}
          <thead>
            <tr>
              <th
                colSpan={9}
                className="text-center font-bold text-lg bg-slate-100 text-black py-3"
              >
                DAFTAR INVENTARIS KELAS
              </th>
            </tr>
          </thead>

          {/* Header Kolom */}
          <thead className="bg-slate-100">
            {kelasOptions.map(
              (kelas) =>
                kelas.id === filterKelas && (
                  <React.Fragment key={kelas.id}>
                    <tr>
                      <th
                        className=" text-start font-normal px-2  whitespace-nowrap"
                        colSpan={2}
                      >
                        Kelas
                      </th>
                      <th
                        className=" text-start font-normal px-2  whitespace-nowrap"
                        colSpan={7}
                      >
                        : {kelas?.nama_kelas} {singkatanJurusan(kelas?.jurusan)}
                      </th>
                    </tr>
                    <tr>
                      <th
                        className=" text-start font-normal px-2  whitespace-nowrap"
                        colSpan={2}
                      >
                        Wali Kelas
                      </th>
                      <th
                        className=" text-start font-normal px-2  whitespace-nowrap"
                        colSpan={7}
                      >
                        : {kelas.waliKelas.nama}
                      </th>
                    </tr>
                    <tr>
                      <th
                        className=" text-start font-normal px-2  whitespace-nowrap"
                        colSpan={2}
                      >
                        Jumlah Siswa
                      </th>
                      <th
                        className=" text-start font-normal px-2  whitespace-nowrap"
                        colSpan={7}
                      >
                        : {kelas._count.siswa} siswa
                      </th>
                    </tr>
                    <tr>
                      <th
                        className=" text-start font-normal px-2 pb-4 whitespace-nowrap"
                        colSpan={2}
                      >
                        Tahun Ajaran
                      </th>
                      <th
                        className=" text-start font-normal px-2 pb-4 whitespace-nowrap"
                        colSpan={7}
                      >
                        : 2025/2026
                      </th>
                    </tr>
                  </React.Fragment>
                )
            )}

            <tr>
              <th className="border px-2 py-2 whitespace-nowrap">No</th>
              <th className="border px-2 py-2 whitespace-nowrap">No Kode</th>
              <th className="border px-2 py-2 whitespace-nowrap">
                Nama Barang
              </th>
              <th className="border px-2 py-2 whitespace-nowrap">
                Jumlah Awal Tahun
              </th>
              <th className="border px-2 py-2 whitespace-nowrap">
                Jumlah Akhir Tahun
              </th>
              <th className="border px-2 py-2 whitespace-nowrap">
                Kondisi Baik
              </th>
              <th className="border px-2 py-2 whitespace-nowrap">
                Kondisi Rusak
              </th>
              <th className="border px-2 py-2 whitespace-nowrap">Keterangan</th>
              <th className="border px-2 py-2 whitespace-nowrap print-hidden">
                Aksi
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {/* --- PERBAIKAN 2: Gunakan `filteredInventaris` untuk me-render data --- */}
            {filteredInventaris.length > 0 ? (
              filteredInventaris.map((inventaris, i) => (
                <tr key={inventaris.id || i} className="hover:bg-slate-50">
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {inventaris.kode || ""}
                  </td>
                  <td className="border px-2 py-1 text-start whitespace-nowrap">
                    {inventaris.nama}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {inventaris.jumlah_awal}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {inventaris.jumlah_akhir}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {inventaris.baik}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {inventaris.rusak}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {inventaris.keterangan}
                  </td>
                  <td className="border px-2 py-1 text-center print-hidden">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="cursor-pointer"
                      >
                        <Link href={`/inventaris/edit?id=${inventaris.id}`}>
                          <Pencil size={16} />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(inventaris.id)}
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
                  colSpan={9}
                  className="h-24 text-center text-gray-500 border"
                >
                  {filterKelas === "Pilih Kelas"
                    ? "Silakan pilih kelas untuk melihat data inventaris."
                    : "Tidak ada data inventaris untuk kelas ini."}
                </td>
              </tr>
            )}

            {kelasOptions.map(
              (kelas) =>
                kelas.id === filterKelas && (
                  <React.Fragment key={kelas.id}>
                    <tr>
                      <td colSpan={7}></td>
                      <td colSpan={2} className="pt-6">
                        Wali Kelas
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}></td>
                      <td colSpan={2} className="pt-16"></td>
                    </tr>
                    <tr>
                      <td colSpan={7}></td>
                      <td colSpan={2} className="font-bold underline py-4">
                        {kelas.waliKelas.nama}
                      </td>
                    </tr>
                  </React.Fragment>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { TabelInventaris };
