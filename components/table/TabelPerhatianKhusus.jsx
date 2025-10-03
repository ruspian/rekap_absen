function TabelPerhatianKhusus({ dataRekap, dataLaporan }) {
  console.log("dataRekap", dataRekap);
  console.log("dataLaporan", dataLaporan);

  return (
    <div className="bg-background max-w-[1200px] mx-auto rounded-md shadow-md border">
      {/* Wrapper biar bisa slide kalau overflow */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          {/* Header Kolom */}
          <thead className="bg-slate-100">
            <tr>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                No
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Nama
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Alfa
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Izin
              </th>
              <th className="border px-2 py-2 whitespace-nowrap" rowSpan={2}>
                Sakit
              </th>

              <th
                className="border px-2 py-2 whitespace-nowrap print-hidden"
                rowSpan={2}
              >
                Aksi
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {dataRekap &&
              dataRekap.map((item, index) => (
                <tr className="hover:bg-slate-50" key={index + 1}>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {item.siswa.nama}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {item.total.alfa}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {item.total.izin}
                  </td>
                  <td className="border px-2 py-1 text-center whitespace-nowrap">
                    {item.total.sakit}
                  </td>

                  <td className="border px-2 py-1 text-center print-hidden">
                    <div className="flex gap-2 items-center justify-center">
                      {/* <TambahButtonMinat /> */}
                      {/* <EditButtonMinat /> */}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { TabelPerhatianKhusus };
