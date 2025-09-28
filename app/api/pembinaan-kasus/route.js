import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// BUAT DATA PEMBINAAN KASUS
export const POST = async (req) => {
  const session = await auth();

  // pastikan user sudah login dan role admin
  if (!session || !session.user.role === "admin") {
    return NextResponse.json({ message: "Akses Ditolak!" }, { status: 401 });
  }

  const body = await req.json();
  const {
    siswaId,
    tanggal,
    uraian_kejadian,
    tanggapan_siswa,
    arahan,
    kesepakatan,
  } = body;

  try {
    const pembinaanKasus = await prisma.pembinaanKasus.create({
      data: {
        siswaId: siswaId,
        tanggal: new Date(tanggal),
        uraian_kejadian: uraian_kejadian,
        tanggapan_siswa: tanggapan_siswa,
        arahan: arahan,
        kesepakatan: kesepakatan,
      },
    });

    if (!pembinaanKasus) {
      return NextResponse.json(
        { message: "Gagal membuat pembinaan kasus!" },
        { status: 400 }
      );
    }

    return NextResponse.json(pembinaanKasus, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan server!" },
      { status: 500 }
    );
  }
};

// AMBIL DATA PEMBINAAN KASUS
export const GET = async (req) => {
  try {
    const getPembinaanKasus = await prisma.pembinaanKasus.findMany({
      include: {
        siswa: true,
      },
    });

    if (!getPembinaanKasus) {
      return NextResponse.json(
        { message: "Gagal mengambil data pembinaan kasus!" },
        { status: 400 }
      );
    }

    return NextResponse.json(getPembinaanKasus, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan server!" },
      { status: 500 }
    );
  }
};
