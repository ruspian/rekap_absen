"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getKelas } from "@/lib/data";
import { useToaster } from "@/providers/ToasterProvider";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TambahDataSiswaPage = () => {
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
    try {
      // kirim data ke api
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/siswa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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

      router.push("/siswa");
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
        <UserPlus size={30} strokeWidth={2.25} />
        <h2 className="text-2xl font-semibold">Tambah Data Siswa</h2>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:w-[500px] gap-4 border border-slate-200 rounded-md p-4 mx-2 my-2"
      >
        {/* NAMA */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Nama Siswa</label>
          <input {...register("nama")} className="border rounded-sm p-1" />
        </div>

        {/* JENIS KELAMIN */}
        <div className="w-full">
          <label className="text-sm">Jenis Kelamin</label>
          <select
            {...register("gender")}
            className="border rounded-sm p-1 w-full"
          >
            <option value="">Pilih</option>
            <option value="LakiLaki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* TEMPAT LAHIR */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Tempat Lahir</label>
          <input
            {...register("tempat_lahir")}
            className="border rounded-sm p-1"
          />
        </div>

        {/* TANGGAL LAHIR */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Tanggal Lahir</label>
          <input
            {...register("tanggal_lahir")}
            className="border rounded-sm p-1"
            type="date"
          />
        </div>

        {/* KELAS */}
        <div className="w-full">
          <label className="text-sm">Kelas</label>
          <select
            {...register("kelasId")}
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

        {/* NAMA AYAH */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Nama Ayah</label>
          <input {...register("nama_ayah")} className="border rounded-sm p-1" />
        </div>

        {/* NAMA IBU */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Nama Ibu</label>
          <input {...register("nama_ibu")} className="border rounded-sm p-1" />
        </div>

        {/* NOMER HP AYAH */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">No HP Ayah</label>
          <input
            {...register("no_hp_ayah")}
            className="border rounded-sm p-1"
          />
        </div>

        {/* NOMER HP IBU */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">No HP Ibu</label>
          <input {...register("no_hp_ibu")} className="border rounded-sm p-1" />
        </div>

        {/* ALAMAT */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Alamat</label>
          <input {...register("alamat")} className="border rounded-sm p-1" />
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

export default TambahDataSiswaPage;
