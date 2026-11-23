"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Lockup } from "./Logo";
import { useAgendar } from "./agendar";

const LINKS = [["Tratamentos", "/#tratamentos"], ["Sobre", "/#sobre"], ["A clínica", "/#clinica"], ["Dúvidas", "/#duvidas"]];

export default function Header() {
  const { open } = useAgendar();
  const [dark, setDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    // esconde ao descer, volta ao subir (rAF + só muda estado quando muda de fato)
    let lastY = scrollY, raf = 0;
    const f = () => { raf = 0; const y = scrollY; setSolid(y > 24); if (Math.abs(y - lastY) > 6) { setHidden(y > lastY && y > 160); lastY = y; } };
    const on = () => { if (!raf) raf = requestAnimationFrame(f); };
    addEventListener("scroll", on, { passive: true });
    // tema do header conforme a seção sob ele (IntersectionObserver, sem ler layout)
    const secs = [...document.querySelectorAll<HTMLElement>("[data-theme]")];
    const vis = new Set<HTMLElement>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? vis.add(e.target as HTMLElement) : vis.delete(e.target as HTMLElement)));
      const last = secs.filter((s) => vis.has(s)).pop(); if (last) setDark(last.dataset.theme === "dark");
    }, { rootMargin: "-40px 0px -99% 0px" });
    secs.forEach((s) => io.observe(s));
    return () => { removeEventListener("scroll", on); io.disconnect(); };
  }, []);
  useEffect(() => { document.documentElement.style.overflow = menu ? "hidden" : ""; return () => { document.documentElement.style.overflow = ""; }; }, [menu]);
  const c = menu || dark ? "text-sand-100" : "text-forest-900";
  const bg = menu ? "bg-transparent" : solid ? (dark ? "bg-forest-950 shadow-[0_1px_0_rgba(200,176,138,.18)]" : "bg-ivory shadow-[0_1px_0_rgba(18,21,19,.08)]") : "bg-transparent";
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[60] transition-[transform,background-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${hidden && !menu ? "-translate-y-full" : ""} ${c} ${bg}`}>
        <div className="mx-auto flex h-20 items-center justify-between px-5 md:px-10">
          <Link href="/" className="relative z-10"><Lockup /></Link>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Principal">
            {LINKS.map(([l, h]) => <a key={h} href={h} className="ulink text-[0.82rem] tracking-wide [background-size:0_1px] hover:[background-size:100%_1px]">{l}</a>)}
            <button onClick={() => open({ origem: "header" })} className={`min-h-11 rounded-full border px-6 text-[0.82rem] font-medium tracking-wide transition-colors ${dark ? "border-champagne-500 hover:bg-champagne-500 hover:text-forest-950" : "border-forest-900 hover:bg-forest-900 hover:text-ivory"}`}>Agendar</button>
          </nav>
          <button className="relative z-10 grid h-12 w-12 place-items-center md:hidden" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="menu-mobile" aria-label={menu ? "Fechar menu" : "Abrir menu"}>
            <span className={`block h-px w-6 bg-current transition-transform ${menu ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute block h-px w-6 bg-current transition-transform ${menu ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </header>
      {menu && (
        <div id="menu-mobile" className="menu-in bg-forest-950 fixed inset-0 z-[55] flex flex-col justify-end px-6 pb-10 text-sand-100 md:hidden">
          <ul className="space-y-1">
            {LINKS.map(([l, h]) => <li key={h}><a href={h} onClick={() => setMenu(false)} className="display block py-1 text-[3.2rem]">{l}</a></li>)}
            <li className="pt-4"><button onClick={() => { setMenu(false); open({ origem: "menu" }); }} className="display block text-[3.2rem] italic text-champagne-500">Agendar</button></li>
          </ul>
        </div>
      )}
    </>
  );
}
