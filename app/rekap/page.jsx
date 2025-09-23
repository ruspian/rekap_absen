"use client";

import TabelRekapKehadiran from "@/components/table/TabelRekapKehadiran";
import Breadcrumb from "@/components/ui/breadcrumb";
import { BulanDropdown } from "@/components/ui/bulan-selector-dropdown";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { getBulan, getKelas, getMinggu, getSiswa } from "@/lib/data";
import { useToaster } from "@/providers/ToasterProvider";
import { FileChartColumnIncreasing, FileDown, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";

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

  // Ambil data awal kelas & bulan
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
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchRekap();
  }, [kelasFilter, bulanFilter, toaster]);

  // Print
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Rekap Kehadiran Siswa",
  });

  // Export Excel
  const handleDownloadExcel = () => {
    const cleanData = rekapKehadiran.map((item, i) => {
      // Flatten minggu agar jadi kolom Excel
      const mingguData = {};
      dataMinggu.forEach((m) => {
        const nilai = item.minggu[m.nomorMinggu] || {
          sakit: 0,
          izin: 0,
          alfa: 0,
        };
        mingguData[`M${m.nomorMinggu}_Sakit`] = nilai.sakit;
        mingguData[`M${m.nomorMinggu}_Izin`] = nilai.izin;
        mingguData[`M${m.nomorMinggu}_Alfa`] = nilai.alfa;
      });

      return {
        No: i + 1,
        Nama: item.siswa?.nama || "-",
        Kelas: item.siswa?.kelas?.nama_kelas || "-",
        Bulan: item.bulan?.namaBulan || "-",
        ...mingguData,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(cleanData);
    worksheet["!cols"] = [{ wch: 5 }, { wch: 30 }, { wch: 15 }, { wch: 15 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Kehadiran");
    XLSX.writeFile(workbook, "rekap-kehadiran.xlsx");
  };

  const Icons = [
    { Icon: Printer, onClick: handlePrint, className: "hover:bg-accent" },
    {
      Icon: FileDown,
      onClick: handleDownloadExcel,
      className: "hover:bg-accent",
    },
  ];

  const selectedKelas = dataKelas.find((k) => k.id === kelasFilter);
  const selectedBulan = dataBulan.find((b) => b.id === bulanFilter);

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
        {isLoading ? (
          <div className="w-full h-48 flex justify-center items-center">
            <p>Memuat data...</p>
          </div>
        ) : (
          <TabelRekapKehadiran
            minggu={dataMinggu}
            data={rekapKehadiran}
            namaKelas={selectedKelas?.nama_kelas}
            namaBulan={selectedBulan?.namaBulan}
            bulan={selectedBulan}
          />
        )}
      </div>
    </div>
  );
};

export default RekapAbsenPage;
