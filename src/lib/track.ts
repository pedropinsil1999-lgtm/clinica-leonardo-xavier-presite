import { PRESITE } from "@/data/clinica";
// Eventos sem dado pessoal: apenas origem, passo, tipo e categoria. Nunca nome ou telefone.
type Ev = "assistente_aberto" | "assistente_passo" | "assistente_concluido" | "whatsapp_clique";
export function track(ev: Ev, params: Record<string, string | number> = {}) {
  if (PRESITE || typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
  w.gtag?.("event", ev, params);
  w.fbq?.("trackCustom", ev, params);
}
