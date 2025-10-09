"use client";

import TabelRekapKehadiran from "@/components/table/TabelRekapKehadiran";
import Breadcrumb from "@/components/ui/breadcrumb";
import { BulanDropdown } from "@/components/ui/bulan-selector-dropdown";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { getBulan, getKelas, getMinggu, getSiswa } from "@/lib/data";
import { handleDownloadExcelRekapKehadiran } from "@/lib/downloadExcel";
import { useToaster } from "@/providers/ToasterProvider";
import { FileChartColumnIncreasing, FileDown, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const RekapAbsenPage = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [dataBulan, setDataBulan] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataMinggu, setDataMinggu] = useState([]);
  const [rekapKehadiran, setRekapKehadiran] = useState([]);
  const [kelasFilter, setKelasFilter] = useState("");
  const [bulanFilter, setBulanFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toaster = useToaster();
  const tableRef = useRef();

  const selectedKelas = dataKelas.find((k) => k.id === kelasFilter);
  const selectedBulan = dataBulan.find((b) => b.id === bulanFilter);

  // Ambil data awal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kelas, bulan, siswa, minggu] = await Promise.all([
          getKelas(),
          getBulan(),
          getSiswa(),
          getMinggu(),
        ]);
        setDataKelas(kelas);
        setDataBulan(bulan);
        setDataSiswa(siswa);
        setDataMinggu(minggu);
      } catch (error) {
        toaster.current?.show({
          title: "Error",
          message: String(error),
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
      }
    };
    fetchData();
  }, [toaster]);

  // Fetch rekap saat filter berubah
  useEffect(() => {
    const fetchRekap = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (kelasFilter) params.append("kelasId", kelasFilter);
        if (bulanFilter) params.append("bulanId", bulanFilter);

        const res = await fetch(`/api/rekap?${params.toString()}`);
        if (!res.ok) throw new Error("Gagal mengambil data rekap.");
        const data = await res.json();
        setRekapKehadiran(data);
      } catch (error) {
        toaster.current?.show({
          title: "Error",
          message: String(error),
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchRekap();
  }, [kelasFilter, bulanFilter, toaster]);

  // Print
  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "Data Rekap Kehadiran",
  });

  const Icons = [
    { Icon: Printer, onClick: handlePrint, className: "hover:bg-accent" },
    {
      Icon: FileDown,
      onClick: () =>
        handleDownloadExcelRekapKehadiran(
          dataMinggu,
          rekapKehadiran,
          selectedBulan
        ),
      className: "hover:bg-accent",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb />
      <div className="my-10 flex gap-2 items-center">
        <FileChartColumnIncreasing />
        <h2 className="text-2xl font-bold">REKAPITULASI KEHADIRAN SISWA</h2>
      </div>

      <div className="flex items-center justify-between w-full mb-4">
        <div className="relative">
          <AnimatedFloatingButton icons={Icons} iconSize={15} />
        </div>
        <div className="flex gap-2 z-10">
          <KelasDropdown
            data={dataKelas}
            value={kelasFilter}
            onChange={setKelasFilter}
          />
          <BulanDropdown
            data={dataBulan}
            value={bulanFilter}
            onChange={setBulanFilter}
          />
        </div>
      </div>

      <div ref={tableRef}>
        <TabelRekapKehadiran
          minggu={dataMinggu}
          data={rekapKehadiran}
          namaKelas={selectedKelas?.nama_kelas}
          jurusan={selectedKelas?.jurusan}
          namaBulan={selectedBulan?.namaBulan}
          bulan={selectedBulan}
          dataSiswa={dataSiswa}
        />
      </div>
    </div>
  );
};

export default RekapAbsenPage;
