"use client";

import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../ui/morphing-popover";
import { set, useForm } from "react-hook-form";
import { useToaster } from "@/providers/ToasterProvider";
import { useState } from "react";

const TambahButtonMinat = ({ siswa }) => {
  const [open, setOpen] = useState(false);

  const toaster = useToaster();
  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = async (data) => {
    // payload yang dikirim ke API
    const payload = {
      bakatMinat: data.bakatMinat,
      keterangan: data.keterangan,
      siswaId: siswa.id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bakat`,
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
          message: errorData.message || "Gagal menambahkan data minat",
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
        return;
      }

      // tampilkan notifikasi sukses
      toaster.current?.show({
        title: "Sukses!",
        message: "Data minat berhasil ditambahkan",
        variant: "success",
        duration: 5000,
        position: "top-center",
      });

      // hapus field input
      resetField("bakatMinat");
      resetField("keterangan");

      // tutup popover
      setOpen(false);
    } catch (error) {
      toaster.current?.show({
        title: "Kesalahan!",
        message: error.message || "Gagal menambahkan data minat",
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
            Tambah Bakat {siswa.nama}
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <input
                {...register("bakatMinat")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan Bakat/Minat Siswa"
              />
            </div>
            <div>
              <input
                {...register("keterangan")}
                className="border rounded-sm p-2 w-full"
                placeholder="Masukkan Keterangan"
              />
            </div>
            <Button className="cursor-pointer" type="submit">
              Simpan
            </Button>
          </form>
        </MorphingPopoverContent>
      </MorphingPopover>
    </div>
  );
};

export default TambahButtonMinat;
