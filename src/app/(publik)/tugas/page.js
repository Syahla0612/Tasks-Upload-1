import { ambilSemuaTugas } from "@/lib/tugas";
import DaftarTugas from "@/components/DaftarTugas";
import PesanGalat from "@/components/PesanGalat";

export const dynamic = "force-dynamic";
export const metadata = { title: "Daftar Tugas" };

export default async function HalamanDaftarTugas() {
  const { data, galat } = await ambilSemuaTugas();

  return (
    <div>
      <p className="font-display text-xs tracking-[0.35em] text-volt">// ARSIP</p>
      <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">
        Daftar <span className="text-neon">Tugas</span>
      </h1>
      <p className="mt-2 text-mute">Diurutkan dari yang paling baru diunggah. Tanggal menunjukkan waktu unggah (WIB).</p>
      <div className="mt-8">
        {galat ? <PesanGalat pesan={galat} /> : <DaftarTugas tugas={data} />}
      </div>
    </div>
  );
}
