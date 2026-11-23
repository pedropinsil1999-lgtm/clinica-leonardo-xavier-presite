"use client";
import Link from "next/link";
import { useRef } from "react";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";
import { tratamentos } from "@/data/tratamentos";
import Img from "./Img";
import FlowBg from "./FlowBg";

const Losango = () => <span aria-hidden className="mx-8 inline-block h-2 w-2 rotate-45 bg-champagne-500 align-middle" />;

export function Marquee() {
  const items = ["Dermatologia", "Estética avançada", "Laser", "Toxina botulínica", "Bioestimulador de colágeno", "Limpeza de pele", "Cirurgia dermatológica"];
  return (
    <section data-theme="dark" className="marquee sec-r bg-flow z-10 overflow-hidden pb-8 pt-14 text-champagne-300 md:pt-20" aria-label="Especialidades">
      <FlowBg />
      <div className="marquee-track flex w-max whitespace-nowrap">
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
  const partes: [string, boolean][] = [["Pele é saúde antes de ser estética. Por isso toda avaliação começa por ", false], ["entender você,", true], [" com critério médico e tecnologia de ponta.", false]];
  let n = 0;
  return (
    <section data-theme="light" className="sec-r bg-ivory px-5 pb-24 pt-16 text-ink md:px-[6vw] md:pb-36 md:pt-24">
      <p className="eyebrow mb-10 text-champagne-700">Nosso ponto de partida</p>
      <div className="grid gap-14 md:grid-cols-12">
        <p className="display h-lg md:col-span-8">
          {partes.map(([t, em], k) => {
            const ws = t.split(/\s+/).filter(Boolean).map((w) => <span key={n} className="mw" style={{ "--i": n++ } as React.CSSProperties}>{w} </span>);
            return em ? <em key={k} className="text-forest-700">{ws}</em> : <span key={k}>{ws}</span>;
          })}
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
    <section data-theme="light" className="sec-r bg-sand-100 px-5 pb-24 pt-20 text-ink md:px-[6vw] md:pb-36 md:pt-36" aria-labelledby="portas-t">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 id="portas-t" data-rv="fade" className="display h-lg max-w-[18ch]">Por onde você quer <em className="text-forest-700">começar?</em></h2>
        <p data-rv="fade" data-d="0.1" className="max-w-sm text-ink/75">Consulta médica e procedimento estético têm tempo, agenda e objetivo diferentes. Escolha o caminho e a gente organiza o resto.</p>
      </div>
      <div className="grid gap-10 md:grid-cols-2 md:gap-[4vw]">
        {portas.map((p, i) => (
          <article key={p.t} className="group" data-rv="fade" data-d={i * 0.1}>
            <button onClick={() => open({ origem: "portas", tipo: p.tipo })} className="arch relative block aspect-[4/5] w-full" aria-label={`${p.t}: agendar ${p.s.toLowerCase()}`}>
              <span className="par block h-full"><Img name={p.arte} alt="" sizes="(min-width: 768px) 44vw, 92vw" /></span><span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <span className={`absolute inset-x-0 bottom-0 p-8 text-left md:p-10 text-sand-100`}>
                <span className="eyebrow block opacity-80">{p.s}</span>
                <span className="display mt-3 block text-[clamp(2.2rem,3.6vw,3.6rem)]">{p.t}</span>
              </span>
              <span className="absolute left-1/2 top-10 -translate-x-1/2 font-serif text-xl italic text-champagne-300">0{i + 1}</span>
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
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const onScroll = () => { const t = track.current!; const k = t.scrollLeft / Math.max(1, t.scrollWidth - t.clientWidth); bar.current!.style.transform = `scaleX(${0.18 + 0.82 * k})`; };
  const go = (d: number) => track.current?.scrollBy({ left: d * Math.min(420, innerWidth * 0.8), behavior: "smooth" });
  return (
    <section id="tratamentos" data-theme="dark" className="sec-r bg-flow-900 pb-24 pt-20 text-sand-100 md:pb-36 md:pt-32" aria-labelledby="tr-t">
      <FlowBg />
      <div className="flex flex-col justify-between gap-8 px-5 md:flex-row md:items-end md:px-[6vw]">
        <div>
          <p className="eyebrow text-champagne-500">Tratamentos</p>
          <h2 id="tr-t" data-rv="fade" className="display h-lg mt-6">Cada pele pede <em className="text-champagne-500">um cuidado.</em></h2>
          <p data-rv="fade" data-d="0.1" className="lead mt-5 max-w-md text-sand-100/75">Tudo começa por uma avaliação. A indicação vem depois, com critério.</p>
        </div>
        <div className="hidden gap-3 md:flex">
          {[["←", -1, "Anterior"], ["→", 1, "Próximo"]].map(([l, d, a]) => <button key={a as string} onClick={() => go(d as number)} aria-label={a as string} className="grid h-14 w-14 place-items-center rounded-full border border-champagne-500/40 text-xl transition hover:bg-champagne-500 hover:text-forest-950">{l}</button>)}
        </div>
      </div>
      <div ref={track} onScroll={onScroll} className="no-sb mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:px-[6vw]" style={{ scrollPaddingLeft: "1.25rem" }} tabIndex={0} aria-label="Lista de tratamentos, deslize para os lados">
        {tratamentos.map((t, i) => (
          <Link key={t.slug} href={`/tratamentos/${t.slug}/`} className="group block w-[78vw] max-w-[380px] shrink-0 snap-start overflow-hidden rounded-3xl border hairline bg-forest-950/50 sm:w-[340px]">
            <div className="aspect-[4/3] overflow-hidden"><Img name={t.arte} alt="" className="transition-transform duration-[1.4s] ease-out md:group-hover:scale-[1.07]" sizes="(min-width: 640px) 340px, 78vw" w={900} h={1125} /></div>
            <div className="p-6">
              <span className="font-serif text-sm italic text-champagne-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-serif text-[1.8rem] leading-none">{t.nome}</h3>
              <p className="mt-3 min-h-[3.2rem] text-[0.92rem] text-sand-100/75">{t.resumo}</p>
              <span className="ulink mt-4 inline-block text-sm text-champagne-300">Entender o tratamento</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mx-5 mt-6 h-px bg-champagne-500/20 md:mx-[6vw]" aria-hidden><span ref={bar} className="block h-px origin-left bg-champagne-500" style={{ transform: "scaleX(.18)" }} /></div>
    </section>
  );
}

export function Tecnologia() {
  const itens = [["Avaliação antes de qualquer procedimento.", "Nenhuma indicação nasce de um pacote pronto."], ["Tecnologia a serviço do diagnóstico, não o contrário.", "O aparelho é escolhido para a sua pele, não a pele para o aparelho."], ["Acompanhamento depois.", "Retornos e ajustes fazem parte do tratamento."]];
  return (
    <section data-theme="dark" className="sec-r bg-flow cv px-5 pb-24 pt-20 text-sand-100 md:px-[6vw] md:pb-36 md:pt-36">
      <FlowBg />
      <div className="grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow text-champagne-500">Tecnologia</p>
          <h2 data-rv="fade" className="display h-lg mt-6">Tecnologia de ponta, <em className="text-champagne-500">indicação criteriosa.</em></h2>
          <ol className="mt-12">
            {itens.map(([t, d], i) => (
              <li key={t} data-rv="fade" data-d={i * 0.08} className="grid grid-cols-[3.2rem_1fr] border-t hairline py-6">
                <span className="font-serif text-3xl italic text-champagne-500">{i + 1}.</span>
                <div><p className="font-serif text-[1.6rem] leading-tight">{t}</p><p className="mt-2 text-sand-100/70">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:col-span-5" data-rv="fade">
          {/* TODO: vídeo curto em loop (equipamento sem marca / macro de pele) quando houver material do Instagram */}
          <div className="arch relative mx-auto aspect-[3/4] max-w-md border hairline">
            <div className="par h-full"><Img name="tecnologia" alt="" sizes="(min-width: 768px) 30vw, 90vw" /></div>
            <p className="absolute inset-x-0 bottom-8 text-center font-serif text-lg italic text-champagne-300">Tecnologia a serviço do diagnóstico</p>
          </div>
        </div>
      </div>
    </section>
  );
}
