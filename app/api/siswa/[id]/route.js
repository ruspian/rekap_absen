import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// AMBIL DATA SISWA BERDASARKAN ID
export const GET = async (req, { params }) => {
  try {
    const { id } = await params;

    // cari data siswa berdasarkan id
    const siswa = await prisma.siswa.findUnique({
      where: {
        id: id,
      },
    });

    // cek apakah data siswa ada
    if (!siswa) {
      return NextResponse.json(
        { message: "Siswa tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json(siswa, { status: 200 });
  } catch (error) {
    console.error("GET siswa error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
};

// EDIT DATA SISWA BERDASARKAN ID
export const PUT = async (req, { params }) => {
  const session = await auth();

  //   pastikan user login dan role admin
  if (!session && session.user.role !== "admin") {
    return NextResponse.json({ message: "Akses Ditolak!" }, { status: 401 });
  }

  //   ambil id dari params
  const { id } = await params;

  try {
    const body = await req.json();
    const { tanggal_lahir, ...data } = body;

    // cari dan perbarui data siswa
    const siswa = await prisma.siswa.update({
      where: {
        id: id,
      },
      data: {
        tanggal_lahir: new Date(tanggal_lahir),
        ...data,
      },
    });

    // kembalikan data siswa jika berhasil
    return NextResponse.json(siswa, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Siswa tidak ditemukan." },
          { status: 404 }
        );
      }
    }

    console.error("PUT siswa error:", error);
    return NextResponse.json(
      { message: "Terjadi Kesalahan pada Server!" },
      { status: 500 }
    );
  }
};

// HAPUS DATA SISWA BERDASARKAN ID
export const DELETE = async (req, { params }) => {
  const session = await auth();

  // pastikan user login dan role admin
  if (!session && session.user.role !== "admin") {
    return NextResponse.json({ message: "Akses Ditolak!" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const siswa = await prisma.siswa.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Siswa berhasil dihapus!", data: siswa },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Siswa tidak ditemukan." },
          { status: 404 }
        );
      }
    }

    console.error("DELETE siswa error:", error);
    return NextResponse.json(
      { message: "Terjadi Kesalahan pada Server!" },
      { status: 500 }
    );
  }
};
