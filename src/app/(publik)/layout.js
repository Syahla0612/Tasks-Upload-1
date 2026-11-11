import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutPublik({ children }) {
  return (
    <>
      <a
        href="#isi"
        className="fixed left-2 top-2 z-50 -translate-y-20 bg-volt px-4 py-3 font-bold text-void focus:translate-y-0"
      >
        Lewati ke konten
      </a>
      <div
        aria-hidden="true"
        className="latar-grid pointer-events-none fixed inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <Navbar />
      <main id="isi" className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
