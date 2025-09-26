"use client";

import { Button } from "@/components/ui/button";
import { Pencil, SquarePlus } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../ui/morphing-popover";
import { set, useForm } from "react-hook-form";
import { useToaster } from "@/providers/ToasterProvider";
import { useEffect, useState } from "react";

const EditButtonMinat = ({ bakat, onSuccess }) => {
  const [open, setOpen] = useState(false);

  const toaster = useToaster();
  const { register, handleSubmit, reset } = useForm();

  // isi form dengan data bakat yang diterima dari props
  useEffect(() => {
    if (open && bakat) {
      reset({
        bakatMinat: bakat.bakat,
        keterangan: bakat.keterangan,
      });
    }
  }, [open, bakat, reset]); // mount ulang saat dependency berubah

  const onSubmit = async (formData) => {
    // buat payload yang dikirim ke API
    const payload = {
      bakatMinat: formData.bakatMinat,
      keterangan: formData.keterangan,
      siswaId: bakat.siswaId,
      id: bakat.id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bakat`,
        {
          method: "PUT",
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
          message: errorData.message || "Gagal mengedit data minat",
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
        return;
      }

      // tampilkan notifikasi sukses
      toaster.current?.show({
        title: "Sukses!",
        message: "Data minat berhasil diedit",
        variant: "success",
        duration: 5000,
        position: "top-center",
      });

      // tutup popover
      setOpen(false);

      if (onSuccess) {
        onSuccess(); // fetch ulang data setelah sukses
      }
    } catch (error) {
      toaster.current?.show({
        title: "Kesalahan!",
        message: error.message || "Gagal mengedit data minat",
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
            <Pencil size={16} />
          </Button>
        </MorphingPopoverTrigger>

        <MorphingPopoverContent>
          <h2 className="text-lg font-semibold mb-4">
            Edit Minat {bakat.siswa.nama}
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

export default EditButtonMinat;
