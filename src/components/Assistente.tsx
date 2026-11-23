"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { clinica, dentroDoHorario, proximaAbertura } from "@/data/clinica";
import { porSlug } from "@/data/tratamentos";
import { track } from "@/lib/track";
import type { OpenOpts, Tipo } from "./agendar";

const TIPOS: { id: Tipo; t: string; d: string }[] = [
  { id: "consulta", t: "Consulta dermatológica", d: "Saúde da pele, cabelo e unhas" },
  { id: "avaliacao", t: "Avaliação para procedimento estético", d: "Rugas, firmeza, qualidade da pele, laser, corpo" },
  { id: "retorno", t: "Retorno / já sou paciente", d: "Abre o WhatsApp direto" },
  { id: "naosei", t: "Ainda não sei", d: "Duas perguntas para te orientar" },
];
const URGENTE = "Pinta ou lesão que mudou";
const CONSULTA = ["Manchas na pele", "Acne e cicatrizes", "Pele sensível ou ressecada", "Check-up de pele e pintas", URGENTE, "Outra queixa"];
const ESTETICA = ["Rugas e linhas de expressão", "Firmeza e flacidez", "Qualidade da pele", "Limpeza de pele", "Laser", "Corpo (gordura localizada, estrias)", "Ainda não sei"];
const DIAS = ["seg", "ter", "qua", "qui", "sex"];
const LABEL: Record<Tipo, string> = { consulta: "Consulta dermatológica", avaliacao: "Avaliação para procedimento estético", retorno: "Retorno", naosei: "A definir" };

type S = { step: number; tipo?: Tipo; tri1?: string; tri2?: string; interesses: string[]; primeira?: string; periodo?: string; dias: string[]; quando?: string; pagamento?: string; nome: string; tel: string; aceite: boolean; msg?: string; ref: string; origem: string };
const novo = (origem = "site"): S => ({ step: 0, interesses: [], dias: [], nome: "", tel: "", aceite: false, ref: Math.random().toString(16).slice(2, 6).toUpperCase(), origem });
const KEY = "dlx-assistente";

export function waLink(text: string) { return `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent(text)}`; }

