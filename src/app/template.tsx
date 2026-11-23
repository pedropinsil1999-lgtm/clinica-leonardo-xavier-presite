"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Monogram } from "@/components/Logo";
// Transição entre páginas: cortina verde com o monograma (0,7s), revelando a página nova.
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const first = !(window as unknown as { __dlxNav?: boolean }).__dlxNav; (window as unknown as { __dlxNav: boolean }).__dlxNav = true;
    if (first || matchMedia("(prefers-reduced-motion: reduce)").matches) { gsap.set(ref.current, { display: "none" }); window.scrollTo(0, 0); return; }
    window.scrollTo(0, 0);
    gsap.timeline().set(ref.current, { display: "grid", clipPath: "inset(0 0 0 0)" }).to(ref.current, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "power3.inOut", delay: 0.15 }).set(ref.current, { display: "none" });
  });
  return (<>{children}<div ref={ref} aria-hidden className="fixed inset-0 z-[110] hidden place-items-center bg-forest-900 text-champagne-500"><Monogram className="h-16 w-16" /></div></>);
}
