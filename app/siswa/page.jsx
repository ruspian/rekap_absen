"use client";

import { TableSiswa } from "@/components/table/TabelSiswa";
import Breadcrumb from "@/components/ui/breadcrumb";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { getSiswa } from "@/lib/data";
import { formatTanggal } from "@/lib/formatTanggal";
import { useToaster } from "@/providers/ToasterProvider";
import { FileDown, Printer, UserPlus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";

const SiswaPage = () => {
  const [dataSiswa, setDataSiswa] = useState([]);
  const toaster = useToaster();

  const tableRef = useRef();

  useEffect(() => {
    // FETCH DATA SISWA
    const fetchSiswa = async () => {
      try {
        const siswa = await getSiswa();
        setDataSiswa(siswa);
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

    // panggil fungsi fetchSiswa
    fetchSiswa();
  }, [toaster]); // muat ulang ketika toasternya berubah

  // FUNGSI PRINT
  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "Data Siswa",
  });

  // FUNGSI DOWNLOAD EXCEL
  const handleDownloadExcel = () => {
    // Mapping data sesuai field yang mau ditampilkan
    const cleanData = dataSiswa.map((siswa, index) => ({
      No: index + 1,
      Nama: siswa.nama,
      Jenis_Kelamin: siswa.gender || "-",
      Tempat_Lahir: siswa.tempat_lahir || "-",
      Tanggal_Lahir: formatTanggal(siswa.tanggal_lahir) || "-",
      No_Hp_Ayah: siswa.no_hp_ayah || "-",
      No_Hp_ibu: siswa.no_hp_ibu || "-",
      Nama_Ayah: siswa.nama_ayah || "-",
      Nama_Ibu: siswa.nama_ibu || "-",
      Alamat: siswa.alamat || "-",
    }));

    // Convert ke worksheet
    const worksheet = XLSX.utils.json_to_sheet(cleanData);

    // Atur lebar kolom biar rapi
    worksheet["!cols"] = [
      { wch: 5 }, // No
      { wch: 25 }, // Nama
      { wch: 15 }, // Jenis Kelamin
      { wch: 20 }, // Tempat Lahir
      { wch: 15 }, // Tanggal Lahir
      { wch: 15 }, // no hp ayah
      { wch: 15 }, // no hp ibu
      { wch: 25 }, // Ayah
      { wch: 25 }, // Ibu
      { wch: 25 }, // alamat
    ];

    // Buat workbook & export
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");
    XLSX.writeFile(workbook, "data-siswa.xlsx");
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
      onClick: handleDownloadExcel,
      className: "hover:bg-accent",
    },
  ];

  return (
    <div>
      <Breadcrumb />

      <div className="my-10">
        <h2 className="text-2xl font-semibold">Data Siswa</h2>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="relative flex items-start px-4 mb-4">
          <AnimatedFloatingButton icons={Icons} iconSize={15} />
        </div>

        <div className="relative z-10">
          <KelasDropdown className="" />
        </div>
      </div>

      <div ref={tableRef}>
        <TableSiswa data={dataSiswa} />
      </div>
    </div>
  );
};

export default SiswaPage;
