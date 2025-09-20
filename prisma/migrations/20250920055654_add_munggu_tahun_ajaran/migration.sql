/*
  Warnings:

  - You are about to drop the column `minggu` on the `Bulan` table. All the data in the column will be lost.
  - You are about to drop the column `tahunAjaran` on the `Bulan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Siswa` table. All the data in the column will be lost.
  - Added the required column `nama` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Bulan" DROP COLUMN "minggu",
DROP COLUMN "tahunAjaran";

-- AlterTable
ALTER TABLE "public"."Siswa" DROP COLUMN "name",
ADD COLUMN     "nama" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Minggu" (
    "id" TEXT NOT NULL,
    "minggu_ke" INTEGER NOT NULL,
    "bulanId" TEXT NOT NULL,

    CONSTRAINT "Minggu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TahunAjaran" (
    "id" TEXT NOT NULL,
    "tahunAjaran" TEXT NOT NULL,
    "bulanId" TEXT NOT NULL,

    CONSTRAINT "TahunAjaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Minggu" ADD CONSTRAINT "Minggu_bulanId_fkey" FOREIGN KEY ("bulanId") REFERENCES "public"."Bulan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TahunAjaran" ADD CONSTRAINT "TahunAjaran_bulanId_fkey" FOREIGN KEY ("bulanId") REFERENCES "public"."Bulan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
