import PdfViewer from "./PdfViewer";

export default function DokumenViewer({ tugas }) {
  const { jenis, fileUrl, fileName, id } = tugas;

  if (jenis === "pdf") return <PdfViewer src={`/api/berkas/${id}`} />;

  if (jenis === "gambar") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fileUrl}
        alt={fileName || tugas.judul}
        className="chamfer-sm mx-auto h-auto max-w-full border border-line bg-white"
      />
    );
  }

  if (jenis === "office") {
    const src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
    return (
      <div>
        <iframe
          src={src}
          title={`Pratinjau ${fileName}`}
          className="h-[75vh] min-h-[480px] w-full border border-line bg-white"
        />
        <p className="mt-2 text-sm text-mute">
          Jika pratinjau tidak tampil, gunakan tombol “Buka di tab baru” atau “Unduh”.
        </p>
      </div>
    );
  }

  return <p className="text-mute">Pratinjau tidak tersedia. Silakan gunakan tombol Unduh.</p>;
}
