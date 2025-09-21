// format tanggal ke indonesia
export function formatTanggal(tanggal) {
  if (!tanggal) return "-";
  try {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return tanggal;
  }
}

// format tanggal yyyy-mm-dd
export const formatToYyyyMmDd = (isoDate) => {
  if (!isoDate) return "";
  try {
    return new Date(isoDate).toISOString().split("T")[0];
  } catch (error) {
    return "";
  }
};
