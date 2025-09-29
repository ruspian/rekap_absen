import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// EDIT DATA INVENTARIS
export const PUT = async (req, { params }) => {
  const session = await auth();

  if (!session || !session.user.role === "admin") {
    return NextResponse.json(
      { error: "Akses ditolak!" },
      {
        status: 401,
      }
    );
  }

  const { id } = await params;

  const body = await req.json();
  const { nama, jumlah_awal, jumlah_akhir, baik, rusak, keterangan, kelas } =
    body;

  try {
    const updatedInventaris = await prisma.inventaris.update({
      where: { id: id },
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

    if (!updatedInventaris) {
      return NextResponse.json(
        { error: "Gagal Edit inventaris!" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { message: "Inventaris berhasil diperbarui!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};

// AMBIL DATA INVENTARIS BERDASARKAN ID
export const GET = async (req, { params }) => {
  try {
    const { id } = await params;
    const getInventarisById = await prisma.inventaris.findUnique({
      where: { id: id },
      include: {
        kelas: true,
      },
    });

    if (!getInventarisById) {
      return NextResponse.json(
        { error: "Inventaris tidak ditemukan!" },
        { status: 404 }
      );
    }

    return NextResponse.json(getInventarisById, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};

// HAPUS DATA INVENTARIS
export const DELETE = async (req, { params }) => {
  const session = await auth();

  if (!session || !session.user.role === "admin") {
    return NextResponse.json(
      { error: "Akses ditolak!" },
      {
        status: 401,
      }
    );
  }

  const { id } = await params;

  try {
    const deletedInventaris = await prisma.inventaris.delete({
      where: { id: id },
    });

    if (!deletedInventaris) {
      return NextResponse.json(
        { error: "Gagal menghapus inventaris!" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { message: "Inventaris berhasil dihapus!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};
