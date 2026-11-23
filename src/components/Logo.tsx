// Monograma "L." recriado à mão como aproximação do logo do Instagram.
// TODO: substituir pelo vetor oficial (vectorizar a foto de perfil com potrace/vtracer).
type P = { className?: string; color?: string; title?: string };
export function MonoPaths({ color = "currentColor" }: { color?: string }) {
  return (
    <>
      <path data-draw d="M80 20C66 12 50 20 47 39c-3 19-1 36-11 52-6 10-18 10-18 4 0-7 14-8 26-4 14 4 28 9 44 3" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path data-draw d="M37 58l20-3" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <circle data-dot cx="98" cy="90" r="4" fill={color} />
    </>
  );
}
export function Monogram({ className, color = "currentColor", title = "Dr. Leonardo Xavier" }: P) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={title}>
      <MonoPaths color={color} />
    </svg>
  );
}
export function Lockup({ className, color = "currentColor", vertical = false }: P & { vertical?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${vertical ? "flex-col" : ""} ${className ?? ""}`} style={{ color }}>
      <Monogram className={vertical ? "h-16 w-16" : "h-9 w-9"} />
      <span className={`flex flex-col leading-none ${vertical ? "items-center" : ""}`}>
        <span className="font-serif text-[0.95rem] tracking-[0.28em] uppercase">Dr. Leonardo Xavier</span>
        <span className="mt-1 text-[0.55rem] tracking-[0.5em] uppercase opacity-70">Clínica</span>
      </span>
    </span>
  );
}
export function Seal({ className, color = "#C8B08A" }: P) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs><path id="sealc" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
      <g className="spin-slow" style={{ transformOrigin: "100px 100px" }}>
        <text fill={color} fontSize="12" fontFamily="var(--font-hanken)" textLength="486" lengthAdjust="spacing">
          <textPath href="#sealc">DR. LEONARDO XAVIER · DERMATOLOGIA E ESTÉTICA ·</textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="58" fill="none" stroke={color} strokeOpacity=".35" />
      <g transform="translate(64 64) scale(.6)"><MonoPaths color={color} /></g>
    </svg>
  );
}
