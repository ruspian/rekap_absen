import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// AMBIL DATA BULAN + MINGGU
export const GET = async () => {
  try {
    const bulan = await prisma.bulan.findMany({
      include: {
        minggu: {
          orderBy: { nomorMinggu: "asc" },
        },
      },
      orderBy: { nomorBulan: "asc" },
    });

    return NextResponse.json(bulan, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
