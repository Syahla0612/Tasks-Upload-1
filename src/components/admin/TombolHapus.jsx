"use client";

import { hapusTugas } from "@/app/admin/actions";

export default function TombolHapus({ id, judul }) {
  return (
    <form
      action={hapusTugas}
      className="inline"
      onSubmit={(e) => {
        if (!confirm(`Hapus tugas "${judul}"? File di Blob juga ikut terhapus.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="underline">
        Hapus
      </button>
    </form>
  );
}
