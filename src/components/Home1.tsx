"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";
import { tratamentos } from "@/data/tratamentos";
import Img from "./Img";
import SkinFlow from "./SkinFlow";

const Losango = () => <span aria-hidden className="mx-8 inline-block h-2 w-2 rotate-45 bg-champagne-500 align-middle" />;

export function Marquee() {
  const items = ["Dermatologia", "Estética avançada", "Laser", "Toxina botulínica", "Bioestimulador de colágeno", "Limpeza de pele", "Cirurgia dermatológica"];
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tw = gsap.to(ref.current, { xPercent: -50, duration: 48, ease: "none", repeat: -1 });
    const el = ref.current!.parentElement!;
    const slow = () => gsap.to(tw, { timeScale: 0.25, duration: 0.8 }), fast = () => gsap.to(tw, { timeScale: 1, duration: 0.8 });
    el.addEventListener("pointerenter", slow); el.addEventListener("pointerleave", fast);
  });
  return (
    <section data-theme="light" className="relative z-10 -mt-[6vw] overflow-hidden bg-ivory pb-10 pt-[calc(6vw+2.5rem)] text-forest-900" style={{ clipPath: "ellipse(120% 100% at 50% 100%)" }} aria-label="Especialidades">
      <div className="flex w-max whitespace-nowrap" ref={ref}>
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center font-serif text-[clamp(2rem,4.4vw,4.4rem)] font-light italic" aria-hidden={k === 1}>
            {items.map((i) => <span key={i} className="flex items-center">{i}<Losango /></span>)}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    const s = new SplitText(ref.current, { type: "words", aria: "none" });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(s.words, { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true } });
    return () => s.revert();
  });
  return (
    <section data-theme="light" className="bg-ivory px-5 pb-28 pt-16 text-ink md:px-[6vw] md:pb-40 md:pt-28">
      <p className="eyebrow mb-10 text-champagne-700">Nosso ponto de partida</p>
      <div className="grid gap-16 md:grid-cols-12">
        <p ref={ref} className="display h-lg md:col-span-8">
          Pele é saúde antes de ser estética. Por isso toda avaliação começa por <em className="text-forest-700">entender você,</em> com critério médico e tecnologia de ponta.
        </p>
        <div className="flex gap-12 self-end md:col-span-4 md:flex-col md:gap-10 md:border-l md:border-ink/10 md:pl-10">
          <div><p className="font-serif text-[clamp(3.5rem,6vw,6rem)] italic leading-none text-forest-700"><span data-rv="count" data-to={clinica.anos} data-pre="+">+{clinica.anos}</span></p><p className="mt-2 text-sm text-ink/70">anos de experiência</p></div>
          <div><p className="font-serif text-[clamp(3.5rem,6vw,6rem)] italic leading-none text-forest-700"><span data-rv="count" data-to="5" data-dec="1">{clinica.google.nota}</span></p><p className="mt-2 text-sm text-ink/70">{clinica.google.avaliacoes} avaliações no Google</p></div>
        </div>
      </div>
    </section>
  );
}

