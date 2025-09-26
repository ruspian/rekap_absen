/*
  Warnings:

  - You are about to drop the column `minat` on the `BakatDanMinat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."BakatDanMinat" DROP COLUMN "minat",
ADD COLUMN     "keterangan" TEXT;
