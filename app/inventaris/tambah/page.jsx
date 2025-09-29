"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getKelas } from "@/lib/data";
import { useToaster } from "@/providers/ToasterProvider";
import { BadgePlus, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TambahInventarisPage = () => {
  const [data, setData] = useState([]);

  const { register, handleSubmit } = useForm();
  const toaster = useToaster();
  const router = useRouter();

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const kelas = await getKelas();
        setData(kelas);
      } catch (error) {
        toaster.current?.show({
          title: "Error",
          message: error.message,
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
      }
    };

    fetchKelas();
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      nama: data.nama,
      jumlah_awal: parseInt(data.jumlah_awal),
      jumlah_akhir: parseInt(data.jumlah_akhir),
      baik: parseInt(data.baik),
      rusak: parseInt(data.rusak),
      keterangan: data.keterangan,
      kelas: data.kelas || null, // Jika tidak ada kelas yang dipilih, set ke null
    };

    try {
      // kirim data ke api
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inventaris`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        toaster.current?.show({
          title: "Kesalahan!",
          message: responseData.message || "Gatal menambahkan data siswa",
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
        return; // hentikan eksekusi
      }

      toaster.current?.show({
        title: "Sukses!",
        message: responseData.message || "Berhasil menambahkan data siswa",
        variant: "success",
        duration: 5000,
        position: "top-center",
      });

      router.push("/inventaris");
    } catch (error) {
      toaster.current?.show({
        title: "Error",
        message: error.message || "Terjadi Kesalahan!",
        variant: "error",
        duration: 5000,
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <Breadcrumb />

      <div className="flex gap-2 items-center my-10">
        <BadgePlus size={30} strokeWidth={2.25} />
        <h2 className="text-2xl font-semibold">Tambah Inventaris</h2>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:w-[500px] gap-4 border border-slate-200 rounded-md p-4 mx-2 my-2"
      >
        {/* NAMA */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Nama Barang</label>
          <input {...register("nama")} className="border rounded-sm p-1" />
        </div>

        {/* JUMLAH AWAL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Jumlah Awal Tahun</label>
          <input
            {...register("jumlah_awal")}
            className="border rounded-sm p-1"
          />
        </div>

        {/* JUMLAH AKHIR */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Jumlah Akhir Tahun</label>
          <input
            {...register("jumlah_akhir")}
            className="border rounded-sm p-1"
          />
        </div>

        {/* KONDISI BAIK */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Kondisi Baik</label>
          <input {...register("baik")} className="border rounded-sm p-1" />
        </div>

        {/* KONDISI RUSAK */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Kondisi Rusak</label>
          <input {...register("rusak")} className="border rounded-sm p-1" />
        </div>

        {/* KELAS */}
        <div className="w-full">
          <label className="text-sm">Kelas</label>
          <select
            {...register("kelas")}
            className="border rounded-sm p-1 w-full"
          >
            <option value="">Pilih</option>
            {data.length > 0 &&
              data.map((kelas) => (
                <option
                  value={kelas.id}
                  key={kelas.id}
                >{`${kelas.nama_kelas} ${kelas.jurusan}`}</option>
              ))}
          </select>
        </div>

        {/* KETERANGAN */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Keterangan</label>
          <input
            {...register("keterangan")}
            className="border rounded-sm p-1"
          />
        </div>

        <Button
          type="submit"
          className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Simpan
        </Button>
      </form>
    </div>
  );
};

export default TambahInventarisPage;
