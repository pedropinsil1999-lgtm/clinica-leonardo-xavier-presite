"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { MonoPaths } from "./Logo";
// Máx. 1,4s, só na primeira visita da sessão. Dispara o evento "dlx:ready" para a hero.
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem("dlx-pre") === "1"; sessionStorage.setItem("dlx-pre", "1"); } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const done = () => { setGone(true); window.dispatchEvent(new Event("dlx:ready")); (window as unknown as { __dlxReady: boolean }).__dlxReady = true; };
    if (seen || reduce) { done(); return; }
    const el = ref.current!; const paths = el.querySelectorAll<SVGPathElement>("[data-draw]");
    paths.forEach((p) => { const l = p.getTotalLength(); p.style.strokeDasharray = `${l}`; p.style.strokeDashoffset = `${l}`; });
    const tl = gsap.timeline({ onComplete: done });
    tl.to(paths, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.1 })
      .fromTo(el.querySelector("[data-dot]"), { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.in" }, "-=.15")
      .fromTo(el.querySelector(".pre-name"), { opacity: 0, letterSpacing: "0.5em" }, { opacity: 1, letterSpacing: "0.28em", duration: 0.5, ease: "expo.out" }, "-=.2")
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power3.inOut" }, "+=.05");
    const skip = () => tl.progress(1); el.addEventListener("click", skip);
    return () => { tl.kill(); };
  }, []);
  if (gone) return null;
  return (
    <div ref={ref} className="fixed inset-0 z-[120] grid place-items-center bg-forest-950 text-champagne-500" style={{ clipPath: "inset(0 0 0 0)" }} aria-hidden>
      <div className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 120 120" className="h-24 w-24"><MonoPaths color="#C8B08A" /></svg>
        <span className="pre-name font-serif text-sm uppercase tracking-[0.28em] opacity-0">Dr. Leonardo Xavier</span>
      </div>
    </div>
  );
}
