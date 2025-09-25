"use client";

import { useToaster } from "@/providers/ToasterProvider";
import React, { useEffect, useState } from "react";

export default function TabelRekapKehadiran({
  data: initialData,
  namaKelas,
  jurusan,
  namaBulan,
  bulan,
  minggu = [],
}) {
  const [data, setData] = useState([]);

  const toaster = useToaster();

  // fallback 4 minggu jika tidak ada data minggu
  const defaultWeeks = Array.from({ length: 4 }, (_, i) => ({
    nomorMinggu: i + 1,
  }));

  // Filter minggu agar hanya render minggu sesuai bulan yang dipilih
  const mingguList =
    minggu.length > 0
      ? minggu.filter((m) => m.bulanId === bulan?.id)
      : defaultWeeks;

  const weeksCount = mingguList.length;
  const totalCols = 2 + weeksCount * 3 + 3 + 1; // No + Nama + (3 per minggu) + total + aksi

  useEffect(() => {
    if (!Array.isArray(initialData)) return;

    // Normalisasi data biar pasti ada key minggu
    const mapped = initialData.map((rekap) => {
      const siswa = rekap.siswa || {};
      const mingguData = {};

      mingguList.forEach((wk) => {
        const nomor = wk.nomorMinggu;
        mingguData[nomor] = {
          alfa: rekap.minggu?.[nomor]?.alfa ?? 0,
          izin: rekap.minggu?.[nomor]?.izin ?? 0,
          sakit: rekap.minggu?.[nomor]?.sakit ?? 0,
        };
      });

      return {
        ...rekap,
        siswa,
        minggu: mingguData,
      };
    });

    setData(mapped);
  }, [initialData, minggu]);

  // Handle perubahan input angka
  const handleChange = (index, nomorMinggu, field, value) => {
    // simpan perubahan di state
    setData((prev) => {
      const copy = [...prev]; // copy array
      copy[index] = {
        ...copy[index],
        minggu: {
          ...copy[index].minggu,
          [nomorMinggu]: {
            ...copy[index].minggu[nomorMinggu],
            [field]: value, // simpan string dulu
          },
        },
      };
      return copy;
    });
  };

  // Simpan data ke API
  const handleSave = async (rekap) => {
    try {
      // buat payload untuk dikirim ke API
      const payload = {
        siswaId: rekap.siswa?.id,
        bulanId: bulan?.id,
        minggu: mingguList.map((m) => {
          const dataMinggu = rekap.minggu[m.nomorMinggu] || {};
          return {
            mingguId: m.id,
            alfa: Number(dataMinggu.alfa) || 0,
            izin: Number(dataMinggu.izin) || 0,
            sakit: Number(dataMinggu.sakit) || 0,
          };
        }),
      };

      // Kirim data ke API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rekap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Gagal menyimpan");
      }

      const result = await res.json();
      toaster.current?.show({
        title: "Sukses!",
        message: result.message || "Berhasil menyimpan data.",
        variant: "success",
        duration: 5000,
        position: "top-center",
      });
    } catch (err) {
      toaster.current?.show({
        title: "Gagal!",
        message: err.message || "Terjadi kesalahan.",
        variant: "error",
        duration: 5000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-md p-4">
      <table className="table-auto border-collapse w-full text-sm">
        <thead>
          {/* Judul Tabel */}
          <tr>
            <th
              colSpan={totalCols}
              className="text-center font-bold text-lg py-3 bg-slate-100"
            >
              REKAP KEHADIRAN SISWA{" "}
              {namaKelas && jurusan
                ? `KELAS ${namaKelas.toUpperCase()} ${jurusan.toUpperCase()}`
                : ""}
            </th>
          </tr>

          {/* Header atas */}
          <tr>
            <th rowSpan={3} className="border px-2 py-2">
              No
            </th>
            <th rowSpan={3} className="border px-2 py-2">
              Nama
            </th>

            <th colSpan={weeksCount * 3 + 3} className="border px-2 py-2">
              {namaBulan || "BULAN"}
            </th>

            <th rowSpan={3} className="border px-2 py-2 print-hidden">
              Aksi
            </th>
          </tr>

          {/* Header Minggu */}
          <tr>
            {mingguList.map((m) => (
              <th key={m.nomorMinggu} colSpan={3} className="border px-2 py-1">
                Minggu {m.nomorMinggu}
              </th>
            ))}
            <th className="border px-2 py-1" colSpan={3}>
              Jumlah
            </th>
          </tr>

          {/* Header S, I, A */}
          <tr>
            {mingguList.flatMap((m) =>
              ["A", "I", "S"].map((label) => (
                <th
                  key={`${m.nomorMinggu}-${label}`}
                  className="border px-2 py-1"
                >
                  {label}
                </th>
              ))
            )}
            <th className="border px-2 py-1">A</th>
            <th className="border px-2 py-1">I</th>
            <th className="border px-2 py-1">S</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((rekap, idx) => {
              // hitung total tiap baris
              const totalAlfa = mingguList.reduce(
                (sum, m) =>
                  sum + (Number(rekap.minggu[m.nomorMinggu]?.alfa) || 0),
                0
              );
              const totalIzin = mingguList.reduce(
                (sum, m) =>
                  sum + (Number(rekap.minggu[m.nomorMinggu]?.izin) || 0),
                0
              );
              const totalSakit = mingguList.reduce(
                (sum, m) =>
                  sum + (Number(rekap.minggu[m.nomorMinggu]?.sakit) || 0),
                0
              );

              return (
                <tr key={rekap.siswa?.id || idx} className="hover:bg-slate-50">
                  <td className="border px-2 py-1 text-center">{idx + 1}</td>
                  <td className="border px-2 py-1">
                    {rekap.siswa?.nama || "-"}
                  </td>

                  {mingguList.map((m) => (
                    <React.Fragment key={m.nomorMinggu}>
                      {["alfa", "izin", "sakit"].map((field) => (
                        <td
                          key={`${rekap.siswa?.id}-${m.nomorMinggu}-${field}`}
                          className="border px-2 py-1 text-center"
                        >
                          <input
                            type="number"
                            min={0}
                            className="w-12 text-center rounded"
                            value={rekap.minggu[m.nomorMinggu]?.[field] ?? ""}
                            onChange={(e) =>
                              handleChange(
                                idx,
                                m.nomorMinggu,
                                field,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      ))}
                    </React.Fragment>
                  ))}

                  {/* Total */}
                  <td className="text-center border px-2 py-1">{totalAlfa}</td>
                  <td className="text-center border px-2 py-1">{totalIzin}</td>
                  <td className="text-center border px-2 py-1">{totalSakit}</td>

                  {/* Aksi */}
                  <td className="border px-2 py-1 text-center print-hidden">
                    <button
                      onClick={() => handleSave(rekap)}
                      className="px-2 py-1 bg-emerald-500 text-white rounded text-xs cursor-pointer hover:bg-emerald-600 disabled:opacity-50"
                    >
                      Simpan
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={totalCols}
                className="h-24 text-center text-gray-500 border"
              >
                Data Kosong!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
