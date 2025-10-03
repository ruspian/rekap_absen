// AMBIL KELAS
export const getKelas = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/kelas`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// AMBIL SISWA
export const getSiswa = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/siswa`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// AMBIL DATA SISWA BERDASARKAN ID
export const getSiswaById = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/siswa/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// AMBIL DATA BULAN
export const getBulan = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bulan`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// AMBIL DATA MINGGU
export const getMinggu = async () => {
  try {
    const response = await fetch(
      `
      ${process.env.NEXT_PUBLIC_API_URL}/api/minggu`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// AMBIL DATA KEPALA SEKOLAH
export const getKepalaSekolah = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/kepsek`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// AMBIL DATA BAKAT DAN MINAT
export const getBakat = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bakat`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error.message);
  }
};

// AMBIL DATA PEMBINAAN WALI
export const getPembinaanWali = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pembinaan-wali`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error.message);
  }
};

// AMBIL DATA PEMBINAAN KASUS
export const getPembinaanKasus = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pembinaan-kasus`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error.message);
  }
};

// AMBIL DATA PEMBINAAN KASUS
export const getInventaris = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/inventaris`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error.message);
  }
};

// AMBIL DATA INVENTARIS BERDASARKAN ID
export const getInventarisById = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/inventaris/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// AMBIL DATA REKAP
export const getRekap = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rekap/`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// AMBIL DATA REKAP
export const getLaporan = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rekap/laporan`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
