"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { pool } from "@/lib/db";
import { cekBasicAuth } from "@/lib/auth";
import { EKSTENSI_BOLEH, MAKS_BYTE, ekstensi } from "@/lib/berkas";

async function wajibAdmin() {
  const h = await headers();
  if (!cekBasicAuth(h.get("authorization"))) throw new Error("Tidak berwenang");
}

function pesanGalat(e) {
  const m = String(e?.message || e);
  if (/credential|token/i.test(m)) {
    return "Penyimpanan file (Vercel Blob) belum tersambung. Buat Blob di tab Storage lalu redeploy.";
  }
  if (e?.code === "42P01") return "Tabel 'tugas' belum dibuat. Jalankan schema.sql di Neon.";
  if (!process.env.DATABASE_URL) return "DATABASE_URL belum diisi.";
  return `Terjadi kesalahan: ${m.slice(0, 200)}`;
}

async function hapusBlob(url) {
  if (!url) return;
  try {
    await del(url);
  } catch (e) {
    console.error("Gagal menghapus file lama:", e);
  }
}

async function unggah(file) {
  if (!EKSTENSI_BOLEH.includes(ekstensi(file.name))) {
    throw new Error("Jenis file tidak didukung. Gunakan PDF, Word, PowerPoint, Excel, atau gambar.");
  }
  if (file.size > MAKS_BYTE) throw new Error("Ukuran file melebihi 4 MB.");
  const bersih = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const blob = await put(`tugas/${bersih}`, file, { access: "public", addRandomSuffix: true });
  return { url: blob.url, nama: file.name };
}

export async function simpanTugas(_state, formData) {
  await wajibAdmin();

  const id = String(formData.get("id") || "");
  const judul = String(formData.get("judul") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim() || null;
  let link = String(formData.get("link") || "").trim() || null;
  const file = formData.get("file");
  const adaFile = file && typeof file === "object" && file.size > 0;
  const hapusFile = formData.get("hapus_file") === "on";

  if (!judul) return { galat: "Judul wajib diisi." };
  if (link) {
    if (!/^https?:\/\//i.test(link)) link = `https://${link}`;
    try {
      new URL(link);
    } catch {
      return { galat: "Format link tidak valid." };
    }
  }

  let baru = null;
  if (adaFile) {
    try {
      baru = await unggah(file);
    } catch (e) {
      return { galat: pesanGalat(e) };
    }
  }

  try {
    if (id) {
      if (!/^\d+$/.test(id)) throw new Error("ID tidak valid");
      const { rows } = await pool.query("SELECT file_url, file_name FROM tugas WHERE id = $1", [id]);
      if (!rows.length) {
        if (baru) await hapusBlob(baru.url);
        return { galat: "Tugas tidak ditemukan." };
      }
      let fileUrl = rows[0].file_url;
      let fileName = rows[0].file_name;
      if (baru) {
        fileUrl = baru.url;
        fileName = baru.nama;
      } else if (hapusFile) {
        fileUrl = null;
        fileName = null;
      }
      await pool.query(
        "UPDATE tugas SET judul=$1, deskripsi=$2, link=$3, file_url=$4, file_name=$5 WHERE id=$6",
        [judul, deskripsi, link, fileUrl, fileName, id]
      );
      if (rows[0].file_url && rows[0].file_url !== fileUrl) await hapusBlob(rows[0].file_url);
    } else {
      await pool.query(
        "INSERT INTO tugas (judul, deskripsi, link, file_url, file_name) VALUES ($1,$2,$3,$4,$5)",
        [judul, deskripsi, link, baru?.url ?? null, baru?.nama ?? null]
      );
    }
  } catch (e) {
    console.error(e);
    if (baru) await hapusBlob(baru.url);
    return { galat: pesanGalat(e) };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function hapusTugas(formData) {
  await wajibAdmin();
  const id = String(formData.get("id") || "");
  if (!/^\d+$/.test(id)) return;

  const { rows } = await pool.query("SELECT file_url FROM tugas WHERE id = $1", [id]);
  await pool.query("DELETE FROM tugas WHERE id = $1", [id]);
  if (rows[0]?.file_url) await hapusBlob(rows[0].file_url);

  revalidatePath("/", "layout");
  redirect("/admin");
}
