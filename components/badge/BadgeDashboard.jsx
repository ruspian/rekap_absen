import { BookMinus, BookUser, BookX } from "lucide-react";
import React from "react";

const BadgeDashboard = ({ dataSiswa }) => {
  console.log("dataSiswa", dataSiswa);

  const items = [
    {
      icon: <BookUser size={50} />,
      title: "Jumlah Siswa",
      count: dataSiswa.jumlahSiswa,
      sub: "Siswa",
    },
    {
      icon: <BookX size={50} />,
      title: "Jumlah Laki-Laki",
      count: dataSiswa.jumlahLakiLaki,
      sub: "Siswa",
    },
    {
      icon: <BookMinus size={50} />,
      title: "Jumlah Perempuan",
      count: dataSiswa.jumlahPerempuan,
      sub: "siswa",
    },
  ];
  return (
    <div className="flex gap-4">
      {items.map((item, index) => (
        <div
          key={index + item.title}
          className="flex gap-4 border items-center p-4 rounded-md "
        >
          {item.icon}
          <div className="">
            <p className="font-semibold">{item.title}</p>
            <p className="font-black text-4xl">
              {item.count}{" "}
              <span className="text-sm font-normal">{item.sub}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeDashboard;
