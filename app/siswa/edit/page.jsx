"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getKelas, getSiswaById } from "@/lib/data";
import { formatToYyyyMmDd } from "@/lib/formatTanggal";
import { useToaster } from "@/providers/ToasterProvider";
import { Pencil } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditDataSiswaPage = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const params = useSearchParams();
  const id = params.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Ambil fungsi 'reset' dari useForm
  } = useForm();

  const toaster = useToaster();
  const router = useRouter();

  // useEffect untuk mengambil data siswa berdasarkan ID
  useEffect(() => {
    if (!id) return; // Jangan lakukan apa-apa jika tidak ada ID

    const fetchSiswaData = async () => {
      setIsFetching(true);
      try {
        const siswa = await getSiswaById(id);

        // Isi form dengan data yang ada menggunakan reset()
        reset({
          ...siswa,
          tanggal_lahir: formatToYyyyMmDd(siswa.tanggal_lahir), // Format tanggal untuk input
        });
      } catch (error) {
        toaster.current?.show({
          title: "Error",
          message: error.message,
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
        router.push("/siswa"); // Kembali ke halaman siswa jika data tidak ditemukan
      } finally {
        setIsFetching(false);
      }
    };

    fetchSiswaData();
  }, [id, reset, router, toaster]); // muat data siswa ketika dependensi berubah

  // useEffect untuk mengambil data kelas
  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const kelas = await getKelas();
        setDataKelas(kelas);
      } catch (error) {
        toaster.current?.show({
          title: "Gagal Memuat Data Kelas",
          message: error.message,
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
      }
    };

    fetchKelas();
  }, [toaster]);

  // 3. Logika untuk mengirim pembaruan data
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/siswa/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Gagal memperbarui data.");
      }

      toaster.current?.show({
        title: "Sukses!",
        message: "Berhasil memperbarui data siswa.",
        variant: "success",
        duration: 5000,
        position: "top-center",
      });

      router.push("/siswa");
    } catch (error) {
      toaster.current?.show({
        title: "Error",
        message: error.message,
        variant: "error",
        duration: 5000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div>Memuat data siswa...</div>;
  }

  return (
    <div>
      <Breadcrumb />
      <div className="flex gap-2 items-center my-10">
        <Pencil size={20} strokeWidth={2.25} />
        <h2 className="text-2xl font-semibold">Edit Data Siswa</h2>{" "}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:w-[500px] gap-4 border border-slate-200 rounded-md p-4 mx-2 my-2"
      >
        {/* NAMA */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Nama Siswa</label>
          <input
            {...register("nama", { required: "Nama siswa tidak boleh kosong" })}
            className="border rounded-sm p-1"
            disabled={isLoading}
          />
          {errors.nama && (
            <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>
          )}
        </div>

        {/* JENIS KELAMIN */}
        <div className="w-full">
          <label className="text-sm">Jenis Kelamin</label>
          <select
            {...register("gender", { required: "Pilih jenis kelamin" })}
            className="border rounded-sm p-1 w-full"
            disabled={isLoading}
          >
            <option value="">Pilih</option>
            <option value="LakiLaki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* TANGGAL LAHIR */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Tanggal Lahir</label>
          <input
            {...register("tanggal_lahir", {
              required: "Tanggal lahir wajib diisi",
            })}
            className="border rounded-sm p-1"
            type="date"
            disabled={isLoading}
          />
          {errors.tanggal_lahir && (
            <p className="text-red-500 text-xs mt-1">
              {errors.tanggal_lahir.message}
            </p>
          )}
        </div>

        {/* KELAS */}
        <div className="w-full">
          <label className="text-sm">Kelas</label>
          <select
            {...register("kelasId", { required: "Pilih kelas" })}
            className="border rounded-sm p-1 w-full"
            disabled={isLoading}
          >
            <option value="">Pilih</option>
            {dataKelas.length > 0 &&
              dataKelas.map((kelas) => (
                <option
                  value={kelas.id}
                  key={kelas.id}
                >{`${kelas.nama_kelas} ${kelas.jurusan}`}</option>
              ))}
          </select>
          {errors.kelasId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.kelasId.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Nama Ayah</label>
          <input
            {...register("nama_ayah")}
            className="border rounded-sm p-1"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Nama Ibu</label>
          <input
            {...register("nama_ibu")}
            className="border rounded-sm p-1"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">No HP Ayah</label>
          <input
            {...register("no_hp_ayah")}
            className="border rounded-sm p-1"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">No HP Ibu</label>
          <input
            {...register("no_hp_ibu")}
            className="border rounded-sm p-1"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Alamat</label>
          <input
            {...register("alamat")}
            className="border rounded-sm p-1"
            disabled={isLoading}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Memperbarui..." : "Perbarui Data"}
        </Button>
      </form>
    </div>
  );
};

export default EditDataSiswaPage;
