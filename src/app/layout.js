import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });
const exo = Exo_2({ subsets: ["latin"], variable: "--font-exo", display: "swap" });

export const metadata = {
  title: {
    default: "Portofolio Tugas Kuliah — Syahla Tsaqifa",
    template: "%s · Syahla Tsaqifa",
  },
  description: "Kumpulan tugas kuliah Teknik Elektro milik Syahla Tsaqifa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${orbitron.variable} ${exo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
