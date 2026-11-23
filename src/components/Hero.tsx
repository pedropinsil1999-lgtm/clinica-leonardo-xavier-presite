"use client";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";

const SIZES = "(min-width: 768px) 72vh, 30vh";
const SET = (e: string) => `/midia/dr-leonardo-640.${e} 640w, /midia/dr-leonardo-960.${e} 960w, /midia/dr-leonardo-1400.${e} 1400w`;
const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export default function Hero() {
  const { open } = useAgendar();
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  preload("/midia/dr-leonardo-960.avif", { as: "image", fetchPriority: "high", imageSrcSet: SET("avif"), imageSizes: SIZES, type: "image/avif" } as Parameters<typeof preload>[1]);

  // Interação: os brilhos da "noite" se deslocam com o ponteiro (mouse ou toque) e um halo quente o segue.
  // Só transform/variáveis CSS, 1 atualização por quadro.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0, x = 0, y = 0;
    const apply = () => {
      raf = 0; const el = root.current!, r = el.getBoundingClientRect();
      el.style.setProperty("--mx", String((x / innerWidth - 0.5) * 2)); el.style.setProperty("--my", String((y / innerHeight - 0.5) * 2));
      glow.current!.style.transform = `translate3d(${x - r.left}px,${y - r.top}px,0)`;
    };
    const mv = (e: PointerEvent) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
    addEventListener("pointermove", mv, { passive: true });
    if (!fine) addEventListener("pointerdown", mv, { passive: true });
    return () => { removeEventListener("pointermove", mv); removeEventListener("pointerdown", mv); };
  }, []);

  return (
    <section ref={root} data-theme="dark" className="hero-night relative h-[100svh] min-h-[620px] overflow-hidden text-sand-100" aria-labelledby="hero-title">
      <div className="n-layer" aria-hidden>
        <i className="n-p n-p1"><b /></i><i className="n-p n-p2"><b /></i>
        <i className="n-stars sa" /><i className="n-stars sb" /><i className="n-vig" /><i className="n-grain" />
      </div>
      <div ref={glow} className="hero-cursor-glow" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-[14svh] h-[60vh] w-[60vh] -translate-x-1/2 md:left-[62%]" style={{ background: "radial-gradient(closest-side, rgba(200,176,138,.16), transparent)" }} aria-hidden />
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
      </div>
      {/* UI: só título e um botão */}
      <div className="relative z-10 flex h-full flex-col px-5 pb-6 pt-24 md:justify-center md:px-[6vw] md:pb-0 md:pt-0">
        <div className="max-w-[40rem] md:max-w-[42vw]">
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
