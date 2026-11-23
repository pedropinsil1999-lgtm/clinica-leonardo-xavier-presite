# Decisões de projeto

## Etapa 0 · Instagram (Plano B acionado)
- O ambiente de build bloqueia `instagram.com` e `bit.ly` na rede (proxy 403). Não foi possível baixar fotos, vídeos, a foto de perfil nem resolver o link da bio.
- Consequências: sem contact sheet; logo recriado à mão (aproximação, `Logo.tsx`); tokens de cor mantidos como no briefing (sem amostragem real); WhatsApp de destino = (24) 99248-2326 do Google Maps, **a confirmar** com o link da bio.
- No lugar das fotos: arte procedural "Skin Flow" (curvas de nível na paleta da marca, `scripts/arte.py`). É honesta (não finge ser foto da clínica), coerente com a assinatura visual e fácil de trocar: mesmos nomes de arquivo em `public/midia/arte/`.
- Galeria "A clínica" exibe a etiqueta "Foto do espaço · em produção" para não induzir o cliente a achar que aquilo é o espaço.

## Recorte do Dr. Leonardo
- Recebido com fundo transparente (1526x2000). Bordas conferidas sobre forest-950 e ivory: sem halo, sem necessidade de erosão.
- Saída: 640/960/1400 em AVIF + WebP com alfa, `<picture>` com `fetchpriority="high"`, preload e `width/height` (CLS 0,002).
- Entrada: o recorte **não** usa clip-path de revelação, porque esconder o elemento de LCP adiaria a métrica. Ele "acorda" de blur + escala sob o preloader. A revelação por máscara ficou na palavra XAVIER e na headline.

## Fundo Skin Flow
- WebGL2 puro (sem OGL), fragment shader com simplex 3D + fbm, isolinhas com `fwidth` (antialias), deformação de "pressão" no cursor, onda no toque, eixo z ligado ao scroll.
- 0,75x da resolução, DPR máx. 1,75, só desenha visível (IntersectionObserver), pausa com aba oculta, teto de 45 fps se o frame médio passar de 24 ms. Fallback canvas 2D.
- Performance: desenha 1 quadro estático em idle e **só anima após a primeira interação** (mouse, toque, scroll, tecla). Isso cortou o TBT de laboratório de ~4 s para ~0,8 s.
- Na seção Tecnologia, a "moldura de vídeo" usa uma segunda instância do shader (macro de pele viva) até chegar um vídeo real sem marca.

## Componentes
- Botão magnético, cursor, marquee, accordion, sheet do assistente e cards com spotlight foram escritos do zero (padrões típicos do 21st.dev, mas sem dependência e já na identidade). Motivo: menos JS na dobra e nenhum "cheiro" de componente padrão. shadcn/ui não foi instalado pelo mesmo motivo.

## Assistente de agendamento (por que existe)
- Hoje o link da bio abre um WhatsApp em branco: a recepção gasta 6 a 8 mensagens para descobrir tipo de atendimento, queixa, se é primeira vez e horário. O assistente coleta isso em ~1 minuto e entrega uma mensagem padronizada e escaneável.
- Benefícios: menos tempo por lead, menos desistência, agenda separada por tipo, métricas do que as pessoas procuram.
- LGPD: só categorias (sem texto livre), nada vai para servidor, saída pelo WhatsApp por ação da pessoa. Progresso em sessionStorage (com try/catch), apagado ao enviar.
- Eventos: `assistente_aberto`, `assistente_passo`, `assistente_concluido`, `whatsapp_clique`, sem nome/telefone; desligados no modo pré-site.
- Fase 2: o ponto de extensão `submitLead()` está marcado em `Assistente.tsx > enviar()`; ligar Cal.com/Google Agenda ali sem mudar a interface.
- "Pinta ou lesão que mudou" mostra aviso e marca "O quanto antes" (texto a validar).

## Conformidade CFM (Res. 2.336/2023)
- Rodapé e Sobre: nome, MÉDICO, CRM, RQE, diretor técnico (campos TODO).
- Nenhuma marca de produto/equipamento no site; tratamentos descritos por função.
- Sem promessa, sem superlativos, sem antes e depois (`mostrarAntesDepois: false`), sem valores (`mostrarValores: false`).
- Avaliações: **não inventamos depoimentos**. A seção mostra nota e total reais com link para o Google; o marquee duplo liga com `mostrarAvaliacoes: true` quando a clínica enviar trechos.
- Aviso médico no rodapé e em Termos.

## UX preservada
- Dois caminhos desde o início (Duas portas = primeiro filtro do assistente).
- Um único verbo ("Agendar") e um único funil, de qualquer lugar (header, hero, portas, flutuante, páginas internas, deep link).
- Prova social perto do CTA; autoridade antes de beleza.
- Transparência: primeira consulta em 4 passos, riscos em cada tratamento.
- Fundo animado só em seções escuras, com opacidade reduzida atrás do texto. O recorte do médico se move no máximo ±10 px.
- Só uma seção pinada (Tratamentos, desktop ≥ 900 px).

## Fora do escopo desta entrega (anotado)
- Transição Flip card → página interna (há a cortina com monograma, sem o Flip da imagem).
- Vídeos do "Aprenda" (cards temáticos com link para o perfil até ter os reels).
- Vetorização do logo oficial (depende da foto de perfil).
