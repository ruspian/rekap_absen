/*
  Warnings:

  - Added the required column `mingguId` to the `RekapKehadiran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RekapKehadiran" ADD COLUMN     "mingguId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."RekapKehadiran" ADD CONSTRAINT "RekapKehadiran_mingguId_fkey" FOREIGN KEY ("mingguId") REFERENCES "public"."Minggu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
