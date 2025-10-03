"use client";

import { useToaster } from "@/providers/ToasterProvider";
import React, { useEffect, useState } from "react";

export default function TabelRekapKehadiran({
  data: initialData = [],
  namaKelas,
  jurusan,
  namaBulan,
  bulan,
  minggu = [],
  dataSiswa = [],
}) {
  const [data, setData] = useState([]);
  const toaster = useToaster();

  // fallback 4 minggu
  const defaultWeeks = Array.from({ length: 4 }, (_, i) => ({
    nomorMinggu: i + 1,
  }));

  // filter minggu sesuai bulan
  const mingguList =
    minggu.length > 0
      ? minggu.filter((m) => m.bulanId === bulan?.id)
      : defaultWeeks;

  // jumlah minggu / bulan
  const weeksCount = mingguList.length;
  const totalCols = 2 + weeksCount * 3 + 3 + 1;

  useEffect(() => {
    // kalau belum pilih kelas, tampilkan data kosong
    if (!namaKelas) return;

    // kalau belum pilih data siswa, tampilkan data kosong
    const siswaArray = Array.isArray(dataSiswa)
      ? dataSiswa
      : dataSiswa.siswa || [];

    // filter siswa berdasarkan kelas
    const siswaKelas = siswaArray.filter(
      (s) => s.kelas?.nama_kelas === namaKelas
    );

    // kalau belum pilih bulan, tampilkan data kosong
    if (!bulan) {
      const mapped = siswaKelas.map((siswa) => ({
        siswa,
        siswaId: siswa.id,
        kelasId: siswa.kelasId,
        bulanId: null,
        minggu: defaultWeeks.reduce((acc, wk) => {
          acc[wk.nomorMinggu] = { alfa: 0, izin: 0, sakit: 0 };
          return acc;
        }, {}),
      }));
      setData(mapped);
      return;
    }

    // kalau bulan sudah dipilih, cek data rekap
    const mapped = siswaKelas.map((siswa) => {
      const existing =
        initialData.find(
          (r) => r.siswa?.id === siswa.id && r.bulan?.id === bulan.id
        ) || {};

      // kalau data rekap belum ada, buat objek baru
      const mingguData = {};
      mingguList.forEach((wk) => {
        const existingMinggu = existing.minggu?.[wk.nomorMinggu] || {};
        mingguData[wk.nomorMinggu] = {
          alfa: existingMinggu.alfa ?? 0,
          izin: existingMinggu.izin ?? 0,
          sakit: existingMinggu.sakit ?? 0,
        };
      });

      // buat objek baru
      return {
        siswa,
        siswaId: siswa.id,
        kelasId: siswa.kelasId,
        bulanId: bulan.id,
        minggu: mingguData,
      };
    });

    setData(mapped);
  }, [initialData, dataSiswa, namaKelas, bulan, minggu]);

  const handleChange = (index, nomorMinggu, field, value) => {
    setData((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        minggu: {
          ...copy[index].minggu,
          [nomorMinggu]: {
            ...copy[index].minggu[nomorMinggu],
            [field]: value,
          },
        },
      };
      return copy;
    });
  };

  // fungsi simpan
  const handleSave = async (rekap) => {
    try {
      // jika belum pilih bulan, tampilkan error
      if (!bulan) throw new Error("Pilih bulan terlebih dahulu!");

      // payload yang dikirim ke API
      const payload = {
        siswaId: rekap.siswaId,
        bulanId: bulan.id,
        minggu: mingguList.map((m) => {
          const item = rekap.minggu[m.nomorMinggu] || {};
          return {
            mingguId: m.id,
            alfa: Number(item.alfa) || 0,
            izin: Number(item.izin) || 0,
            sakit: Number(item.sakit) || 0,
          };
        }),
      };

      // kirim data ke API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rekap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // jika gagal, tampilkan error
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();

      toaster.current?.show({
        title: "Sukses!",
        message: result.message || "Berhasil menyimpan data.",
        variant: "success",
        duration: 4000,
        position: "top-center",
      });
    } catch (err) {
      toaster.current?.show({
        title: "Gagal!",
        message: err.message,
        variant: "error",
        duration: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-md p-4">
      <table className="table-auto border-collapse w-full text-sm">
        <thead>
          <tr>
            <th
              colSpan={totalCols}
              className="text-center font-bold text-lg py-3 bg-slate-100"
            >
              REKAP KEHADIRAN KELAS {namaKelas?.toUpperCase()}{" "}
              {jurusan?.toUpperCase()}
            </th>
          </tr>
          <tr>
            <th rowSpan={3} className="border px-2 py-2">
              No
            </th>
            <th rowSpan={3} className="border px-2 py-2">
              Nama
            </th>
            <th colSpan={weeksCount * 3 + 3} className="border px-2 py-2">
              {namaBulan || "Bulan"}
            </th>
            <th rowSpan={3} className="border px-2 py-2 print-hidden">
              Aksi
            </th>
          </tr>
          <tr>
            {mingguList.map((m) => (
              <th key={m.nomorMinggu} colSpan={3} className="border px-2 py-1">
                Minggu {m.nomorMinggu}
              </th>
            ))}
            <th colSpan={3} className="border px-2 py-1">
              Jumlah
            </th>
          </tr>
          <tr>
            {mingguList.flatMap((m) =>
              ["A", "I", "S"].map((label) => (
                <th key={`${m.nomorMinggu}-${label}`} className="border px-2">
                  {label}
                </th>
              ))
            )}
            <th className="border px-2 w-18">A</th>
            <th className="border px-2 w-18">I</th>
            <th className="border px-2 w-18">S</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((rekap, idx) => {
              const totalAlfa = mingguList.reduce(
                (sum, m) =>
                  sum + Number(rekap.minggu[m.nomorMinggu]?.alfa || 0),
                0
              );
              const totalIzin = mingguList.reduce(
                (sum, m) =>
                  sum + Number(rekap.minggu[m.nomorMinggu]?.izin || 0),
                0
              );
              const totalSakit = mingguList.reduce(
                (sum, m) =>
                  sum + Number(rekap.minggu[m.nomorMinggu]?.sakit || 0),
                0
              );

              return (
                <tr key={rekap.siswaId}>
                  <td className="border px-2 text-center w-6">{idx + 1}</td>
                  <td className="border px-2">{rekap.siswa?.nama}</td>
                  {mingguList.map((m) => (
                    <React.Fragment key={m.nomorMinggu}>
                      {["alfa", "izin", "sakit"].map((field) => (
                        <td
                          key={`${m.nomorMinggu}-${field}`}
                          className="border"
                        >
                          <input
                            type="number"
                            min={0}
                            className="w-18 text-center"
                            value={rekap.minggu[m.nomorMinggu]?.[field] ?? 0}
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
                  <td className="w-18 border text-center">{totalAlfa}</td>
                  <td className="w-18 border text-center">{totalIzin}</td>
                  <td className="w-18 border text-center">{totalSakit}</td>
                  <td className="border text-center">
                    <button
                      onClick={() => handleSave(rekap)}
                      className="px-1 py-1 m-2 bg-emerald-500 text-white rounded text-xs hover:bg-emerald-600"
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
                className="text-center text-gray-500 py-4 border"
              >
                Tidak ada data siswa untuk kelas ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
