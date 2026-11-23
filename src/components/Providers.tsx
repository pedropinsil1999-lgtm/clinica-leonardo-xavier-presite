"use client";
import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AgendarCtx, type OpenOpts, type Tipo } from "./agendar";
import Assistente from "./Assistente";
import Cursor from "./Cursor";
import FloatingCTA from "./FloatingCTA";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<OpenOpts | null>(null);
  const open = useCallback((o: OpenOpts) => setOpts({ ...o }), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    const tick = (t: number) => lenis?.raf(t * 1000);
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09 });
      (window as unknown as { __lenis: Lenis }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    }
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh());
    // deep link: /?agendar=1&tipo=consulta|avaliacao&tratamento=slug
    const q = new URLSearchParams(location.search);
    if (q.get("agendar") === "1") {
      const tipo = q.get("tipo") as Tipo | null;
      setTimeout(() => open({ origem: q.get("utm_source") || "deeplink", tipo: tipo ?? undefined, tratamento: q.get("tratamento") ?? undefined }), 600);
    }
    return () => { gsap.ticker.remove(tick); lenis?.destroy(); };
  }, [open]);

  return (
    <AgendarCtx.Provider value={{ open }}>
      {children}
      <FloatingCTA />
      <Cursor />
      <Assistente opts={opts} onClose={() => setOpts(null)} />
    </AgendarCtx.Provider>
  );
}
