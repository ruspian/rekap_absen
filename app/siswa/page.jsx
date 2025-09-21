"use client";

import { TableSiswa } from "@/components/table/TabelSiswa";
import Breadcrumb from "@/components/ui/breadcrumb";
import { AnimatedFloatingButton } from "@/components/ui/floating-action-button";
import { KelasDropdown } from "@/components/ui/kelas-selector-dropdown";
import { FileDown, Printer, UserPlus } from "lucide-react";
import React from "react";

const SiswaPage = () => {
  const Icons = [
    {
      Icon: UserPlus,
      href: "/siswa/tambah",
      className: "hover:bg-accent",
    },
    {
      Icon: Printer,
      href: "/siswa/cetak",
      className: "hover:bg-accent",
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

      <TableSiswa />
    </div>
  );
};

export default SiswaPage;
