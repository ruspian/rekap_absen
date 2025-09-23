/*
  Warnings:

  - You are about to drop the column `siswaId` on the `Bulan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[siswaId,bulanId]` on the table `RekapKehadiran` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Bulan" DROP CONSTRAINT "Bulan_siswaId_fkey";

-- AlterTable
ALTER TABLE "public"."Bulan" DROP COLUMN "siswaId";

-- CreateIndex
CREATE UNIQUE INDEX "RekapKehadiran_siswaId_bulanId_key" ON "public"."RekapKehadiran"("siswaId", "bulanId");
