/*
  Warnings:

  - Added the required column `siswaId` to the `Bulan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Bulan" ADD COLUMN     "siswaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Bulan" ADD CONSTRAINT "Bulan_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "public"."Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
