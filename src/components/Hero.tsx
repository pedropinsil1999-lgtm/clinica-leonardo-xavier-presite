"use client";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";
import FlowBg from "./FlowBg";

const SIZES = "(min-width: 768px) 72vh, 30vh";
const SET = (e: string) => `/midia/dr-leonardo-640.${e} 640w, /midia/dr-leonardo-960.${e} 960w, /midia/dr-leonardo-1400.${e} 1400w`;
const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export default function Hero() {
  const { open } = useAgendar();
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  preload("/midia/dr-leonardo-960.avif", { as: "image", fetchPriority: "high", imageSrcSet: SET("avif"), imageSizes: SIZES, type: "image/avif" } as Parameters<typeof preload>[1]);

  // Brilho que segue o cursor: só desktop com mouse, 1 transform por quadro
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
      <FlowBg />
      <div ref={glow} className="hero-cursor-glow hidden md:block" aria-hidden />
      {/* palavra gigante ATRÁS do recorte */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[52svh] md:bottom-auto md:top-[15svh]" aria-hidden>
        <div className="rise whitespace-nowrap text-center font-serif text-[30vw] font-light leading-[0.8] tracking-[-0.04em] md:pl-[40vw] md:text-left md:text-[17vw]"
          style={{ color: "rgba(200,176,138,.06)", WebkitTextStroke: "1px rgba(200,176,138,.3)", ...d(".1s") }}>XAVIER</div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[14svh] h-[60vh] w-[60vh] -translate-x-1/2 md:left-[62%]" style={{ background: "radial-gradient(closest-side, rgba(200,176,138,.24), transparent)" }} aria-hidden />
      {/* recorte do Dr. Leonardo: LCP, sem máscara, sem filtro, sem animação */}
      <div className="hero-photo pointer-events-none">
        <picture>
          <source type="image/avif" srcSet={SET("avif")} sizes={SIZES} />
          <source type="image/webp" srcSet={SET("webp")} sizes={SIZES} />
          <img src="/midia/dr-leonardo-960.webp" width={1526} height={2000} alt="Dr. Leonardo Xavier, médico, de jaleco branco e braços cruzados, sorrindo" fetchPriority="high" decoding="async" />
        </picture>
        <span className="absolute inset-x-0 bottom-0 h-[9%]" style={{ background: "linear-gradient(to top, #08211D, transparent)" }} />
        {/* chips flutuantes: levam a prova social para perto do rosto */}
        <a href={clinica.google.url} target="_blank" rel="noopener" className="rise pointer-events-auto absolute bottom-[26%] left-[-4%] md:left-[-14%]" style={d("1s")}>
          <span className="bob flex items-center gap-2 rounded-2xl bg-ivory/95 px-3 py-2 text-forest-900 shadow-xl md:gap-3 md:px-4 md:py-3">
            <span className="font-serif text-2xl italic leading-none md:text-4xl">{clinica.google.nota}</span>
            <span className="text-[0.62rem] leading-tight md:text-xs"><span className="block text-champagne-700">★★★★★</span>{clinica.google.avaliacoes} avaliações</span>
          </span>
        </a>
        <span className="rise absolute right-[-2%] top-[34%] md:right-[-8%]" style={d("1.2s")}>
          <span className="bob block rounded-2xl bg-forest-700/95 px-3 py-2 text-sand-100 shadow-xl ring-1 ring-champagne-500/30 md:px-4 md:py-3" style={{ animationDelay: "-3s" }}>
            <span className="font-serif text-2xl italic leading-none text-champagne-300 md:text-4xl">+{clinica.anos}</span>
            <span className="block text-[0.62rem] md:text-xs">anos de experiência</span>
          </span>
        </span>
      </div>
      {/* UI: só título e um botão */}
      <div className="relative z-10 flex h-full flex-col px-5 pb-6 pt-24 md:justify-center md:px-[6vw] md:pb-0 md:pt-0">
        <div className="max-w-[40rem] md:max-w-[42vw]">
          <p className="eyebrow rise mb-5 text-champagne-500" style={d("0s")}>Dermatologia e Estética · Resende/RJ</p>
          <h1 id="hero-title" className="hero-h1 display rise pb-1 text-[2.6rem] leading-[1.06] md:text-[clamp(3rem,5.4vw,6rem)]" style={d(".05s")}>
            Dermatologia que cuida,{" "}
            <span className="relative inline-block whitespace-nowrap">
              <em className="text-champagne-500">com segurança.</em>
              <svg className="absolute -bottom-1 left-0 h-[0.28em] w-full" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden><path className="draw" pathLength={1} d="M3 9 C 70 2, 150 13, 297 4" fill="none" stroke="#C8B08A" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </span>
          </h1>
          <div className="rise mt-9 hidden md:block" style={d(".25s")}>
            <button onClick={() => open({ origem: "hero" })} className="min-h-14 rounded-full bg-champagne-500 px-10 text-[0.95rem] font-medium tracking-wide text-forest-950 transition hover:bg-champagne-300 active:scale-[0.98]">Agendar avaliação</button>
          </div>
        </div>
        <div className="mt-auto md:hidden">
          <button onClick={() => open({ origem: "hero" })} className="relative z-20 min-h-14 w-full rounded-full bg-champagne-500 text-[0.95rem] font-medium text-forest-950 shadow-lg active:scale-[0.99]">Agendar avaliação</button>
        </div>
      </div>
    </section>
  );
}
