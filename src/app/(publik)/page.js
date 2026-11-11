import Link from "next/link";
import { profil } from "@/data/profil";
import { ambilSemuaTugas } from "@/lib/tugas";
import Panel from "@/components/Panel";
import TugasKartu from "@/components/TugasKartu";
import RangkaianHias from "@/components/RangkaianHias";
import PesanGalat from "@/components/PesanGalat";

export const dynamic = "force-dynamic";

export default async function Beranda() {
  const { data, galat } = await ambilSemuaTugas();
  const terbaru = data.slice(0, 3);
  const k = profil.kontak;

  const kontak = [
    { label: "Email", nilai: k.email, href: `mailto:${k.email}` },
    { label: "Instagram", nilai: `@${k.instagram}`, href: `https://instagram.com/${k.instagram}` },
    { label: "GitHub", nilai: k.github, href: `https://github.com/${k.github}` },
  ];

  return (
    <div className="space-y-20">
      {/* Perkenalan */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="font-display text-xs tracking-[0.35em] text-volt">// PORTOFOLIO TUGAS KULIAH</p>
          <h1 className="cahaya-neon mt-4 font-display text-4xl font-black leading-tight sm:text-5xl">
            Halo, saya <span className="text-neon">{profil.nama}</span>
          </h1>
          <p className="mt-2 font-display text-lg text-pulse">Mahasiswa {profil.jurusan}</p>
          <p className="mt-5 max-w-xl text-lg text-mute">{profil.perkenalan}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tugas"
              className="chamfer-sm inline-flex min-h-14 items-center bg-neon px-7 text-lg font-bold text-void hover:bg-volt"
            >
              Lihat Daftar Tugas
            </Link>
            <a
              href="#kontak"
              className="chamfer-sm inline-flex min-h-14 items-center border border-neon px-7 text-lg font-bold text-neon hover:bg-panel-2"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        <Panel isi="p-6">
          <p className="font-display text-xs tracking-[0.3em] text-volt">STATUS PORTOFOLIO</p>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-mute">Jumlah tugas</dt>
              <dd className="font-display text-5xl font-black text-neon">{galat ? "–" : data.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Terakhir diperbarui</dt>
              <dd className="font-display text-base font-bold leading-snug">
                {data[0] ? data[0].tanggal : "Belum ada"}
              </dd>
            </div>
          </dl>
          <RangkaianHias className="mt-6 w-full text-neon/70" />
        </Panel>
      </section>

      {/* Tugas terbaru */}
      <section aria-labelledby="judul-terbaru">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="judul-terbaru" className="font-display text-2xl font-bold">
            Tugas <span className="text-neon">Terbaru</span>
          </h2>
          <Link href="/tugas" className="font-semibold text-neon underline underline-offset-4 hover:text-volt">
            Lihat semua tugas →
          </Link>
        </div>
        <div className="mt-6">
          {galat ? (
            <PesanGalat pesan={galat} />
          ) : terbaru.length === 0 ? (
            <p className="text-mute">Belum ada tugas yang diunggah.</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {terbaru.map((t) => (
                <TugasKartu key={t.id} tugas={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tentang saya */}
      <section aria-labelledby="judul-tentang">
        <Panel isi="p-6 sm:p-8">
          <h2 id="judul-tentang" className="font-display text-2xl font-bold">
            Tentang <span className="text-neon">Saya</span>
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 text-lg text-mute">
            {profil.tentang.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Panel>
      </section>

      {/* Kontak */}
      <section id="kontak" aria-labelledby="judul-kontak">
        <h2 id="judul-kontak" className="font-display text-2xl font-bold">
          <span className="text-neon">Kontak</span>
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {kontak.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group block"
              >
                <Panel className="transition group-hover:from-neon group-hover:to-volt/60" isi="p-5">
                  <p className="font-display text-xs tracking-[0.3em] text-volt">{c.label.toUpperCase()}</p>
                  <p className="mt-2 break-all text-lg font-bold text-ink">{c.nilai}</p>
                  <p className="mt-2 font-semibold text-neon">Buka {c.label} →</p>
                </Panel>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
