"use client";

import { useActionState, useState } from "react";
import { simpanTugas } from "@/app/admin/actions";

const MAKS = 4 * 1024 * 1024;

export default function FormTugas({ tugas }) {
  const [state, aksi, menunggu] = useActionState(simpanTugas, { galat: null });
  const [galatFile, setGalatFile] = useState("");

  function cekFile(e) {
    const f = e.target.files?.[0];
    if (f && f.size > MAKS) {
      setGalatFile("File lebih dari 4 MB, pilih file yang lebih kecil.");
      e.target.value = "";
    } else {
      setGalatFile("");
    }
  }

  return (
    <form action={aksi} className="max-w-xl space-y-3 border border-black p-3">
      {tugas && <input type="hidden" name="id" value={tugas.id} />}

      <label className="block">
        Judul (wajib)
        <input name="judul" required defaultValue={tugas?.judul ?? ""} className="block w-full border border-black p-1" />
      </label>

      <label className="block">
        Deskripsi
        <textarea
          name="deskripsi"
          rows={4}
          defaultValue={tugas?.deskripsi ?? ""}
          className="block w-full border border-black p-1"
        />
      </label>

      <label className="block">
        Link (opsional)
        <input name="link" defaultValue={tugas?.link ?? ""} className="block w-full border border-black p-1" />
      </label>

      <label className="block">
        File (PDF, Word, PowerPoint, Excel, atau gambar; maks. 4 MB)
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
          onChange={cekFile}
          className="block"
        />
      </label>
      {galatFile && <p className="text-red-700">{galatFile}</p>}

      {tugas?.file_url && (
        <p>
          File saat ini:{" "}
          <a href={tugas.file_url} target="_blank" rel="noopener noreferrer" className="underline">
            {tugas.file_name || "berkas"}
          </a>
          <br />
          <label>
            <input type="checkbox" name="hapus_file" /> Hapus file ini (jika tidak mengunggah file baru)
          </label>
          <br />
          <small>Mengunggah file baru otomatis mengganti dan menghapus file lama.</small>
        </p>
      )}

      {state?.galat && (
        <p role="alert" className="text-red-700">
          {state.galat}
        </p>
      )}

      <button type="submit" disabled={menunggu} className="border border-black bg-gray-200 px-4 py-1">
        {menunggu ? "Menyimpan…" : tugas ? "Simpan perubahan" : "Tambah tugas"}
      </button>
    </form>
  );
}
