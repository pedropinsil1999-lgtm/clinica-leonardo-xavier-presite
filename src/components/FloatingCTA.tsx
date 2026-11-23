"use client";
import { useEffect, useState } from "react";
import { useAgendar } from "./agendar";
export default function FloatingCTA() {
  const { open } = useAgendar();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > window.innerHeight * 0.9 && window.innerHeight + window.scrollY < document.body.scrollHeight - 400);
    f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:inset-x-auto md:bottom-6 md:right-6 ${show ? "translate-y-0" : "translate-y-[220%]"}`}>
      <button onClick={() => open({ origem: "flutuante" })} data-cursor="Agendar"
        className="flex min-h-14 w-full items-center justify-center gap-3 bg-forest-900 px-6 text-sand-100 shadow-[0_-1px_0_rgba(200,176,138,.25)] md:min-h-12 md:w-auto md:rounded-full md:border md:border-champagne-500/40 md:shadow-xl">
        <span className="h-1.5 w-1.5 rounded-full bg-champagne-500" />
        <span className="text-sm font-medium tracking-wide">Agendar avaliação</span>
      </button>
    </div>
  );
}
