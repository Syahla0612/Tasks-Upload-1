// Pemeriksaan Basic Auth (dipakai middleware dan Server Action).
export function cekBasicAuth(header) {
  const sandi = process.env.ADMIN_PASSWORD;
  if (!sandi || !header || !header.startsWith("Basic ")) return false;
  try {
    const biner = atob(header.slice(6));
    const teks = new TextDecoder().decode(Uint8Array.from(biner, (c) => c.charCodeAt(0)));
    const titik = teks.indexOf(":");
    if (titik < 0) return false;
    return teks.slice(titik + 1) === sandi; // username bebas
  } catch {
    return false;
  }
}
