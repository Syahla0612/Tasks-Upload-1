import Link from "next/link";

export const metadata = { title: "Halaman tidak ditemukan" };

export default function TidakDitemukan() {
  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="font-display text-6xl font-black text-neon">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-mute">Alamat yang Anda buka tidak ada atau tugasnya sudah dihapus.</p>
      <Link
        href="/tugas"
        className="chamfer-sm mt-6 inline-flex min-h-12 items-center bg-neon px-6 font-bold text-void hover:bg-volt"
      >
        Ke Daftar Tugas
      </Link>
    </main>
  );
}
