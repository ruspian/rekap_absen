"use client";

import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../ui/morphing-popover";
import { useToaster } from "@/providers/ToasterProvider";
import { useState } from "react";
import { formatTanggal } from "@/lib/formatTanggal";

const KirimButton = ({ data, dataLaporan }) => {
  console.log("dataLaporan", dataLaporan);

  const [open, setOpen] = useState(false);

  const toaster = useToaster();

  return (
    <div className="flex gap-2 justify-center">
      <MorphingPopover open={open} onOpenChange={setOpen}>
        <MorphingPopoverTrigger asChild>
          <Button variant="outline">
            <SendHorizontal size={16} />
          </Button>
        </MorphingPopoverTrigger>

        <MorphingPopoverContent>
          <h2 className="text-lg font-semibold mb-4">Kirim Data</h2>
          <div className="">
            <p className="text-sm text-gray-500">
              Apakah Anda yakin ingin mengirim data ini?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setOpen(false);

                  // Ambil ID siswa saat ini untuk pencarian
                  const studentId = data.siswa.id;

                  // cari data absensi yang sesuai
                  const laporanAlfa = dataLaporan.alfa.find(
                    (item) => item.siswa.id === studentId
                  );
                  const laporanIzin = dataLaporan.izin.find(
                    (item) => item.siswa.id === studentId
                  );
                  const laporanSakit = dataLaporan.sakit.find(
                    (item) => item.siswa.id === studentId
                  );

                  // Ambil total absensi, beri nilai 0 jika data tidak ditemukan
                  const totalAlfa = laporanAlfa ? laporanAlfa.total.alfa : 0;
                  const totalIzin = laporanIzin ? laporanIzin.total.izin : 0;
                  const totalSakit = laporanSakit
                    ? laporanSakit.total.sakit
                    : 0;

                  // pesan yang akan dikirim
                  const message = `Assalamualaikum Wr.Wb,
Kami dari SMK Salafiyah Syafiiyah Desa Banuroja izin menyampaikan rekap absensi putra/putri Bapak/Ibu.
Berikut ini data siswa:\n
Nama: *${data.siswa.nama}*\n
Tempat & Tanggal Lahir: ${data.siswa.tempat_lahir}, ${formatTanggal(
                    data.siswa.tanggal_lahir
                  )}\n
Alamat: ${data.siswa.alamat}\n

Berdasarkan rekapitulasi kami, ananda *${
                    data.siswa.nama
                  }* telah melebihi batas absensi dinulan ini dengan rincian sebagai berikut:\n
- Total Alfa: *${totalAlfa}*\n
- Total Izin: *${totalIzin}*\n
- Total Sakit: *${totalSakit}*\n

Demikian informasi ini kami sampaikan sebagai pemberitahuan. Atas perhatian Bapak/Ibu, kami ucapkan terima kasih.\n

Wallahul Muwaffiq ila Aqwamit Tharieqn\n
Wassalamualaikum wr.wb`;

                  // Pastikan nomor diawali dengan 62 dan tanpa spasi atau simbol
                  const nomorTujuan = data.siswa.no_hp_ayah.startsWith("0")
                    ? "62" + data.siswa.no_hp_ayah.substring(1)
                    : data.siswa.no_hp_ayah;

                  // Buat URL dengan pesan
                  const url = `https://api.whatsapp.com/send?phone=${nomorTujuan}&text=${encodeURIComponent(
                    message
                  )}`;

                  window.open(url, "_blank");

                  toaster.current?.show({
                    title: "Data Berhasil Dikirim",
                    message: "Membuka WhatsApp untuk pengiriman data.",
                    variant: "success",
                    duration: 5000,
                    position: "top-center",
                  });
                }}
              >
                Kirim
              </Button>
            </div>
          </div>
        </MorphingPopoverContent>
      </MorphingPopover>
    </div>
  );
};

export default KirimButton;
