"use client";
import { useEffect, useState } from "react";
import { useAgendar } from "./agendar";
export default function FloatingCTA() {
  const { open } = useAgendar();
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const f = () => { raf = 0; const y = scrollY, H = document.documentElement.scrollHeight; setShow(y > innerHeight * 0.9 && innerHeight + y < H - 500); };
    const on = () => { if (!raf) raf = requestAnimationFrame(f); };
    f(); addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:inset-x-auto md:bottom-6 md:right-6 md:p-0 ${show ? "translate-y-0" : "translate-y-[200%]"}`}>
      <button onClick={() => open({ origem: "flutuante" })} className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-forest-900 px-7 text-sand-100 shadow-xl ring-1 ring-champagne-500/40 md:min-h-12 md:w-auto">
        <span className="h-1.5 w-1.5 rounded-full bg-champagne-500" />
        <span className="text-sm font-medium tracking-wide">Agendar avaliação</span>
      </button>
    </div>
  );
}
