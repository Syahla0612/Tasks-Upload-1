"use client";

export default function Galat({ reset }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-bold text-pulse">Terjadi kesalahan</h1>
      <p className="mt-4 text-mute">
        Halaman belum bisa dimuat. Coba lagi, dan jika masih gagal periksa pengaturan database di Vercel.
      </p>
      <button
        onClick={() => reset()}
        className="chamfer-sm mt-6 min-h-12 bg-neon px-6 font-bold text-void hover:bg-volt"
      >
        Coba lagi
      </button>
    </main>
  );
}
