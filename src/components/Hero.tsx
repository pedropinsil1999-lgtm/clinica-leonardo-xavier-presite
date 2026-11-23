"use client";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";

const SIZES = "(min-width: 768px) 42vw, 86vw";
const SET = (e: string) => `/midia/dr-leonardo-640.${e} 640w, /midia/dr-leonardo-960.${e} 960w, /midia/dr-leonardo-1400.${e} 1400w`;
const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export default function Hero() {
  const { open } = useAgendar();
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  preload("/midia/dr-leonardo-960.avif", { as: "image", fetchPriority: "high", imageSrcSet: SET("avif"), imageSizes: SIZES, type: "image/avif" } as Parameters<typeof preload>[1]);

  // Interação: os brilhos se deslocam com o ponteiro (mouse ou toque) e um halo quente o segue.
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

  const stats: [string, string][] = [["anos de experiência", `+${clinica.anos}`], ["nota no Google", `${clinica.google.nota}★`], ["avaliações", String(clinica.google.avaliacoes)]];

  return (
    <section ref={root} data-theme="light" className="hero-warm relative min-h-[100svh] overflow-hidden text-forest-900 md:h-[100svh] md:min-h-[640px]" aria-labelledby="hero-title">
      <div className="n-layer" aria-hidden>
        <i className="n-p hw-p1"><b /></i><i className="n-p hw-p2"><b /></i>
        <div ref={glow} className="hero-cursor-glow" /><i className="n-grain" style={{ opacity: 0.14 }} />
      </div>
      <div className="relative z-10 mx-auto grid h-full max-w-[1500px] items-center gap-8 px-5 pt-24 md:grid-cols-12 md:gap-4 md:px-[5vw] md:pt-16">
        {/* texto */}
        <div className="md:col-span-7 md:pb-16">
          <h1 id="hero-title" className="display rise text-[2.5rem] leading-[1.06] text-forest-950 md:text-[clamp(3rem,5.4vw,6rem)]" style={d(".05s")}>
            Dermatologia que cuida,{" "}
            <span className="relative inline-block whitespace-nowrap">
              <em className="text-forest-700">com segurança.</em>
              <svg className="absolute -bottom-1 left-0 h-[0.28em] w-full" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden><path className="draw" pathLength={1} d="M3 9 C 70 2, 150 13, 297 4" fill="none" stroke="#B98F62" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </span>
          </h1>
          <p className="rise lead mt-5 max-w-[32rem] text-ink/75 md:mt-7" style={d(".15s")}>Consultas e procedimentos faciais e corporais, com critério médico, em Resende.</p>

          <dl className="rise mt-7 flex max-w-md items-stretch md:mt-9" style={d(".22s")}>
            {stats.map(([l, n], i) => (
              <div key={l} className={`flex-1 ${i ? "border-l border-forest-900/15 pl-4 md:pl-6" : "pr-4 md:pr-6"}`}>
                <dt className="text-[0.68rem] leading-tight text-ink/65 md:text-xs">{l}</dt>
                <dd className="mt-1 font-serif text-[1.9rem] leading-none text-forest-900 md:text-[2.6rem]">{n}</dd>
              </div>
            ))}
          </dl>

          {/* cartão-pílula: abre o assistente de agendamento */}
          <button onClick={() => open({ origem: "hero_comecar" })} className="rise group mt-8 flex w-full max-w-[34rem] items-center gap-3 rounded-full bg-forest-900 p-2 md:gap-4 md:p-2.5 text-left text-sand-100 shadow-[0_18px_40px_-14px_rgba(8,33,29,.55)] ring-1 ring-champagne-500/30 transition active:scale-[0.99] md:mt-10 md:hover:-translate-y-0.5" style={d(".3s")} aria-label="Por onde começar? Abrir o assistente de agendamento">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-champagne-500 font-serif text-xl italic text-forest-950 md:h-14 md:w-14">?</span>
            <span className="min-w-0 flex-1">
              <span className="block whitespace-nowrap font-serif text-[1.15rem] leading-tight md:text-[1.45rem]">Por onde começar?</span>
              <span className="mt-0.5 hidden text-[0.7rem] leading-snug text-sand-100/75 min-[400px]:block md:text-[0.8rem]">Agende em cerca de 1 minuto.</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 rounded-full bg-ivory py-2 pl-3 pr-2 text-[0.68rem] md:py-2.5 md:pl-4 md:pr-2.5 font-semibold tracking-[0.12em] text-forest-950 md:text-xs">
              COMEÇAR
              <span className="grid h-7 w-7 place-items-center rounded-full bg-forest-900 text-sand-100 transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </span>
          </button>
        </div>

        {/* foto no arco */}
        <div className="flex justify-center md:col-span-5 md:items-end md:justify-end md:self-end">
          <div className="hero-arch-wrap">
            <div className="hero-arch">
              <div className="absolute left-1/2 top-[8%] h-[70%] w-[90%] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(227,213,191,.38), transparent)" }} aria-hidden />
              <picture>
                <source type="image/avif" srcSet={SET("avif")} sizes={SIZES} />
                <source type="image/webp" srcSet={SET("webp")} sizes={SIZES} />
                <img src="/midia/dr-leonardo-960.webp" width={1526} height={2000} alt="Dr. Leonardo Xavier, médico, de jaleco branco e braços cruzados, sorrindo" fetchPriority="high" decoding="async" className="absolute bottom-0 left-1/2 h-[104%] w-auto max-w-none -translate-x-1/2" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
