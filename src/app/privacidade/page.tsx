import type { Metadata } from "next";
import { Shell } from "@/components/Interna";
import { clinica } from "@/data/clinica";
export const metadata: Metadata = { title: "Privacidade e LGPD", description: "Como a Clínica Dr. Leonardo Xavier trata seus dados." };
export default function Page() {
  return (
    <Shell>
      <section data-theme="light" className="sec-r bg-ivory px-5 pb-24 pt-36 text-ink md:px-[6vw] md:pt-44">
        <div className="mx-auto max-w-3xl space-y-6 text-ink/85">
          <h1 className="display h-lg text-ink">Privacidade e <em className="text-forest-700">LGPD</em></h1>
          <p className="text-sm text-ink/70">[TODO jurídico] Texto-base. Revisar com assessoria antes de publicar.</p>
          <h2 className="font-serif text-2xl text-ink">O assistente de agendamento</h2>
          <p>O assistente funciona inteiramente no seu navegador. Nenhuma resposta é guardada em servidor deste site. As informações saem apenas quando você toca em &quot;Enviar pelo WhatsApp&quot;, por sua própria ação, e chegam à clínica pelo WhatsApp.</p>
          <p>Usamos categorias genéricas (por exemplo, &quot;manchas na pele&quot;), sem campo de texto livre, para reduzir o envio de dados de saúde. O progresso fica salvo temporariamente na sessão do seu navegador e é apagado ao enviar ou ao fechar a aba.</p>
          <h2 className="font-serif text-2xl text-ink">Métricas</h2>
          <p>Quando ativadas, as métricas de uso registram apenas a etapa do assistente e a categoria escolhida, nunca nome ou telefone.</p>
          <h2 className="font-serif text-2xl text-ink">Seus direitos</h2>
          <p>Você pode pedir acesso, correção ou exclusão dos seus dados pelo WhatsApp {clinica.telefone}. Controlador: {clinica.nome} [TODO: razão social e CNPJ].</p>
          <h2 id="termos" className="font-serif text-2xl text-ink">Termos de uso</h2>
          <p>{clinica.aviso}</p>
        </div>
      </section>
    </Shell>
  );
}
