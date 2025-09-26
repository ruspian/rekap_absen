import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// BUAT DATA BAKAT DAN MINAT SISWA
export const POST = async (req) => {
  const session = await auth();

  if (!session || !session.user.role === "admin") {
    return NextResponse.json({ message: "Akses Ditolak!" }, { status: 401 });
  }

  const body = await req.json();
  const { siswaId, bakatMinat, keterangan } = body;

  if (!siswaId) {
    return NextResponse.json(
      { message: "Siswa tidak ditemukan!" },
      { status: 400 }
    );
  }

  try {
    // buat data bakat dan minat
    const bakat = await prisma.bakatDanMinat.create({
      data: {
        siswaId: siswaId,
        bakat: bakatMinat || null,
        keterangan: keterangan || null,
      },
    });

    return NextResponse.json(bakat, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi Kesalahan Server!" },
      { status: 500 }
    );
  }
};

// AMBIL DATA BAKAT BERDASARKAN
export const GET = async (req) => {
  try {
    const bakat = await prisma.bakatDanMinat.findMany({
      include: {
        siswa: true,
      },
      take: 1,
    });

    return NextResponse.json(bakat, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi Kesalahan Server!" },
      { status: 500 }
    );
  }
};

//  EDIT DATA BAKAT DAN MINAT SISWA
export const PUT = async (req) => {
  const session = await auth();

  if (!session || !session.user.role === "admin") {
    return NextResponse.json({ message: "Akses Ditolak!" }, { status: 401 });
  }

  // ambil data dari body request
  const body = await req.json();
  const { id, bakatMinat, keterangan, siswaId } = body;

  if (!id || !siswaId) {
    return NextResponse.json(
      { message: "Gagal mengedit data bakat dan minat!" },
      { status: 400 }
    );
  }

  try {
    const editedBakat = await prisma.bakatDanMinat.update({
      where: { id: id },
      data: {
        bakat: bakatMinat || null,
        keterangan: keterangan || null,
        siswaId: siswaId,
      },
    });

    return NextResponse.json(editedBakat, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi Kesalahan Server!" },
      { status: 500 }
    );
  }
};
