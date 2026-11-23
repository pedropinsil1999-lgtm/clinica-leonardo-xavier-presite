import FlowBg from "@/components/FlowBg";
import type { Metadata } from "next";
import { Shell, BotaoAgendar, CTAMobile } from "@/components/Interna";
export const metadata: Metadata = { title: "Consulta dermatológica em Resende/RJ", description: "Consulta dermatológica com o Dr. Leonardo Xavier em Resende/RJ: manchas, acne, pele sensível, check-up de pintas." };
const queixas = [["Manchas", "Melasma, manchas de sol e tom irregular."], ["Acne e cicatrizes", "Controle da acne ativa e cuidado com as marcas."], ["Pele sensível ou ressecada", "Vermelhidão, coceira, dermatites."], ["Pintas e lesões", "Check-up de pele e acompanhamento de pintas."], ["Cabelo e unhas", "Queda de cabelo, couro cabeludo, unhas."]];
export default function Page() {
  return (
    <Shell>
      <section data-theme="dark" className="bg-flow px-5 pb-20 pt-36 text-sand-100 md:px-[6vw] md:pt-44">
      <FlowBg />
        <p className="eyebrow text-champagne-500">Consulta dermatológica</p>
        <h1 data-rv="fade" className="display h-xl mt-8 max-w-[14ch]">Cuidar da <em className="text-champagne-500">saúde da pele.</em></h1>
        <p data-rv="fade" className="lead mt-6 max-w-xl text-sand-100/80">Diagnóstico, tratamento e acompanhamento. A base de qualquer cuidado com a pele, inclusive estético.</p>
        <div className="mt-10 hidden md:block"><BotaoAgendar label="Agendar consulta" tipo="consulta" /></div>
      </section>
      <section data-theme="light" className="sec-r bg-ivory px-5 py-20 text-ink md:px-[6vw] md:py-28">
        <h2 data-rv="fade" className="display h-lg">Queixas <em className="text-forest-700">comuns.</em></h2>
        <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {queixas.map(([t, d]) => <div key={t} data-rv="fade" className="bg-ivory p-8"><h3 className="font-serif text-3xl">{t}</h3><p className="mt-3 text-ink/75">{d}</p></div>)}
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div><h2 className="font-serif text-3xl">Como é a consulta</h2><p className="lead mt-4 text-ink/80">Conversa sobre histórico e rotina, exame da pele e, quando necessário, exames complementares. Você sai com um plano explicado. {/* TODO */}</p></div>
          <div><h2 className="font-serif text-3xl">Quando procurar</h2><p className="lead mt-4 text-ink/80">Sempre que algo na pele mudar, incomodar ou persistir. Pintas que mudam de cor, tamanho ou formato pedem avaliação o quanto antes.</p></div>
        </div>
      </section>
      <CTAMobile label="Agendar consulta" tipo="consulta" />
    </Shell>
  );
}
