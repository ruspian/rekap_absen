/*
  Warnings:

  - Added the required column `tahunAjaran` to the `Bulan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Bulan" ADD COLUMN     "tahunAjaran" TEXT NOT NULL;
