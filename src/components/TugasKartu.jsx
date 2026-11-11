import Link from "next/link";
import Panel from "./Panel";
import LabelBaru from "./LabelBaru";

export default function TugasKartu({ tugas }) {
  return (
    <Link href={`/tugas/${tugas.id}`} className="group block">
      <Panel className="h-full transition group-hover:from-neon group-hover:to-volt/60" isi="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-display tracking-widest text-neon">
            TGS-{String(tugas.id).padStart(3, "0")}
          </span>
          {tugas.baru && <LabelBaru />}
          {tugas.adaFile && (
            <span className="rounded border border-volt/60 px-2 py-0.5 text-xs font-bold text-volt">
              Ada dokumen
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug">{tugas.judul}</h3>
        {tugas.deskripsi && <p className="mt-2 line-clamp-2 text-mute">{tugas.deskripsi}</p>}
        <p className="mt-4 text-sm text-mute">Diunggah {tugas.tanggal}</p>
        <span className="mt-3 inline-block font-bold text-neon group-hover:text-volt">Buka tugas →</span>
      </Panel>
    </Link>
  );
}
