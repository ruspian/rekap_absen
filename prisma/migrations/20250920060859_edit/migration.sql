/*
  Warnings:

  - You are about to drop the column `bulanId` on the `Minggu` table. All the data in the column will be lost.
  - Added the required column `mingguId` to the `Bulan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Minggu" DROP CONSTRAINT "Minggu_bulanId_fkey";

-- AlterTable
ALTER TABLE "public"."Bulan" ADD COLUMN     "mingguId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Minggu" DROP COLUMN "bulanId";

-- AddForeignKey
ALTER TABLE "public"."Bulan" ADD CONSTRAINT "Bulan_mingguId_fkey" FOREIGN KEY ("mingguId") REFERENCES "public"."Minggu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
