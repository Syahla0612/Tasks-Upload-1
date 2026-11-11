// Panel bersudut terpotong dengan garis tepi gradasi neon.
export default function Panel({ children, className = "", isi = "" }) {
  return (
    <div className={`chamfer bg-gradient-to-br from-neon/60 via-line to-pulse/40 p-[1.5px] ${className}`}>
      <div className={`chamfer h-full bg-panel ${isi}`}>{children}</div>
    </div>
  );
}
