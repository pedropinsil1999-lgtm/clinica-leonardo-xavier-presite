"use client";
import { useEffect } from "react";
// Reveal por IntersectionObserver + CSS (só opacity/transform). Também faz count-up simples.
export default function Reveals() {
  useEffect(() => {
    document.documentElement.classList.add("rv-on");
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; const el = e.target as HTMLElement; el.classList.add("in"); io.unobserve(el);
      if (el.dataset.rv === "count") {
        const end = Number(el.dataset.to), dec = el.dataset.dec ? 1 : 0, t0 = performance.now();
        const tick = (t: number) => { const k = Math.min(1, (t - t0) / 1500), v = end * (1 - Math.pow(1 - k, 3)); el.textContent = (el.dataset.pre || "") + v.toFixed(dec).replace(".", ","); if (k < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll<HTMLElement>("[data-rv]").forEach((el) => { if (el.dataset.d) el.style.setProperty("--d", `${el.dataset.d}s`); io.observe(el); });
    return () => io.disconnect();
  }, []);
  return null;
}
