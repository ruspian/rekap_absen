"use client";

import { TabelInventaris } from "@/components/table/TabelInventaris";
import Breadcrumb from "@/components/ui/breadcrumb";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { getInventaris, getKelas } from "@/lib/data";
import {
  handleDownloadExcelInventaris,
  handleDownloadExcelPembinaanKasus,
} from "@/lib/downloadExcel";
import { useToaster } from "@/providers/ToasterProvider";
import { Armchair, BadgePlus, FileDown, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const InventarisPage = () => {
  const [dataInventaris, setDataInventaris] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [kelasFilter, setKelasFilter] = useState("Pilih Kelas");
  const toaster = useToaster();

  const tableRef = useRef();

  // FETCH DATA
  const fetchData = async () => {
    try {
      const [inventaris, kelas] = await Promise.all([
        getInventaris(),
        getKelas(),
      ]);
      setDataInventaris(inventaris);
      setDataKelas(kelas);
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

  // panggil fetchData saat komponen mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/inventaris/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toaster.current?.show({
          title: "Success",
          message: "Inventaris berhasil dihapus",
          variant: "success",
          duration: 5000,
          position: "top-center",
        });
        fetchData(); // Refresh data setelah penghapusan
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menghapus inventaris");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // FILTER DATA SISWA BERDASARKAN KELAS
  const filteredData =
    kelasFilter === "Pilih Kelas"
      ? dataInventaris
      : dataInventaris.filter((s) =>
          // Periksa apakah ada kelas di dalam array s.kelas
          s.kelas.some((k) => k.id === kelasFilter)
        );

  const selectedKelas = dataKelas?.find((k) => k.id === kelasFilter);
  const namaKelas = `${selectedKelas?.nama_kelas}_${selectedKelas?.jurusan}`;

  // FUNGSI PRINT
  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "Data Siswa",
  });

  // ICON TOMBOL
  const Icons = [
    {
      Icon: BadgePlus,
      className: "hover:bg-accent",
      href: "/inventaris/tambah",
    },
    {
      Icon: Printer,
      className: "hover:bg-accent",
      onClick: handlePrint,
    },
    {
      Icon: FileDown,
      onClick: () => handleDownloadExcelInventaris(filteredData, namaKelas),
      className: "hover:bg-accent",
    },
  ];

  return (
    <div>
      <Breadcrumb />

      <div className="my-10 flex gap-2 items-center">
        <Armchair />
        <h2 className="text-2xl font-semibold">INVENTARIS KELAS</h2>
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
        <TabelInventaris
          data={filteredData}
          onSuccess={fetchData}
          filterKelas={kelasFilter}
          kelasOptions={dataKelas}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default InventarisPage;
