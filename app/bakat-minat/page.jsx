"use client";

import { TabelBakatMinat } from "@/components/table/TabelBakatMinat";
import Breadcrumb from "@/components/ui/breadcrumb";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { getBakat, getKelas, getKepalaSekolah, getSiswa } from "@/lib/data";
import { handleDownloadExcelBakatMinat } from "@/lib/downloadExcel";
import { useToaster } from "@/providers/ToasterProvider";
import { FileDown, Lightbulb, Printer } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const BakatMinatPage = () => {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataKepsek, setDataKepsek] = useState(null);
  const [dataBakat, setDataBakat] = useState([]);
  const [kelasFilter, setKelasFilter] = useState("");
  const toaster = useToaster();

  const tableRef = useRef();

  const fetchData = async () => {
    try {
      const [siswa, kelas, kepsek, bakat] = await Promise.all([
        getSiswa(),
        getKelas(),
        getKepalaSekolah(),
        getBakat(),
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
      setDataBakat(bakat);
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

  useEffect(() => {
    fetchData();
  }, []);

  // filter siswa berdasarkan kelas
  const filteredData = useMemo(() => {
    if (!kelasFilter || kelasFilter === "Pilih Kelas") return [];
    return dataSiswa.filter((s) => {
      const siswaKelasId =
        s.kelasId || s.kelas?.id || s.siswa?.kelasId || s.siswa?.kelas?.id;
      return String(siswaKelasId) === String(kelasFilter);
    });
  }, [kelasFilter, dataSiswa]);

  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "Data Siswa",
  });

  const Icons = [
    {
      Icon: Printer,
      className: "hover:bg-accent",
      onClick: handlePrint,
    },
    {
      Icon: FileDown,
      onClick: () => handleDownloadExcelBakatMinat(dataBakat),
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
        <TabelBakatMinat
          data={filteredData}
          kepsek={dataKepsek}
          bakat={dataBakat}
          onSuccess={fetchData}
        />
      </div>
    </div>
  );
};

export default BakatMinatPage;
