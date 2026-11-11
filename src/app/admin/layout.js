export const metadata = { title: "Admin", robots: { index: false, follow: false } };

// Tampilan admin sengaja polos: latar putih, teks hitam.
export default function LayoutAdmin({ children }) {
  return (
    <div className="min-h-screen bg-white p-4 font-sans text-base leading-normal text-black">{children}</div>
  );
}
