"use client";

import { TableSiswa } from "@/components/table/TabelSiswa";
import Breadcrumb from "@/components/ui/breadcrumb";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { FileDown, Printer, UserPlus } from "lucide-react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const SiswaPage = () => {
  const tableRef = useRef();

  // fungsi print
  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "Data Siswa",
  });

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
      href: "/siswa/download",
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
        <TableSiswa />
      </div>
    </div>
  );
};

export default SiswaPage;
