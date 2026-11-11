import { pool } from "@/lib/db";
import { mimeDari } from "@/lib/berkas";

export const dynamic = "force-dynamic";

// Meneruskan berkas dari Vercel Blob lewat domain yang sama (bebas masalah CORS).
export async function GET(request, { params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return new Response("Tidak ditemukan", { status: 404 });

  try {
    const { rows } = await pool.query("SELECT file_url, file_name FROM tugas WHERE id = $1", [id]);
    const b = rows[0];
    if (!b?.file_url) return new Response("Tidak ditemukan", { status: 404 });

    const asal = await fetch(b.file_url);
    if (!asal.ok || !asal.body) return new Response("Gagal mengambil berkas", { status: 502 });

    const unduh = new URL(request.url).searchParams.get("unduh") === "1";
    const nama = b.file_name || "berkas";
    const aman = nama.replace(/[^\w.\- ]/g, "_");

    const headers = new Headers({
      "Content-Type": mimeDari(nama) || asal.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition": `${unduh ? "attachment" : "inline"}; filename="${aman}"; filename*=UTF-8''${encodeURIComponent(nama)}`,
      "Cache-Control": "public, max-age=300",
    });
    const panjang = asal.headers.get("content-length");
    if (panjang) headers.set("Content-Length", panjang);

    return new Response(asal.body, { headers });
  } catch (e) {
    console.error(e);
    return new Response("Terjadi kesalahan", { status: 500 });
  }
}
