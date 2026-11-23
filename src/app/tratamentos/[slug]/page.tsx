import FlowBg from "@/components/FlowBg";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tratamentos, porSlug } from "@/data/tratamentos";
import { Shell, BotaoAgendar, CTAMobile } from "@/components/Interna";
import Img from "@/components/Img";

export function generateStaticParams() { return tratamentos.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = porSlug((await params).slug); return t ? { title: `${t.nome} em Resende/RJ`, description: `${t.resumo} Avaliação com o Dr. Leonardo Xavier, em Resende/RJ.` } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const t = porSlug((await params).slug); if (!t) notFound();
  const rel = t.combina.map(porSlug).filter(Boolean);
  const bloco = (titulo: string, conteudo: React.ReactNode) => (
    <div className="grid gap-6 border-t border-ink/10 py-12 md:grid-cols-12"><h2 data-rv="fade" className="font-serif text-3xl md:col-span-4">{titulo}</h2><div data-rv="fade" className="lead text-ink/80 md:col-span-7 md:col-start-6">{conteudo}</div></div>
  );
  return (
    <Shell>
      <section data-theme="dark" className="bg-flow relative px-5 pb-20 pt-36 text-sand-100 md:px-[6vw] md:pt-44">
      <FlowBg />
        <div className="grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Link href="/#tratamentos" className="ulink text-sm text-champagne-300">← Tratamentos</Link>
            <h1 data-rv="fade" className="display h-xl mt-8">{t.nome}</h1>
            <p data-rv="fade" className="lead mt-6 max-w-lg text-sand-100/80">{t.resumo}</p>
            <div data-rv="fade" className="mt-10 hidden md:block"><BotaoAgendar label={`Agendar avaliação de ${t.nome.toLowerCase()}`} tratamento={t.slug} /></div>
          </div>
          <div className="md:col-span-4 md:col-start-9" data-rv="fade"><div className="arch par aspect-[4/5]"><Img name={t.arte} alt="" priority /></div></div>
        </div>
      </section>
      <section data-theme="light" className="sec-r bg-ivory px-5 py-16 text-ink md:px-[6vw] md:py-24">
        {/* TODO: validar todos os textos com a clínica */}
        {bloco("Para quem é", <ul className="space-y-3">{t.paraQuem.map((x) => <li key={x}>— {x}</li>)}</ul>)}
        {bloco("Como funciona", <p>{t.comoFunciona}</p>)}
        {bloco("Sessões e intervalo", <p>{t.sessoes}</p>)}
        {bloco("Cuidados antes e depois", <ul className="space-y-3">{t.cuidados.map((x) => <li key={x}>— {x}</li>)}</ul>)}
        {bloco("Riscos e contraindicações", <p>{t.riscos}</p>)}
        {bloco("Perguntas frequentes", <div className="space-y-6">{t.faq.map((f) => <div key={f.q}><p className="font-medium text-ink">{f.q}</p><p className="mt-1">{f.a}</p></div>)}</div>)}
        <div className="border-t border-ink/10 pt-12">
          <h2 className="font-serif text-3xl">Combina com</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {rel.map((r) => r && (
              <Link key={r.slug} href={`/tratamentos/${r.slug}/`} className="group flex items-center gap-6 border border-ink/10 p-4">
                <div className="h-28 w-24 shrink-0 overflow-hidden"><Img name={r.arte} alt="" className="transition-transform duration-1000 group-hover:scale-110" /></div>
                <div><p className="font-serif text-2xl">{r.nome}</p><p className="mt-1 text-sm text-ink/70">{r.resumo}</p></div>
              </Link>))}
          </div>
        </div>
      </section>
      <CTAMobile label={`Agendar avaliação de ${t.nome.toLowerCase()}`} tratamento={t.slug} />
    </Shell>
  );
}
