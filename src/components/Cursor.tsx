"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
// Ponto champagne de 10px que cresce para 56px com rótulo em elementos com data-cursor="Rótulo"
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setOn(true);
    const x = gsap.quickTo(dot.current, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(dot.current, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX); y(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(t?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  if (!on) return null;
  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-normal">
      <div className={`grid place-items-center rounded-full bg-champagne-500 text-forest-950 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${label ? "h-16 w-16 -ml-8 -mt-8" : "h-2.5 w-2.5 -ml-[5px] -mt-[5px]"}`}>
        <span className={`text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-opacity ${label ? "opacity-100" : "opacity-0"}`}>{label}</span>
      </div>
    </div>
  );
}
