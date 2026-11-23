"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";
import Img from "./Img";
import SkinFlow from "./SkinFlow";
import Magnetic from "./Magnetic";
import { Lockup, Seal } from "./Logo";

export function Sobre() {
  return (
    <section id="sobre" data-theme="light" className="bg-ivory px-5 py-28 text-ink md:px-[6vw] md:py-40" aria-labelledby="sobre-t">
      <div className="grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-5" data-rv="par">
          {/* TODO: trocar por foto do Instagram (Dr. Leonardo no consultório). Enquadramento diferente do recorte da hero. */}
          <div className="arch relative mx-auto aspect-[4/5] max-w-md bg-forest-700">
            <img data-par src="/midia/dr-leonardo-960.webp" alt="Retrato do Dr. Leonardo Xavier" width={1526} height={2000} loading="lazy" decoding="async" className="absolute left-1/2 top-[6%] h-[150%] w-auto max-w-none -translate-x-1/2" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-champagne-700">Sobre o Dr. Leonardo</p>
          <h2 id="sobre-t" data-rv="lines" className="display h-lg mt-6">Critério médico, <em className="text-forest-700">olhar atento.</em></h2>
          <div data-rv="fade" className="lead mt-8 space-y-4 text-ink/80">
            <p>Há mais de {clinica.anos} anos, o Dr. Leonardo Xavier cuida da pele de pacientes de Resende e do Sul Fluminense, unindo dermatologia clínica e estética avançada.</p>
            <p>O jeito de trabalhar é simples: ouvir com calma, explicar com clareza e indicar só o que faz sentido para cada pessoa. {/* TODO: validar bio */}</p>
          </div>
          <dl data-rv="fade" className="mt-10 grid gap-5 border-y border-ink/10 py-6 text-sm sm:grid-cols-3">
            <div><dt className="eyebrow text-[0.62rem] text-ink/60">Registro</dt><dd className="mt-2">MÉDICO · {clinica.crm}</dd></div>
            <div><dt className="eyebrow text-[0.62rem] text-ink/60">Especialidade</dt><dd className="mt-2">Dermatologia · {clinica.rqe}</dd></div>
            <div><dt className="eyebrow text-[0.62rem] text-ink/60">Formação</dt><dd className="mt-2">{clinica.formacao}</dd></div>
          </dl>
          <svg viewBox="0 0 320 70" className="mt-10 h-14 w-auto text-forest-700" aria-label="Assinatura Leonardo Xavier">
            <text x="0" y="50" fontFamily="var(--font-cormorant)" fontStyle="italic" fontSize="46" fill="currentColor">Leonardo Xavier</text>
          </svg>
          <p className="mt-6 text-sm text-ink/70">Equipe: {clinica.equipe}</p>
        </div>
      </div>
    </section>
  );
}

