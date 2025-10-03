import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req) => {
  try {
    const namaBulanSekarang = new Date().toLocaleString("id-ID", {
      month: "long",
    });

    // Siapkan klausa 'where' untuk selalu memfilter berdasarkan bulan saat ini
    const whereClause = { bulan: { namaBulan: namaBulanSekarang } };

    // Ambil 5 siswa dengan ALFA terbanyak
    const alfaTerbanyak = await prisma.rekapKehadiran.groupBy({
      by: ["siswaId"], // Kelompokkan berdasarkan ID siswa
      where: whereClause,
      _sum: {
        alfa: true,
      },
      orderBy: {
        _sum: {
          alfa: "desc", // Urutkan dari total alfa terbanyak
        },
      },

      take: 5,
    });

    const sakitTerbanyak = await prisma.rekapKehadiran.groupBy({
      by: ["siswaId"],
      where: whereClause,
      _sum: {
        sakit: true,
      },
      orderBy: {
        _sum: {
          sakit: "desc",
        },
      },

      take: 5,
    });

    const izinTerbanyak = await prisma.rekapKehadiran.groupBy({
      by: ["siswaId"],
      where: whereClause,
      _sum: {
        izin: true,
      },
      orderBy: {
        _sum: {
          izin: "desc",
        },
      },

      take: 5,
    });

    // Kumpulkan semua ID siswa yang relevan untuk diambil datanya
    const siswaIds = [
      ...new Set([
        ...alfaTerbanyak.map((item) => item.siswaId),
        ...sakitTerbanyak.map((item) => item.siswaId),
        ...izinTerbanyak.map((item) => item.siswaId),
      ]),
    ];

    // Ambil detail data siswa berdasarkan ID yang sudah dikumpulkan
    const detailSiswa = await prisma.siswa.findMany({
      where: {
        id: {
          in: siswaIds,
        },
      },
      include: {
        kelas: true,
      },
    });

    // Gabungkan data total absensi dengan detail siswa untuk respons yang lengkap
    const formatResponse = (dataList) => {
      return dataList.map((item) => {
        const siswaInfo = detailSiswa.find((s) => s.id === item.siswaId);
        return {
          siswa: siswaInfo,
          total: item._sum,
        };
      });
    };

    // Kirim respons
    return NextResponse.json({
      alfa: formatResponse(alfaTerbanyak),
      sakit: formatResponse(sakitTerbanyak),
      izin: formatResponse(izinTerbanyak),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
};
