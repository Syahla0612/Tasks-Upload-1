import { pool } from "./db";
import { tanggalWIB, tanggalWaktuWIB } from "./format";
import { jenisBerkas } from "./berkas";

const TUJUH_HARI = 7 * 24 * 60 * 60 * 1000;

function siapkan(r) {
  const dibuat = new Date(r.created_at);
  return {
    id: r.id,
    judul: r.judul,
    deskripsi: r.deskripsi || "",
    link: r.link || "",
    fileUrl: r.file_url || "",
    fileName: r.file_name || "",
    adaFile: Boolean(r.file_url),
    jenis: r.file_url ? jenisBerkas(r.file_name || r.file_url) : "",
    tanggal: tanggalWIB(dibuat),
    tanggalLengkap: tanggalWaktuWIB(dibuat),
    baru: Date.now() - dibuat.getTime() < TUJUH_HARI,
  };
}

export function jelaskanGalat(e) {
  console.error(e);
  if (!process.env.DATABASE_URL) {
    return "DATABASE_URL belum diisi. Tambahkan database Neon di Vercel lalu redeploy.";
  }
  if (e?.code === "42P01") {
    return "Tabel 'tugas' belum dibuat. Jalankan isi file schema.sql di SQL Editor Neon.";
  }
  return "Belum bisa terhubung ke database. Periksa pengaturan Neon di Vercel lalu redeploy.";
}

const KOLOM = "id, judul, deskripsi, link, file_url, file_name, created_at";

export async function ambilSemuaTugas() {
  try {
    const { rows } = await pool.query(
      `SELECT ${KOLOM} FROM tugas ORDER BY created_at DESC, id DESC`
    );
    return { data: rows.map(siapkan), galat: null };
  } catch (e) {
    return { data: [], galat: jelaskanGalat(e) };
  }
}

export async function ambilTugas(id) {
  if (!/^\d+$/.test(String(id))) return { data: null, galat: null };
  try {
    const { rows } = await pool.query(`SELECT ${KOLOM} FROM tugas WHERE id = $1`, [id]);
    return { data: rows[0] ? siapkan(rows[0]) : null, galat: null };
  } catch (e) {
    return { data: null, galat: jelaskanGalat(e) };
  }
}
