import Link from "next/link";
import { notFound } from "next/navigation";
import { pool } from "@/lib/db";
import FormTugas from "@/components/admin/FormTugas";

export const dynamic = "force-dynamic";

export default async function EditTugas({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const { rows } = await pool.query(
    "SELECT id, judul, deskripsi, link, file_url, file_name FROM tugas WHERE id = $1",
    [id]
  );
  if (!rows[0]) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit tugas #{rows[0].id}</h1>
      <p>
        <Link href="/admin" className="underline">
          ← Kembali ke admin
        </Link>
      </p>
      <FormTugas tugas={rows[0]} />
    </div>
  );
}
