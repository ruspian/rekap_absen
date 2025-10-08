import { singkatanJurusan } from "@/lib/singkatan";
import TambahButtonMinat from "@/components/button/TambahButtonMinat";
import EditButtonMinat from "@/components/button/EditButtonMinat";
import React from "react";

function TabelBakatMinat({ data, kepsek, onSuccess }) {
  const [kelas] = data;

  return (
    <div className="bg-background max-w-[1200px] mx-auto rounded-md shadow-md border">
      {/* Wrapper biar bisa slide kalau overflow */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          {/* Judul Utama */}
          <thead>
            <tr>
              <th
                colSpan={11}
                className="text-center font-bold text-lg bg-slate-100 text-black py-3"
              >
                DAFTAR MINAT DAN BAKAT
                <br />
                SISWA SMK SALAFIYAH SYAFI'IYAH <br />
                TP. 2025/2026
              </th>
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
            {data ? (
              data.map((siswa, i) => {
                // Tentukan jumlah baris yang dibutuhkan untuk siswa ini. Default 1 jika siswa tidak punya bakat.
                const rowCount =
                  siswa.bakatMinat?.length > 0 ? siswa.bakatMinat.length : 1;

                // Jika siswa tidak punya bakat, tampilkan satu baris dengan data placeholder.
                if (!siswa.bakatMinat || siswa.bakatMinat.length === 0) {
                  return (
                    <tr key={siswa.id || i} className="hover:bg-slate-50">
                      <td className="border px-2 py-1 text-center whitespace-nowrap align-top">
                        {i + 1}
                      </td>
                      <td className="border px-2 py-1 text-center whitespace-nowrap align-top">
                        {siswa.nama}
                      </td>
                      <td className="border px-2 py-1 text-center whitespace-nowrap">
                        -
                      </td>
                      <td className="border px-2 py-1 text-center whitespace-nowrap">
                        -
                      </td>
                      <td className="border px-2 py-1 text-center print-hidden">
                        <div className="flex gap-2 items-center justify-center">
                          <TambahButtonMinat siswa={siswa} />
                        </div>
                      </td>
                    </tr>
                  );
                }

                // map jika siswa punya bakat
                return siswa.bakatMinat.map((bakatMinat, index) => (
                  <tr
                    key={bakatMinat.id || `${siswa.id}-${index}`}
                    className="hover:bg-slate-50"
                  >
                    {index === 0 && (
                      <>
                        <td
                          rowSpan={rowCount}
                          className="border px-2 py-1 text-center whitespace-nowrap align-center"
                        >
                          {i + 1}
                        </td>
                        <td
                          rowSpan={rowCount}
                          className="border px-2 py-1 text-center whitespace-nowrap align-center"
                        >
                          {siswa.nama}
                        </td>
                      </>
                    )}
                    <td className="border px-2 py-1 text-center whitespace-nowrap">
                      {bakatMinat?.bakat || "-"}
                    </td>
                    <td className="border px-2 py-1 text-center whitespace-nowrap">
                      {bakatMinat?.keterangan || "-"}
                    </td>
                    <td className="border px-2 py-1 text-center print-hidden">
                      <div className="flex gap-2 items-center justify-center">
                        <TambahButtonMinat
                          siswa={siswa}
                          onSuccess={onSuccess}
                        />
                        <EditButtonMinat
                          bakat={bakatMinat}
                          onSuccess={onSuccess}
                          siswa={siswa}
                        />
                      </div>
                    </td>
                  </tr>
                ));
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
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
