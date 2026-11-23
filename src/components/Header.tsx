"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Lockup } from "./Logo";
import { useAgendar } from "./agendar";

const LINKS = [["Tratamentos", "/#tratamentos"], ["Sobre", "/#sobre"], ["A clínica", "/#clinica"], ["Dúvidas", "/#duvidas"]];

export default function Header() {
  const { open } = useAgendar();
  const [dark, setDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let lastY = window.scrollY;
    const f = () => {
      const y = window.scrollY; setHidden(y > lastY && y > 160); lastY = y;
      const secs = document.querySelectorAll<HTMLElement>("[data-theme]");
      for (const s of secs) { const r = s.getBoundingClientRect(); if (r.top <= 40 && r.bottom > 40) { setDark(s.dataset.theme === "dark"); break; } }
    };
    f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!menuRef.current) return;
    if (menu) {
      gsap.fromTo(menuRef.current, { clipPath: "circle(0% at 92% 4%)" }, { clipPath: "circle(150% at 92% 4%)", duration: 0.9, ease: "power3.inOut" });
      gsap.fromTo(menuRef.current.querySelectorAll("li"), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.25 });
    }
  }, [menu]);
  const c = menu || dark ? "text-sand-100" : "text-forest-900";
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[60] transition-[transform,color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${hidden && !menu ? "-translate-y-full" : ""} ${c}`}>
        <div className="mx-auto flex h-20 items-center justify-between px-5 md:px-10">
          <Link href="/" className="relative z-10"><Lockup /></Link>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Principal">
            {LINKS.map(([l, h]) => <a key={h} href={h} className="ulink text-[0.82rem] tracking-wide [background-size:0_1px] hover:[background-size:100%_1px]">{l}</a>)}
            <button onClick={() => open({ origem: "header" })} data-cursor="Agendar" className={`min-h-11 rounded-full border px-6 text-[0.82rem] font-medium tracking-wide transition-colors ${dark ? "border-champagne-500 hover:bg-champagne-500 hover:text-forest-950" : "border-forest-900 hover:bg-forest-900 hover:text-ivory"}`}>Agendar</button>
          </nav>
          <button className="relative z-10 grid h-12 w-12 place-items-center md:hidden" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="menu-mobile" aria-label={menu ? "Fechar menu" : "Abrir menu"}>
            <span className={`block h-px w-6 bg-current transition-transform ${menu ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute block h-px w-6 bg-current transition-transform ${menu ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </header>
      {menu && (
        <div id="menu-mobile" ref={menuRef} className="grain fixed inset-0 z-[55] flex flex-col justify-end bg-forest-950 px-6 pb-10 text-sand-100 md:hidden" data-lenis-prevent>
          <ul className="space-y-1">
            {LINKS.map(([l, h]) => <li key={h} className="line-mask"><a href={h} onClick={() => setMenu(false)} className="display block text-[3.4rem]">{l}</a></li>)}
            <li className="line-mask pt-4"><button onClick={() => { setMenu(false); open({ origem: "menu" }); }} className="display block text-[3.4rem] italic text-champagne-500">Agendar</button></li>
          </ul>
        </div>
      )}
    </>
  );
}
