"use client";
import Header from "./Header";
import Reveals from "./Reveals";
import { Footer, CTAFinal } from "./Home2";
import { useAgendar, type Tipo } from "./agendar";
import { useEffect, useState } from "react";

export function Shell({ children }: { children: React.ReactNode }) {
  return (<><Header /><main>{children}</main><CTAFinal /><Footer /><Reveals /></>);
}
export function BotaoAgendar({ label, tratamento, tipo, className = "", origem = "interna" }: { label: string; tratamento?: string; tipo?: Tipo; className?: string; origem?: string }) {
  const { open } = useAgendar();
  return <button onClick={() => open({ origem, tratamento, tipo })} className={`min-h-14 rounded-full bg-champagne-500 px-8 text-[0.92rem] font-medium tracking-wide text-forest-950 hover:bg-champagne-300 ${className}`}>{label}</button>;
}
export function CTAMobile({ label, tratamento, tipo }: { label: string; tratamento?: string; tipo?: Tipo }) {
  const { open } = useAgendar(); const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(scrollY > 300); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-[45] transition-transform duration-700 md:hidden ${show ? "" : "translate-y-full"}`}>
      <button onClick={() => open({ origem: "cta_mobile", tratamento, tipo })} className="min-h-14 w-full bg-champagne-500 text-[0.95rem] font-medium text-forest-950">{label}</button>
    </div>
  );
}
