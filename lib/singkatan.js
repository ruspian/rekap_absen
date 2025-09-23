// FUNGSI SINGKAT JURUSAN
export const singkatanJurusan = (jurusan) => {
  const mapping = {
    "Teknik Komputer Jaringan": "TKJ",
    "Agribisnis Ternak Ruminansia": "ATR",
  };

  return mapping[jurusan] || jurusan;
};

// FUNGSI SINGKATAN ABSEN
export const singkatanAbsen = (absen) => {
  const mapping = {
    izin: "I",
    sakit: "S",
    alfa: "A",
  };

  return mapping[absen] || absen;
};
