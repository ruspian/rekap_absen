"use client";

import { TableSiswa } from "@/components/table/TabelSiswa";
import Breadcrumb from "@/components/ui/breadcrumb";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { getKelas, getSiswa } from "@/lib/data";
import { handleDownloadExcelDataSiswa } from "@/lib/downloadExcel";
import { useToaster } from "@/providers/ToasterProvider";
import { BookUser, FileDown, Printer, UserPlus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const SiswaPage = () => {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [kelasFilter, setKelasFilter] = useState("Pilih Kelas");
  const toaster = useToaster();

  const tableRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siswa, kelas] = await Promise.all([getSiswa(), getKelas()]);
        setDataSiswa(siswa);
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

    fetchData();
  }, [toaster]);

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

  // fungsi hapus data siswa
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/siswa/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // jika gagal
      if (!response.ok) {
        toaster.current?.show({
          title: "Waduh!",
          message: "Gagal menghapus data.",
          variant: "error",
          duration: 5000,
          position: "top-center",
        });
        return;
      }

      // set data siswa yang sudah dihapus
      setDataSiswa((prevData) => prevData.filter((siswa) => siswa.id !== id));

      toaster.current?.show({
        title: "Sukses!",
        message: "Berhasil menghapus data.",
        variant: "success",
        duration: 5000,
        position: "top-center",
      });
    } catch (error) {}
  };

  // ICON TOMBOL
  const Icons = [
    {
      Icon: UserPlus,
      href: "/siswa/tambah",
      className: "hover:bg-accent",
    },
    {
      Icon: Printer,
      className: "hover:bg-accent",
      onClick: handlePrint,
    },
    {
      Icon: FileDown,
      onClick: () => handleDownloadExcelDataSiswa(dataSiswa),
      className: "hover:bg-accent",
    },
  ];

  return (
    <div>
      <Breadcrumb />

      <div className="my-10 flex gap-2 items-center">
        <BookUser />
        <h2 className="text-2xl font-semibold">DATA SISWA</h2>
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
        <TableSiswa data={filteredData} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default SiswaPage;
