import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req) => {
  try {
    const kelas = await prisma.kelas.findMany({
      include: {
        waliKelas: true,
        siswa: true,
        _count: {
          select: { siswa: true },
        },
      },
    });
    return new NextResponse(JSON.stringify(kelas), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
