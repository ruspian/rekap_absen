-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Laki-laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "public"."Kondisi" AS ENUM ('Baik', 'Buruk');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "public"."Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "public"."Siswa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "no_hp_ayah" TEXT,
    "no_hp_ibu" TEXT,
    "nama_ayah" TEXT,
    "nama_ibu" TEXT,
    "alamat" TEXT,
    "kelasId" TEXT NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Kelas" (
    "id" TEXT NOT NULL,
    "nama_kelas" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "waliKelasId" TEXT NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BakatDanMinat" (
    "id" TEXT NOT NULL,
    "bakat" TEXT,
    "minat" TEXT,

    CONSTRAINT "BakatDanMinat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PembinaanWali" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "uraian_kejadian" TEXT,
    "tanggapan_siswa" TEXT,
    "arahan" TEXT,
    "kesepakatan" TEXT,
    "siswaId" TEXT NOT NULL,

    CONSTRAINT "PembinaanWali_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PembinaanKasus" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "uraian_kejadian" TEXT,
    "tanggapan_siswa" TEXT,
    "arahan" TEXT,
    "kesepakatan" TEXT,
    "siswaId" TEXT NOT NULL,

    CONSTRAINT "PembinaanKasus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Inventaris" (
    "id" TEXT NOT NULL,
    "nama" TEXT,
    "jumlah_awal" INTEGER,
    "jumlah_akhir" INTEGER,
    "kondisi" "public"."Kondisi" NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "Inventaris_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bulan" (
    "id" TEXT NOT NULL,
    "nama_bulan" TEXT NOT NULL,
    "minggu" INTEGER NOT NULL,

    CONSTRAINT "Bulan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RekapKehadiran" (
    "id" TEXT NOT NULL,
    "sakit" INTEGER,
    "izin" INTEGER,
    "alfa" INTEGER,
    "siswaId" TEXT NOT NULL,
    "bulanId" TEXT NOT NULL,

    CONSTRAINT "RekapKehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WaliKelas" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "WaliKelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KepalaSekolah" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "KepalaSekolah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "public"."Authenticator"("credentialID");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Siswa" ADD CONSTRAINT "Siswa_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "public"."Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Kelas" ADD CONSTRAINT "Kelas_waliKelasId_fkey" FOREIGN KEY ("waliKelasId") REFERENCES "public"."WaliKelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PembinaanWali" ADD CONSTRAINT "PembinaanWali_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "public"."Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PembinaanKasus" ADD CONSTRAINT "PembinaanKasus_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "public"."Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RekapKehadiran" ADD CONSTRAINT "RekapKehadiran_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "public"."Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RekapKehadiran" ADD CONSTRAINT "RekapKehadiran_bulanId_fkey" FOREIGN KEY ("bulanId") REFERENCES "public"."Bulan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
