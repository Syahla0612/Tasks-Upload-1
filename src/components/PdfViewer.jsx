"use client";

import { useEffect, useRef, useState } from "react";

const LANGKAH_ZOOM = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

function HalamanPdf({ pdf, nomor, lebar }) {
  const pembungkus = useRef(null);
  const kanvas = useRef(null);
  const renderSebelumnya = useRef(null);
  const [terlihat, setTerlihat] = useState(nomor <= 2);
  const [tinggi, setTinggi] = useState(Math.round(lebar * 1.414));

  // Render hanya saat halaman mendekati layar (hemat memori di HP).
  useEffect(() => {
    if (terlihat || !pembungkus.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTerlihat(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(pembungkus.current);
    return () => io.disconnect();
  }, [terlihat]);

  useEffect(() => {
    if (!terlihat || !lebar) return;
    let batal = false;
    let tugas = null;

    (async () => {
      const halaman = await pdf.getPage(nomor);
      if (batal) return;
      const dasar = halaman.getViewport({ scale: 1 });
      const skala = lebar / dasar.width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vp = halaman.getViewport({ scale: skala * dpr });

      if (renderSebelumnya.current) {
        await renderSebelumnya.current.promise.catch(() => {});
        if (batal) return;
      }
      const c = kanvas.current;
      if (!c) return;
      c.width = Math.floor(vp.width);
      c.height = Math.floor(vp.height);
      c.style.width = `${lebar}px`;
      c.style.height = `${Math.floor(vp.height / dpr)}px`;
      setTinggi(Math.floor(vp.height / dpr));

      tugas = halaman.render({ canvasContext: c.getContext("2d"), viewport: vp });
      renderSebelumnya.current = tugas;
      await tugas.promise.catch(() => {});
    })();

    return () => {
      batal = true;
      if (tugas) tugas.cancel();
    };
  }, [pdf, nomor, lebar, terlihat]);

  return (
    <div
      ref={pembungkus}
      className="mx-auto bg-white shadow-[0_0_0_1.5px_var(--color-line)]"
      style={{ width: lebar, minHeight: tinggi }}
    >
      <canvas ref={kanvas} aria-label={`Halaman ${nomor}`} className="block" />
    </div>
  );
}

export default function PdfViewer({ src }) {
  const wadah = useRef(null);
  const [lebarWadah, setLebarWadah] = useState(0);
  const [pdf, setPdf] = useState(null);
  const [jumlah, setJumlah] = useState(0);
  const [status, setStatus] = useState("memuat");
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = wadah.current;
    if (!el) return;
    const ukur = () => setLebarWadah(Math.floor(el.clientWidth));
    ukur();
    const ro = new ResizeObserver(ukur);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let batal = false;
    let dokumen = null;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.min.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();
        dokumen = await pdfjs.getDocument({ url: src, disableRange: true, disableStream: true }).promise;
        if (batal) {
          dokumen.destroy();
          return;
        }
        setPdf(dokumen);
        setJumlah(dokumen.numPages);
        setStatus("siap");
      } catch (e) {
        console.error(e);
        if (!batal) setStatus("gagal");
      }
    })();
    return () => {
      batal = true;
      if (dokumen) dokumen.destroy();
    };
  }, [src]);

  const idx = LANGKAH_ZOOM.indexOf(zoom);
  const lebar = Math.max(Math.floor(lebarWadah * zoom), 1);

  if (status === "gagal") {
    return (
      <div>
        <p role="alert" className="mb-3 text-pulse">
          Pembaca PDF utama gagal dimuat, memakai tampilan cadangan.
        </p>
        <iframe src={src} title="Dokumen PDF" className="h-[75vh] min-h-[480px] w-full border border-line bg-white" />
      </div>
    );
  }

  const btn =
    "chamfer-sm min-h-12 bg-panel-2 px-5 font-bold text-neon hover:bg-line disabled:opacity-40";

  return (
    <div>
      <div className="sticky top-[4.75rem] z-30 mb-4 flex flex-wrap items-center gap-3 border border-line bg-void/95 p-3 backdrop-blur">
        <button type="button" className={btn} disabled={idx <= 0} onClick={() => setZoom(LANGKAH_ZOOM[idx - 1])}>
          Perkecil
        </button>
        <button
          type="button"
          className={btn}
          disabled={idx >= LANGKAH_ZOOM.length - 1}
          onClick={() => setZoom(LANGKAH_ZOOM[idx + 1])}
        >
          Perbesar
        </button>
        <span className="font-bold">{Math.round(zoom * 100)}%</span>
        <span className="ml-auto text-mute">{status === "siap" ? `${jumlah} halaman` : "Memuat dokumen…"}</span>
      </div>

      <div ref={wadah} className="overflow-x-auto">
        {status === "memuat" && <p className="py-10 text-center text-mute">Memuat dokumen…</p>}
        {pdf && lebarWadah > 0 && (
          <div className="space-y-4">
            {Array.from({ length: jumlah }, (_, i) => (
              <HalamanPdf key={i + 1} pdf={pdf} nomor={i + 1} lebar={lebar} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
