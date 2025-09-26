import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// AMBIL DATA KEPSEK
export const GET = async (req) => {
  try {
    const kepsek = await prisma.kepalaSekolah.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(kepsek, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data kepala sekolah." },
      { status: 500 }
    );
  }
};
