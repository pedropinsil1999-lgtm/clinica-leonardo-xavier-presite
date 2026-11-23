"use client";
import { useState } from "react";
import { useAgendar } from "./agendar";
import { clinica } from "@/data/clinica";
import Img from "./Img";
import Magnetic from "./Magnetic";
import { Lockup, Seal } from "./Logo";

export function Sobre() {
  return (
    <section id="sobre" data-theme="light" className="sec-r cv bg-ivory px-5 pb-24 pt-20 text-ink md:px-[6vw] md:pb-36 md:pt-36" aria-labelledby="sobre-t">
      <div className="grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-5" data-rv="fade">
          {/* TODO: trocar por foto do Instagram (Dr. Leonardo no consultório) com enquadramento diferente do recorte da hero */}
          <div className="arch relative mx-auto aspect-[4/5] max-w-md bg-forest-700">
            <img src="/midia/dr-leonardo-640.webp" srcSet="/midia/dr-leonardo-640.webp 640w, /midia/dr-leonardo-960.webp 960w" sizes="(min-width: 768px) 40vw, 80vw" alt="Retrato do Dr. Leonardo Xavier" width={1526} height={2000} loading="lazy" decoding="async" className="absolute left-1/2 top-[8%] h-[140%] w-auto max-w-none -translate-x-1/2" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-champagne-700">Sobre o Dr. Leonardo</p>
          <h2 id="sobre-t" data-rv="fade" className="display h-lg mt-6">Critério médico, <em className="text-forest-700">olhar atento.</em></h2>
          <div data-rv="fade" className="lead mt-8 space-y-4 text-ink/80">
            <p>Há mais de {clinica.anos} anos, o Dr. Leonardo Xavier cuida da pele de pacientes de Resende e do Sul Fluminense, unindo dermatologia clínica e estética avançada.</p>
            <p>O jeito de trabalhar é simples: ouvir com calma, explicar com clareza e indicar só o que faz sentido para cada pessoa. {/* TODO: validar bio */}</p>
          </div>
          <dl data-rv="fade" className="mt-10 grid gap-5 rounded-3xl border border-ink/10 p-6 text-sm sm:grid-cols-3">
            <div><dt className="eyebrow text-[0.62rem] text-ink/60">Registro</dt><dd className="mt-2">MÉDICO · {clinica.crm}</dd></div>
            <div><dt className="eyebrow text-[0.62rem] text-ink/60">Especialidade</dt><dd className="mt-2">Dermatologia · {clinica.rqe}</dd></div>
            <div><dt className="eyebrow text-[0.62rem] text-ink/60">Formação</dt><dd className="mt-2">{clinica.formacao}</dd></div>
          </dl>
          <p className="mt-8 font-serif text-4xl italic text-forest-700">Leonardo Xavier</p>
          <p className="mt-4 text-sm text-ink/70">Equipe: {clinica.equipe}</p>
        </div>
      </div>
    </section>
  );
}

