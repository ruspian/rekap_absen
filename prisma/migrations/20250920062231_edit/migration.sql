/*
  Warnings:

  - You are about to drop the column `mingguId` on the `Bulan` table. All the data in the column will be lost.
  - Added the required column `bulanId` to the `Minggu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Bulan" DROP CONSTRAINT "Bulan_mingguId_fkey";

-- AlterTable
ALTER TABLE "public"."Bulan" DROP COLUMN "mingguId";

-- AlterTable
ALTER TABLE "public"."Minggu" ADD COLUMN     "bulanId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Minggu" ADD CONSTRAINT "Minggu_bulanId_fkey" FOREIGN KEY ("bulanId") REFERENCES "public"."Bulan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
