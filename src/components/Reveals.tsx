"use client";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
// Padrões de reveal reutilizados em todo o site:
// data-rv="lines" (máscara por linha), "fade", "clip" (imagem por clip-path), "par" (parallax), "count" (count-up)
export default function Reveals() {
  useGSAP(() => {
    let mm: gsap.MatchMedia | undefined;
    const init = () => { mm = gsap.matchMedia();
    mm.add({ reduce: "(prefers-reduced-motion: reduce)", ok: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { reduce } = ctx.conditions as { reduce: boolean };
      const splits: SplitText[] = [];
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        const kind = el.dataset.rv; const st = { trigger: el, start: "top 88%", once: true };
        if (reduce) { if (kind !== "par") gsap.from(el, { opacity: 0, duration: 0.3, scrollTrigger: st }); return; }
        if (kind === "lines") { const s = new SplitText(el, { type: "lines", mask: "lines", aria: "none" }); splits.push(s);
          gsap.from(s.lines, { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.07, scrollTrigger: st }); }
        else if (kind === "fade") gsap.from(el, { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", delay: Number(el.dataset.d || 0), scrollTrigger: st });
        else if (kind === "clip") gsap.fromTo(el, { clipPath: "inset(18% 12% 18% 12%)", opacity: 0.3 }, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.4, ease: "expo.out", delay: Number(el.dataset.d || 0), scrollTrigger: st });
        else if (kind === "par") { const img = el.querySelector("img, canvas, [data-par]"); if (img) gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }); }
        else if (kind === "count") { const end = Number(el.dataset.to); const dec = el.dataset.dec ? 1 : 0; const o = { v: 0 };
          gsap.to(o, { v: end, duration: 1.8, ease: "power3.out", scrollTrigger: st, onUpdate: () => { el.textContent = (el.dataset.pre || "") + o.v.toFixed(dec).replace(".", ","); } }); }
      });
      return () => splits.forEach((s) => s.revert());
    }); ScrollTrigger.refresh(); };
    // Reveals ficam abaixo da dobra: inicializa quando o navegador fica ocioso (alivia o TBT)
    const w = window as unknown as { requestIdleCallback?: (c: () => void, o: object) => number; cancelIdleCallback?: (n: number) => void };
    const id = w.requestIdleCallback ? w.requestIdleCallback(init, { timeout: 1200 }) : window.setTimeout(init, 300);
    return () => { if (w.cancelIdleCallback) w.cancelIdleCallback(id); else clearTimeout(id); mm?.revert(); };
  });
  return null;
}
