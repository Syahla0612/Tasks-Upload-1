import Link from "next/link";
import { notFound } from "next/navigation";
import { ambilTugas } from "@/lib/tugas";
import Panel from "@/components/Panel";
import LabelBaru from "@/components/LabelBaru";
import PesanGalat from "@/components/PesanGalat";
import DokumenViewer from "@/components/DokumenViewer";

export const dynamic = "force-dynamic";

const tombol =
  "chamfer-sm inline-flex min-h-12 items-center px-5 font-bold";

export default async function DetailTugas({ params }) {
  const { id } = await params;
  const { data: t, galat } = await ambilTugas(id);

  if (galat) return <PesanGalat pesan={galat} />;
  if (!t) notFound();

  return (
    <article className="space-y-8">
      <Link
        href="/tugas"
        className={`${tombol} border border-neon text-neon hover:bg-panel-2`}
      >
        ← Kembali ke Daftar Tugas
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-sm tracking-widest text-neon">
            TGS-{String(t.id).padStart(3, "0")}
          </span>
          {t.baru && <LabelBaru />}
        </div>
        <h1 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl">{t.judul}</h1>
        <p className="mt-3 text-mute">
          Diunggah pada <time>{t.tanggalLengkap}</time>
        </p>
      </header>

      {t.deskripsi && (
        <Panel isi="p-6">
          <h2 className="font-display text-sm tracking-[0.3em] text-volt">DESKRIPSI</h2>
          <p className="mt-3 whitespace-pre-wrap text-lg">{t.deskripsi}</p>
        </Panel>
      )}

      {t.link && (
        <p>
          <a
            href={t.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${tombol} bg-panel-2 text-neon hover:bg-line`}
          >
            Buka tautan terkait ↗
          </a>
        </p>
      )}

      <section aria-labelledby="judul-dokumen" className="space-y-4">
        <h2 id="judul-dokumen" className="font-display text-2xl font-bold">
          Dokumen <span className="text-neon">Tugas</span>
        </h2>
        {t.adaFile ? (
          <>
            <p className="break-all text-mute">{t.fileName}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={t.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${tombol} bg-neon text-void hover:bg-volt`}
              >
                Buka di tab baru
              </a>
              <a
                href={`/api/berkas/${t.id}?unduh=1`}
                className={`${tombol} border border-neon text-neon hover:bg-panel-2`}
              >
                Unduh
              </a>
            </div>
            <DokumenViewer tugas={t} />
          </>
        ) : (
          <p className="text-mute">Tugas ini tidak memiliki dokumen.</p>
        )}
      </section>
    </article>
  );
}
