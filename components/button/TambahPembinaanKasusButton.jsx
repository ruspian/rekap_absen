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
import { useEffect, useState } from "react";

const TambahPembinaanKasusButton = ({ siswa, onSuccess }) => {
  const [open, setOpen] = useState(false);

  const toaster = useToaster();
  const { register, handleSubmit, reset } = useForm();

  // isi form nama siswa
  useEffect(() => {
    if (open && siswa) {
      reset({
        nama: siswa.nama,
      });
    }
  }, [open, siswa, reset]); // mount ulang saat dependency berubah

  const onSubmit = async (data) => {
    const payload = {
      siswaId: siswa.id,
      tanggal: data.tanggal,
      uraian_kejadian: data.uraian_kejadian,
      tanggapan_siswa: data.tanggapan_siswa,
      arahan: data.arahan,
      kesepakatan: data.kesepakatan,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pembinaan-kasus`,
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

      // reset form
      reset();
      // tutup popover
      setOpen(false);

      // panggil onSuccess untuk refresh data di parent
      if (onSuccess) {
        onSuccess();
      }
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
          <h2 className="text-lg font-semibold mb-4">
            Form Tambah Pembinaan Kasus
          </h2>
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
              <input
                {...register("nama")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan Keterangan"
                disabled
              />
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

export default TambahPembinaanKasusButton;
