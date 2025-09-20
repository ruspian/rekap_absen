/*
  Warnings:

  - You are about to drop the column `nama_bulan` on the `Bulan` table. All the data in the column will be lost.
  - You are about to drop the column `minggu_ke` on the `Minggu` table. All the data in the column will be lost.
  - You are about to drop the column `bulanId` on the `TahunAjaran` table. All the data in the column will be lost.
  - You are about to drop the column `tahunAjaran` on the `TahunAjaran` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tahunAjaranId,nomorBulan]` on the table `Bulan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bulanId,nomorMinggu]` on the table `Minggu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tahun]` on the table `TahunAjaran` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `namaBulan` to the `Bulan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomorBulan` to the `Bulan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahunAjaranId` to the `Bulan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomorMinggu` to the `Minggu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun` to the `TahunAjaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TahunAjaran` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."TahunAjaran" DROP CONSTRAINT "TahunAjaran_bulanId_fkey";

-- AlterTable
ALTER TABLE "public"."Bulan" DROP COLUMN "nama_bulan",
ADD COLUMN     "namaBulan" TEXT NOT NULL,
ADD COLUMN     "nomorBulan" INTEGER NOT NULL,
ADD COLUMN     "tahunAjaranId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Minggu" DROP COLUMN "minggu_ke",
ADD COLUMN     "nomorMinggu" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."TahunAjaran" DROP COLUMN "bulanId",
DROP COLUMN "tahunAjaran",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tahun" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bulan_tahunAjaranId_nomorBulan_key" ON "public"."Bulan"("tahunAjaranId", "nomorBulan");

-- CreateIndex
CREATE UNIQUE INDEX "Minggu_bulanId_nomorMinggu_key" ON "public"."Minggu"("bulanId", "nomorMinggu");

-- CreateIndex
CREATE UNIQUE INDEX "TahunAjaran_tahun_key" ON "public"."TahunAjaran"("tahun");

-- AddForeignKey
ALTER TABLE "public"."Bulan" ADD CONSTRAINT "Bulan_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "public"."TahunAjaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;
