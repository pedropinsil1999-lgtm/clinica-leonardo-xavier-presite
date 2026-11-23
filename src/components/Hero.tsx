"use client";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";

const SIZES = "(min-width: 1024px) 46vw, (min-width: 768px) 40vw, 92vw";
const SET = (e: string) => `/midia/dr-leonardo-640.${e} 640w, /midia/dr-leonardo-960.${e} 960w, /midia/dr-leonardo-1400.${e} 1400w`;
const d = (s: string) => ({ "--d": s }) as React.CSSProperties;
const Star = () => <svg viewBox="0 0 24 24" className="ml-1.5 inline-block h-[0.5em] w-[0.5em] -translate-y-[0.12em] fill-champagne-700" aria-hidden><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" /></svg>;

export default function Hero() {
  const { open } = useAgendar();
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  preload("/midia/dr-leonardo-960.avif", { as: "image", fetchPriority: "high", imageSrcSet: SET("avif"), imageSizes: SIZES, type: "image/avif" } as Parameters<typeof preload>[1]);

  // Interação: os brilhos se deslocam com o ponteiro (mouse ou toque) e um halo quente o segue.
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
    <section ref={root} data-theme="light" className="hero-warm relative min-h-[100svh] overflow-hidden text-forest-900 md:h-[100svh] md:min-h-[640px]" aria-labelledby="hero-title">
      <div className="n-layer" aria-hidden>
        <i className="n-p hw-p1"><b /></i><i className="n-p hw-p2"><b /></i>
        <div ref={glow} className="hero-cursor-glow" /><i className="n-grain" style={{ opacity: 0.14 }} />
        {/* base sólida na emenda com a próxima seção (o entalhe da setinha usa esta cor) */}
        <i className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to bottom, rgba(239,231,219,0), #EFE7DB)" }} />
      </div>
      <div className="relative z-10 mx-auto grid h-full max-w-[1500px] items-center gap-8 px-5 pb-[3.4rem] pt-24 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 md:px-[5vw] md:pb-14 md:pt-16">
        {/* texto */}
        <div className="md:pb-16">
          <h1 id="hero-title" className="display rise text-[2.5rem] leading-[1.06] text-forest-950 md:text-[clamp(2.6rem,4.6vw,5rem)]" style={d(".05s")}>
            Dermatologia que cuida,{" "}
            <span className="relative inline-block whitespace-nowrap">
              <em className="text-forest-700">com segurança.</em>
              <svg className="absolute -bottom-1 left-0 h-[0.28em] w-full" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden><path className="draw" pathLength={1} d="M3 9 C 70 2, 150 13, 297 4" fill="none" stroke="#B98F62" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </span>
          </h1>
          <p className="rise lead mt-5 max-w-[32rem] text-ink/75 md:mt-7" style={d(".15s")}>Consultas e procedimentos faciais e corporais, com critério médico, em Resende.</p>

          <dl className="rise mt-7 flex max-w-md items-stretch md:mt-9" style={d(".22s")}>
            {([["anos de experiência", `+${clinica.anos}`, false], ["nota no Google", clinica.google.nota, true], ["avaliações", String(clinica.google.avaliacoes), false]] as const).map(([l, n, star], i) => (
              <div key={l} className={`flex-1 ${i ? "border-l border-forest-900/15 pl-4 md:pl-6" : "pr-4 md:pr-6"}`}>
                <dt className="text-[0.68rem] leading-tight text-ink/65 md:text-xs">{l}</dt>
                <dd className="stat-num mt-1.5 text-[2rem] leading-none text-forest-900 md:text-[2.7rem]">{n}{star && <Star />}</dd>
              </div>
            ))}
          </dl>

          {/* cartão-pílula "noite": borda de luz giratória, estrelas, brilho à deriva e reflexo periódico */}
          <div className="pill-wrap rise mt-8 md:mt-10" style={d(".3s")}>
            <span className="pill-spin" aria-hidden />
            <button onClick={() => open({ origem: "hero_comecar" })} className="pill-in group flex w-full items-center gap-3 p-2 text-left text-sand-100 transition active:scale-[0.99] md:gap-4 md:p-2.5" aria-label="Por onde começar? Abrir o assistente de agendamento">
              <i className="pill-stars" aria-hidden /><i className="pill-glow" aria-hidden /><i className="pill-shine" aria-hidden />
              <span className="q-ring relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-champagne-500 font-serif text-xl italic text-forest-950 md:h-14 md:w-14">?</span>
              <span className="relative z-10 min-w-0 flex-1">
                <span className="block whitespace-nowrap font-serif text-[1.15rem] leading-tight md:text-[1.45rem]">Por onde começar?</span>
                <span className="hidden text-[0.7rem] leading-snug text-sand-100/75 min-[400px]:block md:text-[0.8rem]">Agende em cerca de 1 minuto.</span>
              </span>
              <span className="relative z-10 flex shrink-0 items-center gap-2 rounded-full bg-ivory py-2 pl-3 pr-2 text-[0.68rem] font-semibold tracking-[0.12em] text-forest-950 md:py-2.5 md:pl-4 md:pr-2.5 md:text-xs">
                COMEÇAR
                <span className="nudge grid h-7 w-7 place-items-center rounded-full bg-forest-900 text-sand-100" aria-hidden>→</span>
              </span>
            </button>
          </div>
        </div>

        {/* foto: arco "noite" só como FUNDO; o Dr. Leonardo fica por cima, maior e iluminado */}
        <div className="flex justify-center md:justify-end md:self-end">
          <div className="hero-fig">
            <div className="hero-arch" aria-hidden>
              <i className="arch-glow" /><i className="n-stars sa" /><i className="n-stars sb" /><i className="arch-halo" /><i className="n-grain" style={{ opacity: 0.22 }} />
            </div>
            <picture>
              <source type="image/avif" srcSet={SET("avif")} sizes={SIZES} />
              <source type="image/webp" srcSet={SET("webp")} sizes={SIZES} />
              <img src="/midia/dr-leonardo-960.webp" width={1526} height={2000} alt="Dr. Leonardo Xavier, médico, de jaleco branco e braços cruzados, sorrindo" fetchPriority="high" decoding="async" />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
