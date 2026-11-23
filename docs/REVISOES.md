# Loop de revisão

Notas pelo critério Awwwards (Design 40% · Usabilidade 30% · Criatividade 20% · Conteúdo 10%). Screenshots com Playwright em 1440 e 390 px; Lighthouse 12 mobile (simulação 4G + CPU 4x) servindo o `out/` localmente sem CDN.

## Rodada 1
Notas: Design 7 · Usabilidade 6 · Criatividade 8 · Conteúdo 6
Piores problemas:
1. "XAVIER" passava atrás da headline e poluía a leitura (desktop).
2. Eyebrow "DR. LEONARDO" colidia com o selo do Google no mobile.
3. CTA flutuante aparecia "espiando" na base da hero.
4. Arco da seção Tecnologia mostrava um retângulo branco (filho com transform escapando do border-radius).
5. Registros (CRM/RQE) colados no mobile.
Corrigido: reposicionamento e escala da palavra gigante, eyebrow só no desktop, CTA fora da tela, `isolation` + máscara no `.arch`, gap no grid.

## Rodada 2
Notas: Design 8 · Usabilidade 6 · Criatividade 8 · Conteúdo 7
Piores problemas:
1. **Bug crítico:** `.grain` (CSS fora de layer) sobrescrevia `position: absolute` do painel do assistente: abria à esquerda e sem altura total.
2. Feixe de luz da hero vazava como faixa retangular (máscara só com prefixo -webkit).
3. Galeria: reveal por clip-path apagava o formato em arco.
4. Fluxo do assistente não testado de ponta a ponta.
5. Deep link não verificado.
Corrigido: classes próprias movidas para `@layer components`, máscara padrão + prefixada, arco num wrapper interno. Fluxo testado até o `wa.me` com a mensagem exata do briefing; deep link `?agendar=1&tratamento=laser` abre no passo 2 com Laser marcado.

## Rodada 3 (Lighthouse)
Home: Performance 52 · Acessibilidade 93 · Boas práticas 100 · SEO 66 · TBT 3,99 s
Piores problemas:
1. WebGL (4 instâncias) em renderização por software dominava a thread principal.
2. Contraste: eyebrow champagne-700 sobre ivory abaixo de AA.
3. SplitText gerava `aria-label` em `<p>` (atributo proibido) e `aria-hidden` nas palavras.
4. Link do logo com `aria-label` diferente do texto visível.
5. Reveals inicializando todos na carga.
Corrigido: shader anima só após interação, champagne-700 escurecido (#75592F), `aria: "none"` no SplitText, aria-label removido, Reveals em `requestIdleCallback`.

## Rodada 4
Home: **Performance 67–68 · Acessibilidade 96 · Boas práticas 100 · SEO 66\*** · LCP 3,5 s (simulado) · CLS 0,002 · TBT 0,8 s
Página de tratamento: **Performance 80 · Acessibilidade 100 · Boas práticas 100 · SEO 66\***
LCP medido em navegador real com CPU 4x lenta (sem simulação de rede): **0,34 s**, elemento = recorte do Dr. Leonardo.
\* SEO 66 é intencional: `noindex` do modo pré-site. Sem ele, a única falha some (meta, títulos, sitemap, robots e hierarquia passam).
A11y restante: as palavras do Manifesto começam em 15% de opacidade (efeito de "acender" no scroll); o Lighthouse lê o estado inicial.

Notas finais: Design 8 · Usabilidade 8 · Criatividade 8 · Conteúdo 7

**Alvos não atingidos (honesto):** Performance mobile 90+ e LCP simulado < 2,5 s. O gargalo é o JS da dobra (~175 kB: Next + React + GSAP) sob a simulação de 4G do Lighthouse. Próximos passos: carregar SplitText/ScrollTrigger sob demanda, separar o Assistente em `dynamic()` e medir em produção no Netlify (CDN + Brotli costumam render 10 a 20 pontos). Conteúdo fica em 7 até entrarem fotos e vídeos reais.
