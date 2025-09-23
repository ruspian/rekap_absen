/*
  Warnings:

  - A unique constraint covering the columns `[siswaId,mingguId]` on the table `RekapKehadiran` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."RekapKehadiran_siswaId_bulanId_key";

-- CreateIndex
CREATE UNIQUE INDEX "RekapKehadiran_siswaId_mingguId_key" ON "public"."RekapKehadiran"("siswaId", "mingguId");
