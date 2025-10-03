"use client";

import BadgeDashboard from "@/components/badge/BadgeDashboard";
import { TabelPerhatianKhusus } from "@/components/table/TabelPerhatianKhusus";
import Breadcrumb from "@/components/ui/breadcrumb";
import { LayoutPanelTop } from "lucide-react";
import React from "react";
import { getLaporan, getRekap, getSiswa } from "@/lib/data";
import { useEffect, useState } from "react";
import { useToaster } from "@/providers/ToasterProvider";

const DashboardPage = () => {
  const [dataRekap, setDataRekap] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataBulanIni, setDataBulanIni] = useState(null);
  const [dataLaporan, setDataLaporan] = useState([]);

  const toaster = useToaster();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rekap, siswa, laporan] = await Promise.all([
          getRekap(),
          getSiswa(),
          getLaporan(),
        ]);
        setDataRekap(rekap);
        setDataSiswa(siswa);
        setDataLaporan(laporan);

        // filter data sesuai bulan
        if (rekap && rekap.length > 0) {
          const namaBulanSekarang = new Date().toLocaleString("id-ID", {
            month: "long",
          });

          // cari bulan yang cocok
          const dataUntukBulanIni = rekap.find((item) => {
            item.bulan.namaBulan.toLowerCase() ===
              namaBulanSekarang.toLowerCase();
          });

          // set data bulan ini
          if (dataUntukBulanIni) {
            setDataBulanIni(dataUntukBulanIni);
          }

          if (!dataUntukBulanIni) {
            // jika data dibulan ini tidak ada tampilkan data bulan sebelumnya
            setDataBulanIni(rekap[rekap.length - 1]);
          }
        }
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
  }, []);

  return (
    <div>
      <Breadcrumb />

      <div className="my-10 flex gap-2 items-center">
        <LayoutPanelTop />
        <h2 className="text-2xl font-semibold">DASHBOARD</h2>
      </div>

      <BadgeDashboard dataRekap={dataBulanIni} dataSiswa={dataSiswa} />

      <div className="mt-6">
        <h3 className="font-semibold text-xl mb-2">
          Siswa Butuh Perhatian Khusus
        </h3>
        <TabelPerhatianKhusus dataLaporan={dataLaporan} dataRekap={dataRekap} />
      </div>
    </div>
  );
};

export default DashboardPage;