export function Portas() {
  const { open } = useAgendar();
  const portas = [
    { t: "Cuidar da saúde da pele", s: "Consulta dermatológica", d: "Manchas, acne, sensibilidade, pintas. Diagnóstico e plano de cuidado.", arte: "porta-saude", tipo: "consulta" as const, href: "/dermatologia/" },
    { t: "Realçar com segurança", s: "Estética avançada", d: "Rugas, firmeza, qualidade da pele e corpo, sempre a partir de avaliação médica.", arte: "porta-estetica", tipo: "avaliacao" as const, href: "/#tratamentos" },
  ];
  return (
    <section data-theme="light" className="bg-sand-100 px-5 py-24 text-ink md:px-[6vw] md:py-36" aria-labelledby="portas-t">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 id="portas-t" data-rv="lines" className="display h-lg max-w-[18ch]">Por onde você quer <em className="text-forest-700">começar?</em></h2>
        <p data-rv="fade" className="max-w-sm text-ink/75">Consulta médica e procedimento estético têm tempo, agenda e objetivo diferentes. Escolha o caminho e a gente organiza o resto.</p>
      </div>
      <div className="grid gap-10 md:grid-cols-2 md:gap-[4vw]">
        {portas.map((p, i) => (
          <article key={p.t} className="group" data-rv="fade" data-d={i * 0.12}>
            <button onClick={() => open({ origem: "portas", tipo: p.tipo })} data-cursor="Agendar" className="arch relative block aspect-[4/5] w-full transition-transform duration-1000 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]" aria-label={`${p.t}: agendar ${p.s.toLowerCase()}`}>
              <Img name={p.arte} alt="" className="transition-transform duration-[2.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
              <span className={`absolute inset-x-0 bottom-0 p-8 text-left md:p-10 ${i ? "text-sand-100" : "text-forest-900"}`}>
                <span className="eyebrow block opacity-80">{p.s}</span>
                <span className="display mt-3 block text-[clamp(2.2rem,3.6vw,3.6rem)]">{p.t}</span>
              </span>
              <span className={`absolute left-1/2 top-10 -translate-x-1/2 font-serif text-xl italic ${i ? "text-champagne-300" : "text-forest-700"}`}>0{i + 1}</span>
            </button>
            <div className="mt-6 flex items-start justify-between gap-6">
              <p className="max-w-sm text-ink/75">{p.d}</p>
              <Link href={p.href} className="ulink shrink-0 text-sm text-forest-900">Saiba mais</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Tratamentos() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.current!.querySelector<HTMLElement>(".tr-track")!;
      const dist = () => track.scrollWidth - innerWidth;
      gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root.current, pin: true, start: "top top", end: () => `+=${dist()}`, scrub: 0.6, invalidateOnRefresh: true } });
    });
  }, { scope: root });
  const spot = (e: React.PointerEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); };
  return (
    <section id="tratamentos" ref={root} data-theme="dark" className="grain overflow-hidden bg-forest-900 text-sand-100 min-[900px]:h-[100svh]" aria-labelledby="tr-t">
      <div className="tr-track flex flex-col gap-10 px-5 py-24 min-[900px]:h-full min-[900px]:w-max min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-[2.5vw] min-[900px]:px-[6vw] min-[900px]:py-0">
        <div className="min-[900px]:w-[30vw] min-[900px]:shrink-0">
          <p className="eyebrow text-champagne-500">Tratamentos</p>
          <h2 id="tr-t" data-rv="lines" className="display h-lg mt-6">Cada pele pede <em className="text-champagne-500">um cuidado.</em></h2>
          <p data-rv="fade" className="lead mt-6 max-w-sm text-sand-100/75">Tudo começa por uma avaliação. A indicação vem depois, com critério.</p>
          <p className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.28em] text-champagne-500/80 min-[900px]:flex" aria-hidden>Role <span className="h-px w-16 bg-champagne-500/50" /></p>
        </div>
        {tratamentos.map((t, i) => (
          <Link key={t.slug} href={`/tratamentos/${t.slug}/`} onPointerMove={spot} data-cursor="Ver"
            className="group relative block overflow-hidden rounded-[2px] border hairline bg-forest-950/40 min-[900px]:h-[72svh] min-[900px]:w-[25vw] min-[900px]:min-w-[300px] min-[900px]:shrink-0">
            <div className="aspect-[4/3] overflow-hidden min-[900px]:aspect-auto min-[900px]:h-[62%]">
              <Img name={t.arte} alt="" className="transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]" />
            </div>
            <div className="relative p-6">
              <span className="font-serif text-sm italic text-champagne-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-serif text-[1.9rem] leading-none">{t.nome}</h3>
              <p className="mt-3 text-[0.92rem] text-sand-100/75">{t.resumo}</p>
              <span className="ulink mt-5 inline-block text-sm text-champagne-300">Entender o tratamento</span>
            </div>
            <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(380px circle at var(--mx) var(--my), rgba(200,176,138,.16), transparent 60%)" }} />
          </Link>
        ))}
        <div className="hidden w-[6vw] shrink-0 min-[900px]:block" />
      </div>
    </section>
  );
}

