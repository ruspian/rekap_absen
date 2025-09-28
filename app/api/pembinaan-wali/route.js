import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// BUAT DATA PEMBINAAN WALI
export const POST = async (req) => {
  const session = await auth();

  if (!session || !session.user.role === "admin") {
    return NextResponse.json(
      {
        message: "Akses ditolak!",
      },
      { status: 401 }
    );
  }

  const body = await req.json();
  const {
    siswaId,
    tanggal,
    uraian_kejadian,
    tanggapan_siswa,
    arahan,
    kesepakatan,
    no_surat,
  } = body;

  try {
    const pembinaanWali = await prisma.pembinaanWali.create({
      data: {
        siswaId: siswaId,
        tanggal: new Date(tanggal),
        uraian_kejadian: uraian_kejadian,
        tanggapan_siswa: tanggapan_siswa,
        arahan: arahan,
        kesepakatan: kesepakatan,
        no_surat: no_surat,
      },
    });

    if (!pembinaanWali) {
      return NextResponse.json(
        { message: "Gagal membuat pembinaan wali!" },
        { status: 400 }
      );
    }

    return NextResponse.json(pembinaanWali, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server!" },
      { status: 500 }
    );
  }
};

// AMBIL DATA PEMBINAAN WALI
export const GET = async (req) => {
  try {
    const getPembinaanWali = await prisma.pembinaanWali.findMany({
      include: {
        siswa: true,
      },
    });

    if (!getPembinaanWali) {
      return NextResponse.json(
        { message: "Gagal mengambil data pembinaan wali!" },
        { status: 400 }
      );
    }

    return NextResponse.json(getPembinaanWali, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan server!" },
      { status: 500 }
    );
  }
};
