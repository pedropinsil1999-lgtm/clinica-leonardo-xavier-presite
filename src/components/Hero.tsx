"use client";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { Seal } from "./Logo";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";

const SIZES = "(min-width: 768px) 72vh, 30vh";
const SET = (e: string) => `/midia/dr-leonardo-640.${e} 640w, /midia/dr-leonardo-960.${e} 960w, /midia/dr-leonardo-1400.${e} 1400w`;

export default function Hero() {
  const { open } = useAgendar();
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  preload("/midia/dr-leonardo-960.avif", { as: "image", fetchPriority: "high", imageSrcSet: SET("avif"), imageSizes: SIZES, type: "image/avif" } as Parameters<typeof preload>[1]);

  // Brilho que segue o cursor: só desktop com mouse, 1 transform por quadro, sem filtros
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0, x = 0, y = 0;
    const mv = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; const r = root.current!.getBoundingClientRect(); glow.current!.style.transform = `translate3d(${x - r.left}px,${y - r.top}px,0)`; });
    };
    addEventListener("pointermove", mv, { passive: true }); return () => removeEventListener("pointermove", mv);
  }, []);

  return (
    <section ref={root} data-theme="dark" className="bg-flow relative h-[100svh] min-h-[620px] overflow-hidden text-sand-100" aria-labelledby="hero-title">
      <div ref={glow} className="hero-cursor-glow hidden md:block" aria-hidden />
      {/* palavra gigante ATRÁS do recorte */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[44svh] md:bottom-auto md:top-[15svh]" aria-hidden>
        <p className="eyebrow rise mb-2 hidden text-champagne-500/80 md:block md:pl-[46vw]" style={{ "--d": ".3s" } as React.CSSProperties}>Dr. Leonardo</p>
        <div className="rise whitespace-nowrap text-center font-serif text-[30vw] font-light leading-[0.8] tracking-[-0.04em] md:pl-[40vw] md:text-left md:text-[17vw]"
          style={{ color: "rgba(200,176,138,.06)", WebkitTextStroke: "1px rgba(200,176,138,.28)", "--d": ".1s" } as React.CSSProperties}>XAVIER</div>
      </div>
      {/* brilho estático atrás da cabeça (gradiente, sem blur) */}
      <div className="pointer-events-none absolute left-1/2 top-[14svh] h-[60vh] w-[60vh] -translate-x-1/2 md:left-[62%]" style={{ background: "radial-gradient(closest-side, rgba(200,176,138,.22), transparent)" }} aria-hidden />
      {/* recorte do Dr. Leonardo: LCP, sem máscara, sem filtro, sem animação */}
      <div className="hero-photo pointer-events-none">
        <picture>
          <source type="image/avif" srcSet={SET("avif")} sizes={SIZES} />
          <source type="image/webp" srcSet={SET("webp")} sizes={SIZES} />
          <img src="/midia/dr-leonardo-960.webp" width={1526} height={2000} alt="Dr. Leonardo Xavier, médico, de jaleco branco e braços cruzados, sorrindo" fetchPriority="high" decoding="async" />
        </picture>
        <span className="absolute inset-x-0 bottom-0 h-[9%]" style={{ background: "linear-gradient(to top, #08211D, transparent)" }} />
      </div>
      {/* UI */}
      <div className="relative z-10 flex h-full flex-col px-5 pb-6 pt-24 md:justify-center md:px-[6vw] md:pb-0 md:pt-0">
        <div className="max-w-[40rem] md:max-w-[42vw]">
          <h1 id="hero-title" className="hero-h1 display rise pb-1 text-[2.6rem] leading-[1.06] md:text-[clamp(3rem,5.4vw,6rem)]">
            Dermatologia que cuida, <em className="whitespace-nowrap text-champagne-500">com segurança.</em>
          </h1>
          <p className="rise lead mt-4 max-w-[30rem] text-sand-100/85 md:mt-7" style={{ "--d": ".15s" } as React.CSSProperties}>Consultas e procedimentos faciais e corporais, com +{clinica.anos} anos de experiência, em Resende.</p>
          <div className="rise mt-8 hidden flex-wrap items-center gap-x-8 gap-y-5 md:flex" style={{ "--d": ".25s" } as React.CSSProperties}>
            <button onClick={() => open({ origem: "hero" })} className="min-h-14 rounded-full bg-champagne-500 px-9 text-[0.92rem] font-medium tracking-wide text-forest-950 transition hover:bg-champagne-300 active:scale-[0.98]">Agendar avaliação</button>
            <a href="#tratamentos" className="ulink text-[0.92rem]">Conhecer os tratamentos</a>
            <Seal className="h-24 w-24" />
          </div>
          <a href={clinica.google.url} target="_blank" rel="noopener" className="rise mt-5 inline-flex items-center gap-2 text-sm text-sand-100/80 md:mt-10" style={{ "--d": ".3s" } as React.CSSProperties}>
            <span className="text-champagne-500">★</span> {clinica.google.nota} no Google · {clinica.google.avaliacoes} avaliações
          </a>
        </div>
        <div className="mt-auto md:hidden">
          <button onClick={() => open({ origem: "hero" })} className="relative z-20 min-h-14 w-full rounded-full bg-champagne-500 text-[0.95rem] font-medium text-forest-950 shadow-lg active:scale-[0.99]">Agendar avaliação</button>
        </div>
      </div>
    </section>
  );
}
