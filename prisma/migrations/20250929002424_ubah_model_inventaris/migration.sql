/*
  Warnings:

  - You are about to drop the column `kelasId` on the `Inventaris` table. All the data in the column will be lost.
  - You are about to drop the column `kondisi` on the `Inventaris` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Inventaris" DROP CONSTRAINT "Inventaris_kelasId_fkey";

-- AlterTable
ALTER TABLE "public"."Inventaris" DROP COLUMN "kelasId",
DROP COLUMN "kondisi",
ADD COLUMN     "baik" INTEGER,
ADD COLUMN     "rusak" INTEGER;

-- DropEnum
DROP TYPE "public"."Kondisi";

-- CreateTable
CREATE TABLE "public"."_InventarisToKelas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InventarisToKelas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InventarisToKelas_B_index" ON "public"."_InventarisToKelas"("B");

-- AddForeignKey
ALTER TABLE "public"."_InventarisToKelas" ADD CONSTRAINT "_InventarisToKelas_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Inventaris"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_InventarisToKelas" ADD CONSTRAINT "_InventarisToKelas_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
