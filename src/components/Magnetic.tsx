"use client";
// Botão simples (o efeito magnético foi removido por performance).
export default function Magnetic({ children, className = "", onClick, ariaLabel }: { children: React.ReactNode; className?: string; onClick?: () => void; cursor?: string; ariaLabel?: string }) {
  return <button onClick={onClick} aria-label={ariaLabel} className={`transition-transform duration-300 active:scale-[0.98] md:hover:scale-[1.03] ${className}`}>{children}</button>;
}
