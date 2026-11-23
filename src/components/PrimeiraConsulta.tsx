"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAgendar } from "./agendar";

// TODO: ajustar tempos e textos com a clínica
const PASSOS = [
  { t: "Você agenda pelo site", d: "Em cerca de um minuto, com o assistente. Sem formulário longo e sem esperar resposta para saber o que perguntar.", voce: "Escolhe o tipo de atendimento e o melhor horário.", nos: "Recebemos tudo organizado e confirmamos o seu horário.", tempo: "1 min", curto: "Agendar" },
  { t: "Conversa e avaliação", d: "O Dr. Leonardo escuta a sua história, examina a pele e responde as suas dúvidas, sem pressa.", voce: "Conta o que incomoda e o que espera.", nos: "Avaliamos a pele e explicamos o que vemos.", tempo: "Consulta", curto: "Avaliação" },
  { t: "Plano explicado com clareza", d: "Você entende o que faz sentido, o que não faz e por quê. Riscos e cuidados ditos de forma honesta.", voce: "Decide com calma, sem pressão.", nos: "Apresentamos o plano, as opções e os cuidados.", tempo: "Sem pressa", curto: "Plano" },
  { t: "Acompanhamento", d: "Retornos para ajustar o plano e acompanhar a resposta da pele quando necessário.", voce: "Tira dúvidas e avisa como se sente.", nos: "Acompanhamos e ajustamos o cuidado.", tempo: "Retornos", curto: "Retorno" },
];
const DUR = 8;

export default function PrimeiraConsulta() {
  const { open } = useAgendar();
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [vis, setVis] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef(0);
  const go = useCallback((n: number, manual = true) => { setI((n + PASSOS.length) % PASSOS.length); if (manual) setAuto(false); }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!); return () => io.disconnect();
  }, []);
  // avanço automático só enquanto visível e se a pessoa não mexeu; respeita reduced motion
  useEffect(() => {
    if (!auto || !vis || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((x) => (x + 1) % PASSOS.length), DUR * 1000);
    return () => clearTimeout(t);
  }, [i, auto, vis]);

  const p = PASSOS[i];
  return (
    <section data-theme="light" className="sec-r cv bg-ivory px-5 pb-24 pt-20 text-ink md:px-[6vw] md:pb-36 md:pt-36" aria-labelledby="pc-t">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow text-champagne-700">Sem surpresas</p>
        <h2 id="pc-t" data-rv="fade" className="display h-lg mt-6">Como é a <em className="text-forest-700">primeira consulta.</em></h2>
        <p data-rv="fade" className="lead mx-auto mt-5 max-w-xl text-ink/75">Toque em cada etapa. Você entende o caminho inteiro antes de decidir qualquer coisa.</p>
      </div>

      <div ref={root} className="mx-auto mt-12 max-w-5xl">
        {/* trilho de etapas */}
        <ol className="relative mx-auto flex max-w-3xl items-start justify-between" aria-label="Etapas">
          <span aria-hidden className="absolute left-[12%] right-[12%] top-6 h-px bg-ink/15"><span className="block h-full origin-left bg-forest-700 transition-transform duration-700" style={{ transform: `scaleX(${i / (PASSOS.length - 1)})` }} /></span>
          {PASSOS.map((s, k) => (
            <li key={s.t} className="relative z-10 flex w-1/4 flex-col items-center">
              <button onClick={() => go(k)} aria-current={k === i ? "step" : undefined} aria-label={`Etapa ${k + 1}: ${s.t}`}
                className={`grid h-12 w-12 place-items-center rounded-full border font-serif text-lg italic transition-all duration-500 ${k === i ? "scale-110 border-forest-700 bg-forest-700 text-ivory shadow-lg" : k < i ? "border-forest-700 bg-sand-100 text-forest-700" : "border-ink/20 bg-ivory text-ink/60"}`}>
                {k < i ? "✓" : k + 1}
              </button>
              <span className={`mt-2 text-center text-[0.7rem] uppercase tracking-[0.16em] transition-opacity md:text-xs ${k === i ? "opacity-100" : "opacity-50"}`}>{s.curto}</span>
            </li>
          ))}
        </ol>

        {/* cartão da etapa (deslize para os lados no celular) */}
        <div className="mt-10 touch-pan-y" onTouchStart={(e) => { touch.current = e.touches[0].clientX; }} onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); }}>
          <div key={i} className="step-in relative overflow-hidden rounded-[2rem] bg-forest-900 p-6 text-sand-100 md:rounded-[2.5rem] md:p-12" aria-live="polite">
            <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 font-serif text-[9rem] font-light italic leading-none text-champagne-500/15 md:text-[15rem]">{i + 1}</span>
            <div className="relative">
              <span className="inline-flex rounded-full border border-champagne-500/40 px-3 py-1 text-xs text-champagne-300">{p.tempo}</span>
              <h3 className="display mt-5 text-[clamp(1.9rem,4vw,3.4rem)]">{p.t}</h3>
              <p className="lead mt-4 max-w-2xl text-sand-100/80">{p.d}</p>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-forest-950/60 p-5"><p className="eyebrow text-[0.62rem] text-champagne-500">Você</p><p className="mt-2">{p.voce}</p></div>
                <div className="rounded-2xl bg-forest-950/60 p-5"><p className="eyebrow text-[0.62rem] text-champagne-500">A gente</p><p className="mt-2">{p.nos}</p></div>
              </div>
            </div>
            {auto && vis && <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-champagne-500/15"><span key={i} className="t-fill block h-full bg-champagne-500" style={{ "--dur": `${DUR}s` } as React.CSSProperties} /></span>}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-3">
              <button onClick={() => go(i - 1)} aria-label="Etapa anterior" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-lg transition hover:bg-forest-900 hover:text-ivory">←</button>
              <button onClick={() => go(i + 1)} aria-label="Próxima etapa" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-lg transition hover:bg-forest-900 hover:text-ivory">→</button>
            </div>
            <button onClick={() => open({ origem: "primeira_consulta" })} className="min-h-12 rounded-full bg-forest-900 px-7 text-sm font-medium tracking-wide text-ivory transition hover:bg-forest-700 active:scale-[0.98]">Começar pelo passo 1</button>
          </div>
        </div>
      </div>
    </section>
  );
}
