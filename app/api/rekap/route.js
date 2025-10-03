import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// AMBIL DATA REKAP KEHADIRAN
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const kelasId = searchParams.get("kelasId");
  const bulanId = searchParams.get("bulanId");

  try {
    const whereClause = {};
    if (bulanId) whereClause.bulanId = bulanId;
    if (kelasId) whereClause.siswa = { kelasId };

    const rawData = await prisma.rekapKehadiran.findMany({
      where: whereClause,
      include: {
        siswa: { include: { kelas: true } },
        bulan: true,
        minggu: true,
      },
      orderBy: [{ siswa: { nama: "asc" } }, { minggu: { nomorMinggu: "asc" } }],
    });

    if (rawData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Grouping per siswa
    const grouped = rawData.reduce((acc, item) => {
      const id = item.siswa.id;
      if (!acc[id]) {
        acc[id] = {
          siswa: item.siswa,
          bulan: item.bulan,
          minggu: {},
          total: { sakit: 0, izin: 0, alfa: 0 },
        };
      }
      acc[id].minggu[item.minggu.nomorMinggu] = {
        sakit: item.sakit ?? 0,
        izin: item.izin ?? 0,
        alfa: item.alfa ?? 0,
      };
      acc[id].total.sakit += item.sakit ?? 0;
      acc[id].total.izin += item.izin ?? 0;
      acc[id].total.alfa += item.alfa ?? 0;
      return acc;
    }, {});

    return NextResponse.json(Object.values(grouped), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// BUAT ATAU EDIT DATA REKAP KEHADIRAN
export const POST = async (req) => {
  try {
    const body = await req.json();
    const session = await auth();

    // pastikan user login dan role admin
    if (!session || session.user.role !== "admin") {
      return new NextResponse(JSON.stringify({ message: "Akses Ditolak!" }), {
        status: 401,
      });
    }
    const { siswaId, bulanId, minggu } = body;

    // proses semua minggu
    const results = await Promise.all(
      minggu.map((m) =>
        prisma.rekapKehadiran.upsert({
          where: {
            siswaId_mingguId: {
              siswaId,
              mingguId: m.mingguId,
            },
          },
          update: {
            alfa: m.alfa,
            izin: m.izin,
            sakit: m.sakit,
          },
          create: {
            siswaId,
            bulanId,
            mingguId: m.mingguId,
            alfa: m.alfa,
            izin: m.izin,
            sakit: m.sakit,
          },
        })
      )
    );

    return new NextResponse(JSON.stringify({ success: true, data: results }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
};
