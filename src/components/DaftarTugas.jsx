"use client";

import { useMemo, useState } from "react";
import TugasKartu from "./TugasKartu";

const FILTER = [
  { id: "semua", label: "Semua" },
  { id: "baru", label: "Terbaru (7 hari terakhir)" },
  { id: "dokumen", label: "Ada dokumen" },
];

export default function DaftarTugas({ tugas }) {
  const [kata, setKata] = useState("");
  const [filter, setFilter] = useState("semua");

  const hasil = useMemo(() => {
    const k = kata.trim().toLowerCase();
    return tugas.filter((t) => {
      if (filter === "baru" && !t.baru) return false;
      if (filter === "dokumen" && !t.adaFile) return false;
      if (!k) return true;
      return `${t.judul} ${t.deskripsi}`.toLowerCase().includes(k);
    });
  }, [tugas, kata, filter]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="cari" className="font-bold">
          Cari tugas
        </label>
        <input
          id="cari"
          type="search"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Ketik judul atau kata kunci…"
          className="chamfer-sm mt-2 min-h-14 w-full border border-line bg-panel px-4 text-lg text-ink placeholder:text-mute"
        />
      </div>

      <div role="group" aria-label="Filter tugas" className="flex flex-wrap gap-3">
        {FILTER.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`chamfer-sm min-h-12 px-5 font-bold ${
              filter === f.id ? "bg-neon text-void" : "border border-line bg-panel text-ink hover:bg-panel-2"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="text-mute">
        Menampilkan {hasil.length} dari {tugas.length} tugas
      </p>

      {hasil.length === 0 ? (
        <p className="text-lg text-mute">Belum ada tugas yang cocok.</p>
      ) : (
        <ul className="space-y-5">
          {hasil.map((t) => (
            <li key={t.id}>
              <TugasKartu tugas={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
