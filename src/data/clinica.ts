// Fonte única de dados da clínica. Tudo marcado TODO precisa de confirmação.
export const PRESITE = process.env.NEXT_PUBLIC_PRESITE !== "false";

export const clinica = {
  nome: "Clínica Dr. Leonardo Xavier",
  marca: "Dermatologia e Estética",
  medico: "Dr. Leonardo Xavier",
  crm: "CRM-RJ [TODO]", // TODO: número do CRM
  rqe: "RQE [TODO]", // TODO: RQE de Dermatologia (se registrado)
  formacao: "[TODO] formação e títulos", // TODO
  diretorTecnico: "[TODO] nome · CRM · RQE", // TODO: diretor técnico-médico (PJ)
  anos: 10,
  google: { nota: "5,0", avaliacoes: 166, url: "https://www.google.com/maps/search/?api=1&query=Dr.+Leonardo+Xavier+Resende" },
  endereco: {
    linha1: "Av. Marcílio Dias, 563, sala 602",
    cidade: "Resende/RJ",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Marc%C3%ADlio+Dias%2C+563%2C+Resende+RJ",
    embed: "https://www.google.com/maps?q=Av.+Marc%C3%ADlio+Dias,+563,+Resende+-+RJ&output=embed",
  },
  telefone: "(24) 99248-2326",
  whatsapp: "5524992482326", // TODO: confirmar resolvendo bit.ly/37DVv7Z (bloqueado no ambiente de build)
  instagram: { user: "@dr.leonardoxavier", url: "https://www.instagram.com/dr.leonardoxavier/" },
  // TODO: horários reais. Formato: dia da semana (0=dom) -> [abre, fecha] em horas decimais
  horarios: { 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18] } as Record<number, [number, number]>,
  horariosTexto: "Seg a sex, 8h às 18h [TODO]",
  atendeConvenio: undefined as boolean | undefined, // TODO: define se o passo "pagamento" aparece
  equipe: "[TODO] nome e função da profissional que aparece nos posts",
  flags: { mostrarAntesDepois: false, mostrarValores: false, mostrarAvaliacoes: false },
  avaliacoes: [] as { nome: string; texto: string }[], // TODO: trechos reais do Google, com autorização
  aviso:
    "As informações deste site têm caráter informativo e não substituem consulta médica. Todo procedimento tem indicações, riscos e contraindicações avaliados individualmente.",
};

export function dentroDoHorario(d = new Date()) {
  const sp = new Date(d.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const h = clinica.horarios[sp.getDay()];
  const hora = sp.getHours() + sp.getMinutes() / 60;
  return !!h && hora >= h[0] && hora < h[1];
}
export function proximaAbertura() {
  const first = Object.values(clinica.horarios)[0];
  return first ? `${first[0]}h` : "8h";
}
