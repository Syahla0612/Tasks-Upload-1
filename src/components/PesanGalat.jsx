export default function PesanGalat({ pesan }) {
  return (
    <div role="alert" className="chamfer-sm border-l-4 border-pulse bg-panel-2 p-5">
      <p className="font-display text-sm tracking-widest text-pulse">DATA BELUM BISA DIMUAT</p>
      <p className="mt-2 text-lg">{pesan}</p>
      <p className="mt-2 text-sm text-mute">Panduan lengkap ada di file README.md.</p>
    </div>
  );
}
