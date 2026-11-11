import { profil } from "@/data/profil";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <p className="mx-auto max-w-6xl px-4 py-8 text-center text-mute">
        © {new Date().getFullYear()} {profil.nama} · {profil.jurusan}
      </p>
    </footer>
  );
}
