"use client";

import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../ui/morphing-popover";
import { useForm } from "react-hook-form";
import { useToaster } from "@/providers/ToasterProvider";
import { formatToYyyyMmDd } from "@/lib/formatTanggal";

const TambahPembinaanWaliButton = ({ siswa, setOpen, open, onSuccess }) => {
  const toaster = useToaster();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // payload yang dikirim ke API
    const payload = {
      siswaId: data.siswaId,
      tanggal: formatToYyyyMmDd(data.tanggal),
      uraian_kejadian: data.uraian_kejadian,
      tanggapan_siswa: data.tanggapan_siswa,
      arahan: data.arahan,
      kesepakatan: data.kesepakatan,
      no_surat: data.no_surat,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pembinaan-wali`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // jika response tidak ok
      if (!response.ok) {
        const errorData = await response.json();
        toaster.current?.show({
          title: "Kesalahan!",
          message: errorData.message || "Gagal menambah data pembinaan wali",
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
        return;
      }

      // jika sukses tampilkan notifikasi
      toaster.current?.show({
        title: "Berhasil!",
        message: "Data pembinaan wali berhasil ditambahkan",
        variant: "success",
        duration: 5000,
        position: "top-center",
      });

      // fetch ulang ketika sukses
      if (onSuccess) {
        onSuccess();
      }

      // reset form
      reset();
      // tutup popover
      setOpen(false);
    } catch (error) {
      toaster.current?.show({
        title: "Kesalahan!",
        message: String(error) || "Gagal menambah data pembinaan wali",
        variant: "error",
        duration: 5000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      <MorphingPopover open={open} onOpenChange={setOpen}>
        <MorphingPopoverTrigger asChild>
          <Button variant="outline">
            <SquarePlus size={16} />
          </Button>
        </MorphingPopoverTrigger>

        <MorphingPopoverContent>
          <h2 className="text-lg font-semibold mb-4">Form Tambah Pembinaan</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* tanggal */}
            <div>
              <input
                {...register("tanggal")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan Tanggal"
                type="date"
              />
            </div>

            {/* nama */}
            <div>
              <select
                {...register("siswaId")}
                className="border rounded-sm p-2 w-full"
              >
                <option value="" className="text-gray-400">
                  Pilih Siswa
                </option>
                {siswa.map((isSiswa) => (
                  <option value={isSiswa.id} key={isSiswa.id}>
                    {isSiswa.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* uraian */}
            <div>
              <input
                {...register("uraian_kejadian")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan Uraian Kejadian"
              />
            </div>

            {/* tanggapan siswa */}
            <div>
              <input
                {...register("tanggapan_siswa")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan Tanggapan Siswa"
              />
            </div>

            {/* arahan wali */}
            <div>
              <input
                {...register("arahan")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan arahan wali kelas"
              />
            </div>

            {/* Kesepakatan */}
            <div>
              <input
                {...register("kesepakatan")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan kesepakatan"
              />
            </div>

            {/* no surat */}
            <div>
              <input
                {...register("no_surat")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan Nomor Surat"
              />
            </div>

            {/* tombol simpan */}
            <Button className="cursor-pointer" type="submit">
              Simpan
            </Button>
          </form>
        </MorphingPopoverContent>
      </MorphingPopover>
    </div>
  );
};

export default TambahPembinaanWaliButton;
