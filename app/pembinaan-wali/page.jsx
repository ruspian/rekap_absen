"use client";

import { TabelPembinaanWali } from "@/components/table/TabelPembinaanWali";
import Breadcrumb from "@/components/ui/breadcrumb";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import {
  getKelas,
  getKepalaSekolah,
  getPembinaanWali,
  getSiswa,
} from "@/lib/data";
import { handleDownloadExcelPembinaanWali } from "@/lib/downloadExcel";
import { useToaster } from "@/providers/ToasterProvider";
import { FileDown, Lightbulb, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const PembinaanWaliPage = () => {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataKepsek, setDataKepsek] = useState(null);
  const [dataPembinaanWali, setDataPembinaanWali] = useState([]);
  const [kelasFilter, setKelasFilter] = useState("Pilih Kelas");
  const toaster = useToaster();

  const tableRef = useRef();

  // FETCH DATA
  const fetchData = async () => {
    try {
      const [siswa, kelas, kepsek, pembinaanWali] = await Promise.all([
        getSiswa(),
        getKelas(),
        getKepalaSekolah(),
        getPembinaanWali(),
      ]);
      setDataSiswa(siswa);
      setDataKelas(kelas);
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
    }
  };

  // panggil fetchData saat komponen mount
  useEffect(() => {
    fetchData();
  }, []);

  // FILTER DATA SISWA BERDASARKAN KELAS
  const filteredData =
    kelasFilter === "Pilih Kelas"
      ? dataSiswa
      : dataSiswa.filter((s) => String(s.kelasId) === String(kelasFilter));

  // FUNGSI PRINT
  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "Data Siswa",
  });

  // ICON TOMBOL
  const Icons = [
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

  return (
    <div>
      <Breadcrumb />

      <div className="my-10 flex gap-2 items-center">
        <Lightbulb />
        <h2 className="text-2xl font-semibold">BAKAT DAN MINAT SISWA</h2>
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
    </div>
  );
};

export default PembinaanWaliPage;
