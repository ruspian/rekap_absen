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
