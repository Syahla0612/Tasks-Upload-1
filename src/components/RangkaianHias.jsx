// Ilustrasi jalur rangkaian listrik (hanya hiasan).
export default function RangkaianHias({ className = "" }) {
  return (
    <svg viewBox="0 0 320 90" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="2">
        <path className="jejak" d="M0 20 H70 L90 40 H150 L170 20 H230 L250 45 H320" />
        <path className="jejak" d="M0 70 H40 L60 50 H120 L140 70 H200 L220 55 H320" />
        <path d="M150 40 V70" strokeOpacity="0.5" />
      </g>
      <g fill="#c8ff3d">
        <circle cx="70" cy="20" r="4" />
        <circle cx="150" cy="40" r="4" />
        <circle cx="230" cy="20" r="4" />
        <circle cx="120" cy="50" r="4" />
        <circle cx="200" cy="70" r="4" />
      </g>
    </svg>
  );
}
