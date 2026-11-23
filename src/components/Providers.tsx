"use client";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AgendarCtx, type OpenOpts, type Tipo } from "./agendar";
import FloatingCTA from "./FloatingCTA";

// O assistente só é baixado quando alguém abre (mantém o JS inicial pequeno)
const Assistente = dynamic(() => import("./Assistente"), { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<OpenOpts | null>(null);
  const open = useCallback((o: OpenOpts) => setOpts({ ...o }), []);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (q.get("agendar") === "1") {
      const tipo = q.get("tipo") as Tipo | null;
      const t = setTimeout(() => open({ origem: q.get("utm_source") || "deeplink", tipo: tipo ?? undefined, tratamento: q.get("tratamento") ?? undefined }), 500);
      return () => clearTimeout(t);
    }
  }, [open]);
  return (
    <AgendarCtx.Provider value={{ open }}>
      {children}
      <FloatingCTA />
      {opts && <Assistente opts={opts} onClose={() => setOpts(null)} />}
    </AgendarCtx.Provider>
  );
}