export function Clinica() {
  const track = useRef<HTMLDivElement>(null);
  const fotos = ["espaco-1", "espaco-2", "espaco-3", "espaco-4", "espaco-5"];
  useGSAP(() => {
    const el = track.current!; let down = false, sx = 0, sl = 0;
    const d = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = el.scrollLeft; el.setPointerCapture(e.pointerId); };
    const m = (e: PointerEvent) => { if (down) el.scrollLeft = sl - (e.clientX - sx) * 1.3; };
    const u = () => { down = false; };
    el.addEventListener("pointerdown", d); el.addEventListener("pointermove", m); el.addEventListener("pointerup", u);
  });
  return (
    <section id="clinica" data-theme="light" className="bg-sand-100 py-28 text-ink md:py-36" aria-labelledby="cl-t">
      <div className="flex flex-col justify-between gap-6 px-5 md:flex-row md:items-end md:px-[6vw]">
        <div><p className="eyebrow text-champagne-700">A clínica</p>
          <h2 id="cl-t" data-rv="lines" className="display h-lg mt-6">Um espaço pensado <em className="text-forest-700">para você.</em></h2></div>
        <p data-rv="fade" className="max-w-sm text-ink/75">Madeira, verde profundo e luz quente. Um lugar calmo para conversar sobre a sua pele, no centro de Resende.</p>
      </div>
      <div ref={track} data-cursor="Arraste" data-lenis-prevent-horizontal className="mt-14 flex cursor-grab gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] active:cursor-grabbing md:px-[6vw]" tabIndex={0} aria-label="Galeria do espaço, role para os lados">
        {fotos.map((f, i) => (
          <figure key={f} data-rv="clip" data-d={i * 0.08} className={`relative shrink-0 overflow-hidden rounded-[2px] ${i % 2 ? "h-[48svh] w-[70vw] md:w-[30vw]" : "h-[58svh] w-[78vw] md:w-[36vw]"} `}>
            <div className={`h-full ${i === 2 ? "arch" : ""}`}><Img name={f} alt="" className="pointer-events-none select-none" /></div>
            {/* TODO: substituir por fotos reais do espaço (Instagram) com a mesma gradação */}
            <figcaption className="absolute bottom-3 left-3 bg-ivory/80 px-2 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-ink/70">Foto do espaço · em produção</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Aprenda() {
  // TODO: 3 a 5 reels do Instagram, sem áudio, com legenda em HTML. Hoje: cards com tema e link para o perfil.
  const temas = [["3 queixas que a limpeza de pele ajuda", "limpeza"], ["Rugas da glabela: o que são e como tratar", "toxina"], ["Bioestimulador: por que o resultado é gradual", "bioestimulador"], ["Laser e sol: o que muda no verão", "laser"]];
  return (
    <section data-theme="dark" className="grain bg-forest-950 px-5 py-28 text-sand-100 md:px-[6vw] md:py-36" aria-labelledby="ap-t">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="eyebrow text-champagne-500">Aprenda com o Dr. Leonardo</p>
          <h2 id="ap-t" data-rv="lines" className="display h-lg mt-6">Informação clara, <em className="text-champagne-500">sem exagero.</em></h2></div>
        <a href={clinica.instagram.url} target="_blank" rel="noopener" className="ulink text-sm text-champagne-300">Ver mais no Instagram ↗</a>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {temas.map(([t, a], i) => (
          <a key={t} href={clinica.instagram.url} target="_blank" rel="noopener" data-cursor="Ver" data-rv="fade" data-d={i * 0.08} className="group relative block aspect-[9/16] overflow-hidden rounded-[2px] border hairline">
            <Img name={a} alt="" className="opacity-80 transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
            <span className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
            <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-champagne-500/50 text-champagne-300" aria-hidden>▶</span>
            <span className="absolute inset-x-4 bottom-5 font-serif text-[clamp(1.15rem,1.6vw,1.6rem)] leading-tight">{t}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Duvidas() {
  const faq = [ // TODO: validar todas as respostas com a clínica
    ["Qual a diferença entre consulta dermatológica e avaliação estética?", "A consulta cuida da saúde da pele: diagnóstico e tratamento de queixas como manchas, acne e pintas. A avaliação estética analisa objetivos de aparência e indica, ou não, procedimentos. As duas são feitas pelo médico."],
    ["Quanto tempo dura a primeira consulta?", "Em média [TODO] minutos, para dar tempo de ouvir, examinar e explicar com calma."],
    ["Posso fazer o procedimento no mesmo dia?", "Depende da indicação e da sua pele. Alguns procedimentos podem ser feitos no mesmo dia, outros pedem preparo. Isso é definido na avaliação."],
    ["Vocês atendem convênio?", "[TODO] Informação a confirmar com a clínica."],
    ["Como funcionam os valores e formas de pagamento?", "Os valores dependem do plano indicado e são apresentados com clareza antes de qualquer procedimento. [TODO]"],
    ["O procedimento dói? Tem recuperação?", "Cada técnica tem um nível de desconforto e um tempo de recuperação diferentes. Tudo é explicado antes, com os cuidados e riscos de cada caso."],
    ["O que levar na primeira consulta?", "A lista de medicamentos e cremes que você usa e exames anteriores, se tiver. Chegue 10 minutos antes."],
  ];
  const [aberto, setAberto] = useState<number | null>(0);
  return (
    <section id="duvidas" data-theme="light" className="bg-ivory px-5 py-28 text-ink md:px-[6vw] md:py-40" aria-labelledby="dv-t">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4"><p className="eyebrow text-champagne-700">Dúvidas</p>
          <h2 id="dv-t" data-rv="lines" className="display h-lg mt-6">Perguntas <em className="text-forest-700">frequentes.</em></h2></div>
        <div className="md:col-span-8">
          {faq.map(([q, a], i) => <Item key={q} q={q} a={a} open={aberto === i} onToggle={() => setAberto(aberto === i ? null : i)} id={`faq-${i}`} />)}
          {clinica.flags.mostrarValores && <div>{/* TODO bloco de valores */}</div>}
        </div>
      </div>
    </section>
  );
}
function Item({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => { gsap.to(ref.current, { height: open ? "auto" : 0, duration: 0.7, ease: "power3.inOut" }); }, { dependencies: [open] });
  return (
    <div className="border-b border-ink/12">
      <h3><button onClick={onToggle} aria-expanded={open} aria-controls={id} className="flex w-full items-center justify-between gap-6 py-7 text-left">
        <span className="font-serif text-[clamp(1.35rem,2vw,1.9rem)] leading-tight">{q}</span>
        <span className={`relative h-4 w-4 shrink-0 transition-transform duration-500 ${open ? "rotate-45" : ""}`} aria-hidden><span className="absolute left-0 top-1/2 h-px w-4 bg-forest-700" /><span className="absolute left-1/2 top-0 h-4 w-px bg-forest-700" /></span>
      </button></h3>
      <div id={id} ref={ref} className="h-0 overflow-hidden" role="region"><p className="max-w-2xl pb-8 text-ink/75">{a}</p></div>
    </div>
  );
}

export function Avaliacoes() {
  const temAval = clinica.flags.mostrarAvaliacoes && clinica.avaliacoes.length > 0;
  return (
    <section data-theme="light" className="overflow-hidden border-t border-ink/10 bg-ivory py-24 text-ink" aria-labelledby="av-t">
      <div className="flex flex-col items-center px-5 text-center">
        <p className="font-serif text-[clamp(5rem,12vw,11rem)] font-light italic leading-none text-forest-700">{clinica.google.nota}</p>
        <p className="mt-2 text-xl tracking-[0.3em] text-champagne-700" aria-hidden>★★★★★</p>
        <h2 id="av-t" className="eyebrow mt-6 text-ink/70">{clinica.google.nota} no Google · {clinica.google.avaliacoes} avaliações</h2>
        <a href={clinica.google.url} target="_blank" rel="noopener" className="ulink mt-6 text-sm text-forest-900">Ler as avaliações no Google ↗</a>
      </div>
      {temAval && (
        <div className="mt-16 space-y-5">{/* marquee duplo, ligado quando a clínica enviar trechos reais */}
          {[1, -1].map((dir) => (
            <div key={dir} className="flex w-max gap-5 hover:[animation-play-state:paused]" style={{ animation: `marquee 60s linear infinite ${dir < 0 ? "reverse" : ""}` }}>
              {[...clinica.avaliacoes, ...clinica.avaliacoes].map((a, i) => (
                <figure key={i} className="w-[340px] shrink-0 border border-ink/10 p-6"><p className="text-champagne-700">★★★★★</p><blockquote className="mt-3 font-serif text-xl leading-snug">“{a.texto}”</blockquote><figcaption className="mt-4 text-sm text-ink/70">{a.nome}</figcaption></figure>))}
            </div>))}
        </div>
      )}
    </section>
  );
}

export function CTAFinal() {
  const { open } = useAgendar();
  return (
    <section data-theme="dark" className="grain relative overflow-hidden bg-forest-950 px-5 pb-20 pt-32 text-sand-100 md:px-[6vw] md:pt-44" aria-labelledby="cta-t">
      <SkinFlow dim={0.6} />
      <div className="relative text-center">
        <h2 id="cta-t" data-rv="lines" className="display mx-auto max-w-[16ch] text-[clamp(2.8rem,7vw,7.5rem)]">Sua pele merece uma <em className="text-champagne-500">avaliação de verdade.</em></h2>
        <div className="mt-14 flex justify-center" data-rv="fade">
          <Magnetic onClick={() => open({ origem: "cta_final" })} cursor="Agendar" className="min-h-16 rounded-full bg-champagne-500 px-12 text-base font-medium tracking-wide text-forest-950 hover:bg-champagne-300">Agendar avaliação</Magnetic>
        </div>
      </div>
      <div className="relative mt-28 grid gap-10 border-t hairline pt-14 md:grid-cols-12">
        <div className="space-y-8 md:col-span-4">
          <div><p className="eyebrow text-champagne-500">Endereço</p><p className="mt-3 font-serif text-2xl leading-snug">{clinica.endereco.linha1}<br />{clinica.endereco.cidade}</p>
            <a href={clinica.endereco.mapsUrl} target="_blank" rel="noopener" className="ulink mt-3 inline-block text-sm text-champagne-300">Como chegar ↗</a></div>
          <div><p className="eyebrow text-champagne-500">Horários</p><p className="mt-3">{clinica.horariosTexto}</p></div>
          <div><p className="eyebrow text-champagne-500">Contato</p>
            <p className="mt-3"><a className="ulink" href={`https://wa.me/${clinica.whatsapp}`} target="_blank" rel="noopener">WhatsApp {clinica.telefone}</a></p>
            <p className="mt-2"><a className="ulink" href={clinica.instagram.url} target="_blank" rel="noopener">Instagram {clinica.instagram.user}</a></p></div>
        </div>
        <div className="md:col-span-8">
          <iframe title="Mapa: Av. Marcílio Dias, 563, Resende/RJ" src={clinica.endereco.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full rounded-[2px] border hairline md:h-[420px]" style={{ filter: "invert(.9) hue-rotate(180deg) saturate(.35) brightness(.95) sepia(.25)" }} />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer data-theme="dark" className="grain bg-forest-950 px-5 pb-28 pt-16 text-sand-100/80 md:px-[6vw] md:pb-12">
      <div className="flex flex-col justify-between gap-10 border-t hairline pt-12 md:flex-row md:items-start">
        <div className="text-champagne-300"><Lockup /></div>
        <div className="grid gap-8 text-sm sm:grid-cols-3 md:gap-16">
          <div><p className="text-sand-100">{clinica.endereco.linha1}</p><p>{clinica.endereco.cidade}</p></div>
          <div className="space-y-2"><a className="ulink block w-fit" href={clinica.instagram.url} target="_blank" rel="noopener">Instagram</a><a className="ulink block w-fit" href={`https://wa.me/${clinica.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a></div>
          <div className="space-y-2"><a className="ulink block w-fit" href="/privacidade/">Privacidade e LGPD</a><a className="ulink block w-fit" href="/privacidade/#termos">Termos de uso</a></div>
        </div>
        <Seal className="h-24 w-24 shrink-0" />
      </div>
      <div className="mt-14 space-y-3 border-t hairline pt-8 text-xs leading-relaxed text-sand-100/70">
        <p>{clinica.medico} · MÉDICO · {clinica.crm} · Dermatologia {clinica.rqe} · Diretor técnico: {clinica.diretorTecnico}</p>
        <p className="max-w-3xl">{clinica.aviso}</p>
        <p>© {new Date().getFullYear()} {clinica.nome}</p>
      </div>
    </footer>
  );
}
