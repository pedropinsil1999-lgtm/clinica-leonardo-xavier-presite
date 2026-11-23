"use client";
import { useRef } from "react";
import { preload } from "react-dom";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import SkinFlow from "./SkinFlow";
import Magnetic from "./Magnetic";
import { Seal } from "./Logo";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { open } = useAgendar();
  preload("/midia/dr-leonardo-960.avif", { as: "image", fetchPriority: "high", imageSrcSet: "/midia/dr-leonardo-640.avif 640w, /midia/dr-leonardo-960.avif 960w, /midia/dr-leonardo-1400.avif 1400w", imageSizes: "(min-width: 768px) 60vw, 90vw", type: "image/avif" } as Parameters<typeof preload>[1]);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const firstVisit = !(window as unknown as { __dlxReady?: boolean }).__dlxReady;
    const word = new SplitText(q(".hero-word"), { type: "chars", mask: "chars", aria: "none" });
    const head = new SplitText(q(".hero-h1"), { type: "lines", mask: "lines", aria: "none" });
    gsap.set(q("[data-anim]"), { visibility: "visible" });

    const tl = gsap.timeline({ paused: true });
    if (reduce) {
      tl.from(q(".hero-fade"), { opacity: 0, duration: 0.3 });
    } else {
      // O recorte é o LCP: fica pintado desde o início (sob o preloader) e "acorda" de blur/escala, sem clip que atrasaria o LCP.
      if (firstVisit) tl.fromTo(q(".hero-doc"), { filter: "blur(12px) brightness(.7)", scale: 1.08, yPercent: 6 }, { filter: "blur(0px) brightness(1)", scale: 1, yPercent: 0, duration: 1.4, ease: "expo.out", clearProps: "filter" }, 0);
      tl.from(word.chars, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.05 }, 0.05)
        .from(head.lines, { yPercent: 105, duration: 1.1, ease: "expo.out", stagger: 0.08 }, 0.25)
        .from(q(".hero-fade"), { y: 18, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07 }, 0.5)
        .fromTo(q(".hero-beam"), { xPercent: -120, opacity: 1 }, { xPercent: 120, duration: 1.6, ease: "power2.inOut" }, 0.7)
        .set(q(".hero-beam"), { opacity: 0 });
    }
    const go = () => tl.play();
    if (firstVisit) { window.addEventListener("dlx:ready", go, { once: true }); } else go();

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom top", scrub: true,
        animation: gsap.timeline()
          .to(q(".hero-docwrap"), { scale: 1.05, yPercent: -4, ease: "none" }, 0)
          .to(q(".hero-wordwrap"), { y: "-20vh", opacity: 0, ease: "none" }, 0)
          .to(q(".hero-ui"), { y: "-8vh", opacity: 0, ease: "none" }, 0)
          .to(q(".hero-ivory"), { opacity: 1, ease: "none" }, 0.35) });
    });
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const dx = gsap.quickTo(q(".hero-docpar"), "x", { duration: 1.2, ease: "power3" }), dy = gsap.quickTo(q(".hero-docpar"), "y", { duration: 1.2, ease: "power3" });
      const wx = gsap.quickTo(q(".hero-wordpar"), "x", { duration: 1.4, ease: "power3" }), wy = gsap.quickTo(q(".hero-wordpar"), "y", { duration: 1.4, ease: "power3" });
      const gx = gsap.quickTo(q(".hero-glow"), "x", { duration: 2.2, ease: "power3" }), gy = gsap.quickTo(q(".hero-glow"), "y", { duration: 2.2, ease: "power3" });
      const mv = (e: PointerEvent) => { const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        dx(nx * 20); dy(ny * 10); wx(-nx * 56); wy(-ny * 20); gx(nx * 80); gy(ny * 50); };
      window.addEventListener("pointermove", mv); return () => window.removeEventListener("pointermove", mv);
    });
    return () => { word.revert(); head.revert(); };
  }, { scope: root });

  return (
    <section ref={root} data-theme="dark" className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-forest-950 text-sand-100" aria-labelledby="hero-title">
      <SkinFlow dim={0.45} />
      {/* palavra gigante atrás do recorte */}
      <div className="hero-wordwrap pointer-events-none absolute inset-x-0 top-[44svh] md:top-[15svh]" aria-hidden>
        <div className="hero-wordpar">
          <p className="hero-fade eyebrow mb-2 hidden text-champagne-500/80 md:block md:pl-[46vw]">Dr. Leonardo</p>
          <div className="hero-word whitespace-nowrap text-center font-serif text-[30vw] font-light leading-[0.8] tracking-[-0.04em] md:pl-[40vw] md:text-left md:text-[17vw]"
            style={{ color: "rgba(200,176,138,.06)", WebkitTextStroke: "1px rgba(200,176,138,.28)" }}>XAVIER</div>
        </div>
      </div>
      {/* brilho atrás da cabeça */}
      <div className="hero-glow pointer-events-none absolute left-1/2 top-[18svh] h-[46vh] w-[46vh] -translate-x-1/2 rounded-full bg-champagne-500/25 blur-[120px] md:left-[62%]" aria-hidden />
      {/* recorte */}
      <div className="hero-docwrap pointer-events-none absolute bottom-0 left-1/2 h-[58svh] -translate-x-1/2 md:left-[62%] md:h-[94svh]">
        <div className="hero-docpar relative h-full">
          <div className="absolute -bottom-6 left-[10%] right-[10%] h-16 rounded-[50%] bg-black/40 blur-2xl" aria-hidden />
          <picture className="hero-doc relative block h-full" style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 86%, transparent)", maskImage: "linear-gradient(to bottom, #000 86%, transparent)" }}>
            <source type="image/avif" srcSet="/midia/dr-leonardo-640.avif 640w, /midia/dr-leonardo-960.avif 960w, /midia/dr-leonardo-1400.avif 1400w" sizes="(min-width: 768px) 60vw, 90vw" />
            <source type="image/webp" srcSet="/midia/dr-leonardo-640.webp 640w, /midia/dr-leonardo-960.webp 960w, /midia/dr-leonardo-1400.webp 1400w" sizes="(min-width: 768px) 60vw, 90vw" />
            <img src="/midia/dr-leonardo-960.webp" width={1526} height={2000} alt="Dr. Leonardo Xavier, médico, de jaleco branco e braços cruzados, sorrindo" fetchPriority="high" className="h-full w-auto max-w-none" />
            <span className="hero-beam pointer-events-none absolute inset-0 opacity-0" style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,.12) 50%, transparent 65%)", WebkitMaskImage: "url(/midia/dr-leonardo-640.webp)", maskImage: "url(/midia/dr-leonardo-640.webp)", WebkitMaskSize: "100% 100%", maskSize: "100% 100%", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
          </picture>
        </div>
      </div>
      {/* UI */}
      <div className="hero-ui relative z-10 flex h-full flex-col px-5 pb-10 pt-28 md:justify-center md:px-[6vw] md:pb-0 md:pt-0">
        <div className="max-w-[40rem] md:max-w-[42vw]">
          <h1 id="hero-title" className="hero-h1 display text-[2.7rem] leading-[0.98] md:text-[clamp(3rem,5.6vw,6.2rem)]" data-anim style={{ visibility: "hidden" }}>
            Dermatologia que cuida, <em className="text-champagne-500">com segurança.</em>
          </h1>
          <p className="hero-fade lead mt-5 max-w-[30rem] text-sand-100/85 md:mt-7">Consultas e procedimentos faciais e corporais, com +{clinica.anos} anos de experiência, em Resende.</p>
          <div className="hero-fade mt-8 hidden flex-wrap items-center gap-x-8 gap-y-5 md:flex">
            <Magnetic onClick={() => open({ origem: "hero" })} cursor="Agendar" className="min-h-14 rounded-full bg-champagne-500 px-9 text-[0.92rem] font-medium tracking-wide text-forest-950 transition-colors hover:bg-champagne-300">Agendar avaliação</Magnetic>
            <a href="#tratamentos" className="ulink text-[0.92rem]">Conhecer os tratamentos</a>
            <Seal className="h-24 w-24" />
          </div>
          <a href={clinica.google.url} target="_blank" rel="noopener" className="hero-fade mt-6 inline-flex items-center gap-2 text-sm text-sand-100/80 md:mt-10">
            <span className="text-champagne-500">★</span> {clinica.google.nota} no Google · {clinica.google.avaliacoes} avaliações
          </a>
        </div>
        <div className="mt-auto flex justify-center md:hidden">
          <button onClick={() => open({ origem: "hero" })} className="hero-fade relative z-20 min-h-14 w-full rounded-full bg-champagne-500 text-[0.95rem] font-medium text-forest-950">Agendar avaliação</button>
        </div>
      </div>
      <div className="hero-fade absolute bottom-8 left-[6vw] hidden items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-sand-100/60 md:flex" aria-hidden>
        <span className="h-10 w-px origin-top animate-pulse bg-champagne-500/60" /> Role
      </div>
      <div className="hero-ivory pointer-events-none absolute inset-0 z-20 bg-ivory opacity-0" aria-hidden />
    </section>
  );
}
