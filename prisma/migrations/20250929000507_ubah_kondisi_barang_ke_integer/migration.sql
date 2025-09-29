/*
  Warnings:

  - The `kondisi` column on the `Inventaris` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Inventaris" DROP COLUMN "kondisi",
ADD COLUMN     "kondisi" INTEGER;
