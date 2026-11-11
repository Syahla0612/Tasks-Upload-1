const MIME = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
};

export const EKSTENSI_BOLEH = Object.keys(MIME);
export const MAKS_BYTE = 4 * 1024 * 1024; // 4 MB

export function ekstensi(nama = "") {
  const bagian = String(nama).split("?")[0].split(".");
  return (bagian.length > 1 ? bagian.pop() : "").toLowerCase();
}

export function mimeDari(nama) {
  return MIME[ekstensi(nama)];
}

export function jenisBerkas(nama) {
  const e = ekstensi(nama);
  if (e === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(e)) return "gambar";
  if (["doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(e)) return "office";
  return "lain";
}
