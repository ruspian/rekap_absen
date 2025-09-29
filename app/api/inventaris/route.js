import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// AMBIL DATA INVENTARIS
export const GET = async (req) => {
  try {
    const getInventaris = await prisma.inventaris.findMany({
      include: {
        kelas: true,
      },
    });

    return NextResponse.json(getInventaris, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};

// TAMBAH DATA INVENTARIS
export const POST = async (req) => {
  const session = await auth();

  if (!session || !session.user.role === "admin") {
    return NextResponse.json(
      { error: "Akses ditolak!" },
      {
        status: 401,
      }
    );
  }

  const body = await req.json();
  const { nama, jumlah_awal, jumlah_akhir, baik, rusak, keterangan, kelas } =
    body;

  try {
    const newInventaris = await prisma.inventaris.create({
      data: {
        nama: nama,
        jumlah_awal: parseInt(jumlah_awal),
        jumlah_akhir: parseInt(jumlah_akhir),
        baik: parseInt(baik),
        rusak: parseInt(rusak),
        keterangan: keterangan,
        kelas: {
          connect: kelas ? [{ id: kelas }] : undefined, // Hubungkan dengan kelas jika ada
        },
      },
    });

    if (!newInventaris) {
      return NextResponse.json(
        { error: "Gagal menambahkan inventaris!" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(newInventaris, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};
