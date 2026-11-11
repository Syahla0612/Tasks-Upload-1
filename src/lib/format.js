const ZONA = "Asia/Jakarta";

export function tanggalWIB(nilai) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(nilai));
}

export function tanggalWaktuWIB(nilai) {
  const teks = new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(nilai));
  return `${teks} WIB`;
}
