import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// TAMBAH DATA SISWA
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

    // destructure data body
    const { nama, tempat_lahir, tanggal_lahir, kelasId, ...data } = body;

    // cek apakah data ini ada
    if (!nama || !tempat_lahir || !tanggal_lahir || !kelasId) {
      return new NextResponse(
        JSON.stringify({ message: "Data tidak lengkap!" }),
        { status: 400 }
      );
    }

    // buat data siswa
    const dataSiswa = await prisma.siswa.create({
      data: {
        nama: nama,
        tempat_lahir: tempat_lahir,
        tanggal_lahir: new Date(tanggal_lahir).toISOString(),
        kelasId: kelasId,
        ...data,
      },
    });

    return new NextResponse(JSON.stringify(dataSiswa), { status: 201 });
  } catch (error) {
    console.error("Gagal tambah data siswa: ", error);

    return new NextResponse(JSON.stringify({ message: "Terjadi Kesalahan!" }), {
      status: 500,
    });
  }
};

// AMBIL DATA SISWA
export const GET = async (req) => {
  try {
    const siswa = await prisma.siswa.findMany({
      include: {
        kelas: {
          include: {
            waliKelas: true,
          },
        },
        bakatMinat: true,
        pembinaan_wali: true,
      },
    });

    const jumlahSiswa = await prisma.siswa.count();

    const responseData = {
      siswa: siswa,
      jumlahSiswa: jumlahSiswa,
    };
    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Terjadi Kesalahan!" }), {
      status: 500,
    });
  }
};