export function Clinica() {
  const fotos = ["espaco-1", "espaco-2", "espaco-3", "espaco-4", "espaco-5"];
  return (
    <section id="clinica" data-theme="light" className="sec-r cv bg-sand-100 pb-24 pt-20 text-ink md:pb-36 md:pt-36" aria-labelledby="cl-t">
      <div className="flex flex-col justify-between gap-6 px-5 md:flex-row md:items-end md:px-[6vw]">
        <div><p className="eyebrow text-champagne-700">A clínica</p>
          <h2 id="cl-t" data-rv="fade" className="display h-lg mt-6">Um espaço pensado <em className="text-forest-700">para você.</em></h2></div>
        <p data-rv="fade" className="max-w-sm text-ink/75">Madeira, verde profundo e luz quente. Um lugar calmo para conversar sobre a sua pele, no centro de Resende.</p>
      </div>
      <div className="no-sb mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:gap-5 md:px-[6vw]" tabIndex={0} aria-label="Galeria do espaço, deslize para os lados">
        {fotos.map((f, i) => (
          <figure key={f} className={`relative shrink-0 snap-start overflow-hidden rounded-3xl ${i % 2 ? "h-[44svh] w-[68vw] md:w-[28vw]" : "h-[54svh] w-[76vw] md:w-[34vw]"}`}>
            <Img name={f} alt="" sizes="(min-width: 768px) 34vw, 76vw" />
            {/* TODO: substituir por fotos reais do espaço (Instagram) com a mesma gradação */}
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-ivory/85 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-ink/70">Foto do espaço · em produção</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Aprenda() {
  // TODO: 3 a 5 reels do Instagram, sem áudio, com legenda em HTML. Hoje: cards temáticos com link para o perfil.
  const temas = [["3 queixas que a limpeza de pele ajuda", "limpeza"], ["Rugas da glabela: o que são e como tratar", "toxina"], ["Bioestimulador: por que o resultado é gradual", "bioestimulador"], ["Laser e sol: o que muda no verão", "laser"]];
  return (
    <section data-theme="dark" className="sec-r bg-flow cv px-5 pb-24 pt-20 text-sand-100 md:px-[6vw] md:pb-36 md:pt-36" aria-labelledby="ap-t">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="eyebrow text-champagne-500">Aprenda com o Dr. Leonardo</p>
          <h2 id="ap-t" data-rv="fade" className="display h-lg mt-6">Informação clara, <em className="text-champagne-500">sem exagero.</em></h2></div>
        <a href={clinica.instagram.url} target="_blank" rel="noopener" className="ulink text-sm text-champagne-300">Ver mais no Instagram ↗</a>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {temas.map(([t, a], i) => (
          <a key={t} href={clinica.instagram.url} target="_blank" rel="noopener" data-rv="fade" data-d={i * 0.06} className="group relative block aspect-[9/16] overflow-hidden rounded-3xl border hairline">
            <Img name={a} alt="" className="opacity-80" sizes="(min-width: 768px) 24vw, 46vw" />
            <span className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
            <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-champagne-500/50 text-xs text-champagne-300" aria-hidden>▶</span>
            <span className="absolute inset-x-4 bottom-5 font-serif text-[clamp(1.1rem,1.6vw,1.6rem)] leading-tight">{t}</span>
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
    <section id="duvidas" data-theme="light" className="sec-r cv bg-ivory px-5 pb-24 pt-20 text-ink md:px-[6vw] md:pb-36 md:pt-36" aria-labelledby="dv-t">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4"><p className="eyebrow text-champagne-700">Dúvidas</p>
          <h2 id="dv-t" data-rv="fade" className="display h-lg mt-6">Perguntas <em className="text-forest-700">frequentes.</em></h2></div>
        <div className="space-y-3 md:col-span-8">
          {faq.map(([q, a], i) => {
            const open = aberto === i;
            return (
              <div key={q} className={`rounded-3xl border px-6 transition-colors ${open ? "border-forest-700/30 bg-sand-100" : "border-ink/10"}`}>
                <h3><button onClick={() => setAberto(open ? null : i)} aria-expanded={open} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="font-serif text-[clamp(1.25rem,1.9vw,1.75rem)] leading-tight">{q}</span>
                  <span className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden><span className="absolute left-0 top-1/2 h-px w-4 bg-forest-700" /><span className="absolute left-1/2 top-0 h-4 w-px bg-forest-700" /></span>
                </button></h3>
                <div id={`faq-${i}`} role="region" className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden"><p className="max-w-2xl pb-6 text-ink/75">{a}</p></div>
                </div>
              </div>
            );
          })}
          {clinica.flags.mostrarValores && <div>{/* TODO bloco de valores */}</div>}
        </div>
      </div>
    </section>
  );
}

export function Avaliacoes() {
  const temAval = clinica.flags.mostrarAvaliacoes && clinica.avaliacoes.length > 0;
  return (
    <section data-theme="light" className="sec-r cv overflow-hidden bg-sand-100 pb-20 pt-20 text-ink md:pt-28" aria-labelledby="av-t">
      <div className="flex flex-col items-center px-5 text-center">
        <p className="font-serif text-[clamp(5rem,12vw,10rem)] font-light italic leading-none text-forest-700">{clinica.google.nota}</p>
        <p className="mt-2 text-xl tracking-[0.3em] text-champagne-700" aria-hidden>★★★★★</p>
        <h2 id="av-t" className="eyebrow mt-6 text-ink/70">{clinica.google.nota} no Google · {clinica.google.avaliacoes} avaliações</h2>
        <a href={clinica.google.url} target="_blank" rel="noopener" className="ulink mt-6 text-sm text-forest-900">Ler as avaliações no Google ↗</a>
      </div>
      {temAval && (
        <div className="marquee mt-14 space-y-4">
          {[0, 1].map((dir) => (
            <div key={dir} className="marquee-track flex w-max gap-4" style={{ animationDirection: dir ? "reverse" : "normal" }}>
              {[...clinica.avaliacoes, ...clinica.avaliacoes].map((a, i) => (
                <figure key={i} className="w-[320px] shrink-0 rounded-3xl border border-ink/10 bg-ivory p-6"><p className="text-champagne-700">★★★★★</p><blockquote className="mt-3 font-serif text-xl leading-snug">“{a.texto}”</blockquote><figcaption className="mt-4 text-sm text-ink/70">{a.nome}</figcaption></figure>))}
            </div>))}
        </div>
      )}
    </section>
  );
}

export function CTAFinal() {
  const { open } = useAgendar();
  const [mapa, setMapa] = useState(false);
  return (
    <section data-theme="dark" className="sec-r bg-flow px-5 pb-16 pt-24 text-sand-100 md:px-[6vw] md:pt-44" aria-labelledby="cta-t">
      <div className="text-center">
        <h2 id="cta-t" data-rv="fade" className="display mx-auto max-w-[16ch] text-[clamp(2.7rem,7vw,7rem)]">Sua pele merece uma <em className="text-champagne-500">avaliação de verdade.</em></h2>
        <div className="mt-12 flex justify-center" data-rv="fade" data-d="0.1">
          <Magnetic onClick={() => open({ origem: "cta_final" })} className="min-h-16 rounded-full bg-champagne-500 px-12 text-base font-medium tracking-wide text-forest-950 hover:bg-champagne-300">Agendar avaliação</Magnetic>
        </div>
      </div>
      <div className="mt-24 grid gap-10 border-t hairline pt-12 md:grid-cols-12">
        <div className="space-y-8 md:col-span-4">
          <div><p className="eyebrow text-champagne-500">Endereço</p><p className="mt-3 font-serif text-2xl leading-snug">{clinica.endereco.linha1}<br />{clinica.endereco.cidade}</p>
            <a href={clinica.endereco.mapsUrl} target="_blank" rel="noopener" className="ulink mt-3 inline-block text-sm text-champagne-300">Como chegar ↗</a></div>
          <div><p className="eyebrow text-champagne-500">Horários</p><p className="mt-3">{clinica.horariosTexto}</p></div>
          <div><p className="eyebrow text-champagne-500">Contato</p>
            <p className="mt-3"><a className="ulink" href={`https://wa.me/${clinica.whatsapp}`} target="_blank" rel="noopener">WhatsApp {clinica.telefone}</a></p>
            <p className="mt-2"><a className="ulink" href={clinica.instagram.url} target="_blank" rel="noopener">Instagram {clinica.instagram.user}</a></p></div>
        </div>
        <div className="md:col-span-8">
          {/* O mapa só carrega quando a pessoa pede: iframe do Google é pesado, principalmente no celular */}
          {mapa ? (
            <iframe title="Mapa: Av. Marcílio Dias, 563, Resende/RJ" src={clinica.endereco.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[320px] w-full rounded-3xl border hairline md:h-[400px]" />
          ) : (
            <div className="grid h-[320px] place-items-center rounded-3xl border hairline bg-forest-900/70 p-6 text-center md:h-[400px]">
              <div>
                <p className="font-serif text-2xl">{clinica.endereco.linha1}</p><p className="mt-1 text-sand-100/70">{clinica.endereco.cidade}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={() => setMapa(true)} className="min-h-12 rounded-full border border-champagne-500 px-6 text-sm hover:bg-champagne-500 hover:text-forest-950">Ver mapa aqui</button>
                  <a href={clinica.endereco.mapsUrl} target="_blank" rel="noopener" className="grid min-h-12 place-items-center rounded-full bg-champagne-500 px-6 text-sm font-medium text-forest-950">Abrir no Google Maps</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer data-theme="dark" className="bg-flow px-5 pb-28 pt-4 text-sand-100/80 md:px-[6vw] md:pb-12">
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