export function Tecnologia() {
  const itens = [["Avaliação antes de qualquer procedimento.", "Nenhuma indicação nasce de um pacote pronto."], ["Tecnologia a serviço do diagnóstico, não o contrário.", "O aparelho é escolhido para a sua pele, não a pele para o aparelho."], ["Acompanhamento depois.", "Retornos e ajustes fazem parte do tratamento."]];
  return (
    <section data-theme="dark" className="grain relative overflow-hidden bg-forest-900 px-5 py-28 text-sand-100 md:px-[6vw] md:py-40">
      <SkinFlow bgA="#0C2E29" bgB="#08211D" dim={0.35} density={8} />
      <div className="relative grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow text-champagne-500">Tecnologia</p>
          <h2 data-rv="lines" className="display h-lg mt-6">Tecnologia de ponta, <em className="text-champagne-500">indicação criteriosa.</em></h2>
          <ol className="mt-14 space-y-0">
            {itens.map(([t, d], i) => (
              <li key={t} data-rv="fade" data-d={i * 0.1} className="grid grid-cols-[3.5rem_1fr] border-t hairline py-7">
                <span className="font-serif text-3xl italic text-champagne-500">{i + 1}.</span>
                <div><p className="font-serif text-[1.7rem] leading-tight">{t}</p><p className="mt-2 text-sand-100/70">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:col-span-5" data-rv="par">
          <div className="arch relative mx-auto aspect-[3/4] max-w-md border hairline">
            {/* TODO: vídeo curto em loop (equipamento sem marca ou macro de pele) do Instagram. Por ora, macro "Skin Flow" vivo. */}
            <div data-par className="absolute inset-0"><SkinFlow bgA="#17483F" bgB="#0C2E29" line="#E3D5BF" density={14} dim={1} /></div>
            <p className="absolute inset-x-0 bottom-8 text-center font-serif text-lg italic text-champagne-300">Microtopografia da pele</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PrimeiraConsulta() {
  const root = useRef<HTMLElement>(null);
  const passos = [["Você agenda pelo site.", "Em cerca de um minuto, com o assistente. A recepção confirma o horário."], ["Conversa e avaliação com o Dr. Leonardo.", "Escuta, exame da pele e esclarecimento de dúvidas, sem pressa."], ["Plano de cuidado explicado com clareza.", "O que faz sentido para você, o que não faz, e por quê."], ["Acompanhamento.", "Retornos para ajustar o plano quando necessário."]]; // TODO ajustar com a clínica
  useGSAP(() => {
    const line = root.current!.querySelector<SVGPathElement>(".pc-line")!; const len = line.getTotalLength();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current!.querySelector("ol"), start: "top 70%", end: "bottom 60%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".pc-step").forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: "top 62%", onEnter: () => el.classList.add("is-on"), onLeaveBack: () => el.classList.remove("is-on") });
    });
  }, { scope: root });
  return (
    <section ref={root} data-theme="light" className="bg-ivory px-5 py-28 text-ink md:px-[6vw] md:py-40" aria-labelledby="pc-t">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <p className="eyebrow text-champagne-700">Sem surpresas</p>
          <h2 id="pc-t" data-rv="lines" className="display h-lg mt-6">Como é a <em className="text-forest-700">primeira consulta.</em></h2>
          <p data-rv="fade" className="lead mt-6 max-w-sm text-ink/75">Você entende cada etapa antes de decidir qualquer coisa. Ninguém sai com pacote empurrado.</p>
        </div>
        <ol className="relative md:col-span-6 md:col-start-7">
          <svg className="absolute left-[1.15rem] top-2 h-[calc(100%-1rem)] w-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden>
            <path d="M1 0V100" stroke="rgba(18,21,19,.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path className="pc-line" d="M1 0V100" stroke="#75592F" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          {passos.map(([t, d], i) => (
            <li key={t} className="pc-step group relative grid grid-cols-[2.5rem_1fr] gap-6 pb-16 last:pb-0 [&.is-on_.dot]:bg-forest-700 [&.is-on_.dot]:text-ivory [&.is-on_.txt]:opacity-100">
              <span className="dot relative z-10 grid h-10 w-10 place-items-center rounded-full border border-forest-700/40 bg-ivory font-serif italic text-forest-700 transition-colors duration-700">{i + 1}</span>
              <div className="txt opacity-40 transition-opacity duration-700"><h3 className="font-serif text-[clamp(1.6rem,2.4vw,2.3rem)] leading-tight">{t}</h3><p className="mt-2 text-ink/75">{d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
