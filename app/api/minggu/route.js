import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req) => {
  try {
    const minggu = await prisma.minggu.findMany({
      include: {
        bulan: true,
        rekap_kehadiran: true,
      },
    });

    if (!minggu) {
      return NextResponse.json({ message: "Data Kosong!" }, { status: 404 });
    }
    return NextResponse.json(minggu, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
