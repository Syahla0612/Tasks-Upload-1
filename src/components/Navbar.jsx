"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/tugas", label: "Daftar Tugas" },
];

export default function Navbar() {
  const path = usePathname();
  const aktif = (href) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/90 backdrop-blur">
      <nav aria-label="Menu utama" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-sm font-black tracking-widest text-neon">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="6" y="6" width="12" height="12" />
            <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
          </svg>
          <span className="hidden sm:inline">SYAHLA.TS</span>
        </Link>
        <ul className="flex gap-2">
          {menu.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                aria-current={aktif(m.href) ? "page" : undefined}
                className={`chamfer-sm inline-flex min-h-12 items-center px-4 font-bold ${
                  aktif(m.href) ? "bg-neon text-void" : "text-ink hover:bg-panel-2"
                }`}
              >
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
