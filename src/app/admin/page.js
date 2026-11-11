import Link from "next/link";
import { pool } from "@/lib/db";
import { jelaskanGalat } from "@/lib/tugas";
import { tanggalWaktuWIB } from "@/lib/format";
import FormTugas from "@/components/admin/FormTugas";
import TombolHapus from "@/components/admin/TombolHapus";

export const dynamic = "force-dynamic";

export default async function Admin() {
  let rows = [];
  let galat = null;
  try {
    ({ rows } = await pool.query(
      "SELECT id, judul, file_url, file_name, created_at FROM tugas ORDER BY created_at DESC, id DESC"
    ));
  } catch (e) {
    galat = jelaskanGalat(e);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin — Portofolio Tugas</h1>
      <p>
        <Link href="/" className="underline">
          Lihat situs
        </Link>
      </p>

      <h2 className="text-xl font-bold">Tambah tugas</h2>
      <FormTugas />

      <h2 className="text-xl font-bold">Daftar tugas ({rows.length})</h2>
      {galat && <p className="text-red-700">{galat}</p>}
      <div className="overflow-x-auto">
        <table className="border-collapse border border-black">
          <thead>
            <tr>
              {["ID", "Judul", "Diunggah (WIB)", "File", "Aksi"].map((h) => (
                <th key={h} className="border border-black p-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="border border-black p-2">{r.id}</td>
                <td className="border border-black p-2">{r.judul}</td>
                <td className="border border-black p-2">{tanggalWaktuWIB(r.created_at)}</td>
                <td className="border border-black p-2">
                  {r.file_url ? (
                    <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="underline">
                      {r.file_name || "berkas"}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-black p-2">
                  <Link href={`/admin/edit/${r.id}`} className="underline">
                    Edit
                  </Link>{" "}
                  | <TombolHapus id={r.id} judul={r.judul} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="border border-black p-2">
                  Belum ada tugas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
