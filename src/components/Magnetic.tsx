"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
// Botão magnético: raio 80px, força .25
export default function Magnetic({ children, className = "", onClick, cursor, ariaLabel }: { children: React.ReactNode; className?: string; onClick?: () => void; cursor?: string; ariaLabel?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current!; if (!window.matchMedia("(hover: hover)").matches) return;
    const xt = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" }), yt = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const mv = (e: PointerEvent) => {
      const r = el.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy; const d = Math.hypot(dx, dy);
      if (d < 80 + Math.max(r.width, r.height) / 2) { xt(dx * 0.25); yt(dy * 0.25); } else { xt(0); yt(0); }
    };
    window.addEventListener("pointermove", mv); return () => window.removeEventListener("pointermove", mv);
  }, []);
  return <button ref={ref} onClick={onClick} data-cursor={cursor} aria-label={ariaLabel} className={className}>{children}</button>;
}