export default function Assistente({ opts, onClose }: { opts: OpenOpts | null; onClose: () => void }) {
  const [s, setS] = useState<S>(novo());
  const [copiado, setCopiado] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const isOpen = !!opts;
  const up = (p: Partial<S>) => setS((o) => ({ ...o, ...p }));

  // abrir: restaura progresso ou aplica deep link / tratamento
  useEffect(() => {
    if (!opts) return;
    lastFocus.current = document.activeElement as HTMLElement;
    let base = novo(opts.origem);
    try { const saved = sessionStorage.getItem(KEY); if (saved && !opts.tipo && !opts.tratamento) base = { ...base, ...JSON.parse(saved) }; } catch {}
    if (opts.tratamento) { const t = porSlug(opts.tratamento); if (t) base = { ...base, tipo: t.tipo, interesses: [t.chip], step: 1 }; }
    else if (opts.tipo) base = { ...base, tipo: opts.tipo, step: opts.tipo === "consulta" || opts.tipo === "avaliacao" ? 1 : 0 };
    setS(base);
    track("assistente_aberto", { origem: opts.origem });
    const lenis = (window as unknown as { __lenis?: { stop(): void } }).__lenis; lenis?.stop();
    const mm = window.matchMedia("(min-width: 768px)").matches;
    gsap.fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    gsap.fromTo(panel.current, mm ? { xPercent: 100 } : { yPercent: 100 }, { xPercent: 0, yPercent: 0, duration: 0.8, ease: "expo.out" });
    setTimeout(() => panel.current?.querySelector<HTMLElement>("button, input")?.focus(), 80);
  }, [opts]);

  useEffect(() => { if (isOpen) try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch {} }, [s, isOpen]);

  // animação entre passos
  useEffect(() => {
    if (!isOpen || !body.current) return;
    track("assistente_passo", { n: s.step + 1 });
    gsap.fromTo(body.current, { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    gsap.fromTo(body.current.querySelectorAll("[data-opt]"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: "power3.out" });
  }, [s.step, s.tipo, isOpen]);

  const close = () => {
    const mm = window.matchMedia("(min-width: 768px)").matches;
    gsap.to(overlay.current, { opacity: 0, duration: 0.4 });
    gsap.to(panel.current, { ...(mm ? { xPercent: 100 } : { yPercent: 100 }), duration: 0.6, ease: "power3.inOut", onComplete: () => {
      onClose(); (window as unknown as { __lenis?: { start(): void } }).__lenis?.start(); lastFocus.current?.focus?.(); } });
  };

  // ESC + foco preso
  useEffect(() => {
    if (!isOpen) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel.current) {
        const f = [...panel.current.querySelectorAll<HTMLElement>("button:not([disabled]), input, textarea, a[href]")];
        if (!f.length) return; const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k);
  });

  const urgente = s.interesses.includes(URGENTE);
  const recomendacao: Tipo | undefined = s.tri1 && s.tri2 ? (s.tri1 === "saude" || s.tri2 === "nao" ? "consulta" : "avaliacao") : undefined;

  const mensagem = useMemo(() => {
    const pref = [s.periodo && s.periodo !== "Sem preferência" ? s.periodo : null, s.dias.length ? s.dias.join(", ") : null].filter(Boolean).join(", ") || "Sem preferência";
    const linhas = [
      "Olá! Vim pelo site e quero agendar.",
      `*Atendimento:* ${s.tipo ? LABEL[s.tipo] : "-"}`,
      `*Interesse:* ${s.interesses.join("; ") || "-"}`,
      `*Primeira vez na clínica:* ${s.primeira ?? "-"}`,
      `*Preferência:* ${pref}`,
      `*Quando:* ${s.quando ?? "-"}`,
      ...(s.pagamento ? [`*Pagamento:* ${s.pagamento}`] : []),
      `*Nome:* ${s.nome.trim() || "-"}`,
      ...(s.tel.trim() ? [`*Meu WhatsApp:* ${s.tel.trim()}`] : []),
      `Ref. site #${s.ref}`,
    ];
    return linhas.join("\n");
  }, [s]);

  if (!isOpen) return null;

  const toggle = (arr: string[], v: string, max = 3) => arr.includes(v) ? arr.filter((x) => x !== v) : arr.length >= max ? arr : [...arr, v];
  const chip = (on: boolean) => `min-h-12 rounded-[2px] border px-4 py-3 text-left text-[0.95rem] transition-colors ${on ? "border-champagne-500 bg-champagne-500 text-forest-950" : "border-champagne-500/30 text-sand-100 hover:border-champagne-500"}`;
  const pode = [
    !!s.tipo && (s.tipo !== "naosei" || !!recomendacao),
    s.interesses.length > 0,
    !!s.primeira && !!s.quando && (clinica.atendeConvenio === undefined || !!s.pagamento),
    s.nome.trim().length > 1 && s.aceite,
  ][s.step];

  const enviar = () => {
    const txt = s.msg ?? mensagem;
    track("assistente_concluido", { tipo: s.tipo ?? "", categoria: s.interesses[0] ?? "" });
    track("whatsapp_clique", { secao: "assistente" });
    // submitLead(): ponto de extensão para a Fase 2 (agenda em tempo real). Hoje só abre o WhatsApp.
    window.open(waLink(txt), "_blank", "noopener");
    up({ step: 4 });
    try { sessionStorage.removeItem(KEY); } catch {}
  };
  const retorno = () => {
    track("whatsapp_clique", { secao: "assistente_retorno" });
    window.open(waLink("Olá! Sou paciente da clínica e gostaria de agendar um retorno."), "_blank", "noopener");
    close();
  };
  const horario = dentroDoHorario() ? "Respondemos em poucos minutos." : `Sua mensagem fica registrada e respondemos no próximo dia útil a partir das ${proximaAbertura()}.`;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-labelledby="ass-title" data-lenis-prevent>
      <div ref={overlay} className="absolute inset-0 bg-forest-950/60 backdrop-blur-[2px]" onClick={close} />
      <div ref={panel} className="grain absolute inset-0 flex flex-col bg-forest-900 text-sand-100 md:left-auto md:w-[520px]">
        <header className="flex items-center justify-between px-6 pt-6 md:px-8">
          <p id="ass-title" className="eyebrow text-champagne-500">{s.step < 4 ? `Agendar · passo ${s.step + 1} de 4` : "Mensagem pronta"}</p>
          <button onClick={close} className="grid h-12 w-12 place-items-center rounded-full border border-champagne-500/30 hover:border-champagne-500" aria-label="Fechar">
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
        </header>
        <div className="mx-6 mt-5 h-px bg-champagne-500/20 md:mx-8"><div className="h-px bg-champagne-500 transition-[width] duration-700" style={{ width: `${Math.min(s.step + 1, 4) * 25}%` }} /></div>

        <div ref={body} className="flex-1 overflow-y-auto px-6 pb-8 pt-8 md:px-8" aria-live="polite">
          {s.step === 0 && (<>
            <h2 className="display h-md text-ivory">O que você <em className="text-champagne-500">procura?</em></h2>
            <div className="mt-8 grid gap-3">
              {TIPOS.map((o) => (
                <button key={o.id} data-opt onClick={() => o.id === "retorno" ? retorno() : up({ tipo: o.id, interesses: [] })} className={`${chip(s.tipo === o.id)} px-5 py-4`} aria-pressed={s.tipo === o.id}>
                  <span className="block font-serif text-[1.35rem] leading-tight">{o.t}</span>
                  <span className="mt-1 block text-sm opacity-75">{o.d}</span>
                </button>
              ))}
            </div>
            {s.tipo === "naosei" && (
              <div className="mt-8 border-t hairline pt-6">
                <p className="mb-3">O que mais te incomoda hoje?</p>
                <div className="grid grid-cols-2 gap-2">
                  {[["saude", "Algo na saúde da pele (manchas, coceira, pintas, acne)"], ["aparencia", "Algo na aparência (rugas, firmeza, viço)"]].map(([v, l]) => (
                    <button key={v} data-opt className={chip(s.tri1 === v)} onClick={() => up({ tri1: v })}>{l}</button>))}
                </div>
                <p className="mb-3 mt-6">Passou por consulta dermatológica no último ano?</p>
                <div className="grid grid-cols-2 gap-2">
                  {[["sim", "Sim"], ["nao", "Não"]].map(([v, l]) => (<button key={v} data-opt className={chip(s.tri2 === v)} onClick={() => up({ tri2: v })}>{l}</button>))}
                </div>
                {recomendacao && (
                  <div className="mt-6 border border-champagne-500/40 p-5">
                    <p className="text-sm text-champagne-300">Sugestão para começar</p>
                    <p className="mt-1 font-serif text-2xl">{LABEL[recomendacao]}</p>
                    <p className="mt-2 text-sm opacity-75">Isso não substitui avaliação médica.</p>
                  </div>
                )}
              </div>
            )}
          </>)}

          {s.step === 1 && (<>
            <h2 className="display h-md text-ivory">Conte um pouco <em className="text-champagne-500">mais.</em></h2>
            <p className="mt-3 text-sm opacity-75">Escolha de 1 a 3 opções.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {(s.tipo === "consulta" ? CONSULTA : ESTETICA).map((c) => (
                <button key={c} data-opt className={chip(s.interesses.includes(c))} aria-pressed={s.interesses.includes(c)}
                  onClick={() => { const n = toggle(s.interesses, c); up({ interesses: n, ...(c === URGENTE && n.includes(URGENTE) ? { quando: "O quanto antes" } : {}) }); }}>{c}</button>))}
            </div>
            {urgente && <p role="alert" className="mt-6 border-l-2 border-champagne-500 pl-4 text-champagne-300">Procure atendimento o quanto antes. Vamos marcar seu pedido como prioritário.</p>}
          </>)}

          {s.step === 2 && (<>
            <h2 className="display h-md text-ivory">Quando fica <em className="text-champagne-500">melhor?</em></h2>
            {[{ l: "Primeira vez na clínica?", k: "primeira", o: ["Sim", "Não"] }, { l: "Período preferido", k: "periodo", o: ["Manhã", "Tarde", "Sem preferência"] }, { l: "Para quando?", k: "quando", o: ["O quanto antes", "Nas próximas semanas", "Só estou pesquisando"] },
              ...(clinica.atendeConvenio !== undefined ? [{ l: "Pagamento", k: "pagamento", o: clinica.atendeConvenio ? ["Particular", "Convênio"] : ["Particular"] }] : [])].map((g) => (
              <fieldset key={g.k} className="mt-7"><legend className="mb-3 text-sm text-champagne-300">{g.l}</legend>
                <div className="flex flex-wrap gap-2">{g.o.map((o) => { const on = (s as unknown as Record<string, string>)[g.k] === o; return <button key={o} data-opt className={chip(on)} aria-pressed={on} onClick={() => up({ [g.k]: o } as Partial<S>)}>{o}</button>; })}</div>
              </fieldset>))}
            <fieldset className="mt-7"><legend className="mb-3 text-sm text-champagne-300">Dias (opcional)</legend>
              <div className="flex flex-wrap gap-2">{DIAS.map((d) => <button key={d} data-opt className={`${chip(s.dias.includes(d))} w-14 text-center`} aria-pressed={s.dias.includes(d)} onClick={() => up({ dias: toggle(s.dias, d, 5) })}>{d}</button>)}</div>
            </fieldset>
          </>)}

          {s.step === 3 && (<>
            <h2 className="display h-md text-ivory">Quase <em className="text-champagne-500">pronto.</em></h2>
            <label className="mt-8 block text-sm text-champagne-300" htmlFor="ass-nome">Seu nome</label>
            <input id="ass-nome" data-opt value={s.nome} onChange={(e) => up({ nome: e.target.value, msg: undefined })} autoComplete="given-name" className="mt-2 h-12 w-full border-b border-champagne-500/40 bg-transparent font-serif text-2xl outline-none focus:border-champagne-500" />
            <label className="mt-6 block text-sm text-champagne-300" htmlFor="ass-tel">Seu WhatsApp (opcional, só para retorno)</label>
            <input id="ass-tel" data-opt value={s.tel} onChange={(e) => up({ tel: e.target.value, msg: undefined })} inputMode="tel" autoComplete="tel" className="mt-2 h-12 w-full border-b border-champagne-500/40 bg-transparent text-lg outline-none focus:border-champagne-500" />
            <label data-opt className="mt-6 flex cursor-pointer items-start gap-3 text-sm opacity-90">
              <input type="checkbox" checked={s.aceite} onChange={(e) => up({ aceite: e.target.checked })} className="mt-1 h-5 w-5 accent-[#C8B08A]" />
              <span>Concordo em enviar estes dados à clínica pelo WhatsApp. Nada fica salvo neste site. <a href="/privacidade/" className="ulink text-champagne-300" target="_blank">Privacidade</a></span>
            </label>
            <details data-opt className="mt-8 border-t hairline pt-5" open>
              <summary className="cursor-pointer text-sm text-champagne-300">Veja o que vamos enviar (você pode editar)</summary>
              <textarea value={s.msg ?? mensagem} onChange={(e) => up({ msg: e.target.value })} rows={9} aria-label="Mensagem para a clínica" className="mt-3 w-full resize-none rounded-[2px] border border-champagne-500/25 bg-forest-950/50 p-4 font-mono text-[0.8rem] leading-relaxed outline-none focus:border-champagne-500" />
            </details>
          </>)}

          {s.step === 4 && (<>
            <h2 className="display h-md text-ivory">Mensagem <em className="text-champagne-500">pronta.</em></h2>
            <p className="lead mt-4 opacity-85">{horario}</p>
            <div className="mt-8 border border-champagne-500/30 p-5">
              <p className="text-sm text-champagne-300">Não abriu o WhatsApp?</p>
              <p className="mt-1">Envie para <a className="ulink" href={`tel:+${clinica.whatsapp}`}>{clinica.telefone}</a></p>
              <button className="mt-4 min-h-12 border border-champagne-500 px-5 text-sm hover:bg-champagne-500 hover:text-forest-950"
                onClick={async () => { try { await navigator.clipboard.writeText(s.msg ?? mensagem); setCopiado(true); } catch {} }}>{copiado ? "Copiada ✓" : "Copiar mensagem"}</button>
            </div>
            <div className="mt-6">
              <p className="text-sm text-champagne-300">Para agilizar sua consulta</p>
              <ul className="mt-3 space-y-2 text-[0.95rem] opacity-90">{/* TODO validar com a clínica */}
                <li>— Lista de medicamentos e cremes que usa</li><li>— Exames anteriores, se tiver</li><li>— Chegue 10 minutos antes</li>
              </ul>
            </div>
            <div className="mt-6 border-t hairline pt-6">
              <p>{clinica.endereco.linha1}<br />{clinica.endereco.cidade}</p>
              <a href={clinica.endereco.mapsUrl} target="_blank" rel="noopener" className="ulink mt-3 inline-block text-champagne-300">Como chegar ↗</a>
            </div>
          </>)}
        </div>

        {s.step < 4 && (
          <footer className="flex items-center justify-between gap-3 border-t hairline px-6 py-4 md:px-8">
            <button onClick={() => up({ step: Math.max(0, s.step - 1) })} disabled={s.step === 0} className="min-h-12 px-2 text-sm opacity-80 disabled:opacity-0">← Voltar</button>
            {s.step < 3 ? (
              <button disabled={!pode} onClick={() => up({ step: s.step + 1, ...(s.step === 0 && s.tipo === "naosei" && recomendacao ? { tipo: recomendacao } : {}) })}
                className="min-h-12 bg-champagne-500 px-7 text-sm font-medium tracking-wide text-forest-950 transition-opacity disabled:opacity-30">Continuar</button>
            ) : (
              <button disabled={!pode} onClick={enviar} className="min-h-12 bg-champagne-500 px-6 text-sm font-medium tracking-wide text-forest-950 disabled:opacity-30">Enviar pelo WhatsApp</button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
