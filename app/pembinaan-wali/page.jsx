"use client";

import TambahPembinaanWaliButton from "@/components/button/TambahPembinaanWaliButton";
import { TabelPembinaanWali } from "@/components/table/TabelPembinaanWali";
import Breadcrumb from "@/components/ui/breadcrumb";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getKelas,
  getKepalaSekolah,
  getPembinaanWali,
  getSiswa,
} from "@/lib/data";
import { handleDownloadExcelPembinaanWali } from "@/lib/downloadExcel";
import { useToaster } from "@/providers/ToasterProvider";
import { FileDown, FilePlus2, Printer, UsersRound } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const PembinaanWaliPage = () => {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataKepsek, setDataKepsek] = useState(null);
  const [dataPembinaanWali, setDataPembinaanWali] = useState([]);
  const [kelasFilter, setKelasFilter] = useState("Pilih Kelas");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const toaster = useToaster();

  const tableRef = useRef();

  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);

      const [siswa, kelas, kepsek, pembinaanWali] = await Promise.all([
        getSiswa(),
        getKelas(),
        getKepalaSekolah(),
        getPembinaanWali(),
      ]);

      // deteksi bentuk data siswa
      const siswaArray = Array.isArray(siswa)
        ? siswa
        : Array.isArray(siswa?.siswa)
        ? siswa.siswa
        : [];

      const kelasArray = Array.isArray(kelas)
        ? kelas
        : Array.isArray(kelas?.data)
        ? kelas.data
        : [];

      setDataSiswa(siswaArray);
      setDataKelas(kelasArray);
      setDataKepsek(kepsek);
      setDataPembinaanWali(pembinaanWali);
    } catch (error) {
      toaster.current?.show({
        title: "Error",
        message: String(error),
        variant: "error",
        duration: 5000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // panggil fetchData saat komponen mount
  useEffect(() => {
    fetchData();
  }, [toaster]);

  // FILTER DATA SISWA BERDASARKAN KELAS
  const filteredData = useMemo(() => {
    if (!kelasFilter || kelasFilter === "Pilih Kelas") return [];
    return dataSiswa.filter((s) => {
      const siswaKelasId =
        s.kelasId || s.kelas?.id || s.siswa?.kelasId || s.siswa?.kelas?.id;
      return String(siswaKelasId) === String(kelasFilter);
    });
  }, [kelasFilter, dataSiswa]);

  // FUNGSI PRINT
  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "Data Siswa",
  });

  // ICON TOMBOL
  const Icons = [
    {
      Icon: FilePlus2,
      className: "hover:bg-accent",
      onClick: () => setOpen(true),
    },
    {
      Icon: Printer,
      className: "hover:bg-accent",
      onClick: handlePrint,
    },
    {
      Icon: FileDown,
      onClick: () => handleDownloadExcelPembinaanWali(dataPembinaanWali),
      className: "hover:bg-accent",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb />

      <div className="my-10 flex gap-2 items-center">
        <UsersRound />
        <h2 className="text-2xl font-semibold">PEMBINAAN WALI</h2>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="relative flex items-start px-4 mb-4">
          <AnimatedFloatingButton icons={Icons} iconSize={15} />
        </div>

        <div className="relative z-10">
          <KelasDropdown
            data={dataKelas}
            value={kelasFilter}
            onChange={setKelasFilter}
          />
        </div>
      </div>

      <div ref={tableRef}>
        <TabelPembinaanWali
          data={filteredData}
          kepsek={dataKepsek}
          pembinaanWali={dataPembinaanWali}
          onSuccess={fetchData}
        />
      </div>

      {open && (
        <TambahPembinaanWaliButton
          setOpen={setOpen}
          open={open}
          onSuccess={fetchData}
          siswa={filteredData}
        />
      )}
    </div>
  );
};

export default PembinaanWaliPage;
