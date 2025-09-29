/*
  Warnings:

  - Added the required column `kelasId` to the `Inventaris` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Inventaris" ADD COLUMN     "kelasId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Inventaris" ADD CONSTRAINT "Inventaris_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "public"."Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
