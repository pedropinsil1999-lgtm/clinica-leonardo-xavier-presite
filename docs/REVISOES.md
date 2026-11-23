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

## Rodada 5: refatoração de performance (feedback do cliente: "travado", frase cortada, cantos quadrados)
Causas: shader WebGL contínuo, Lenis (scroll sequestrado), granulado com `mix-blend-mode` + feTurbulence, `blur(120px)`, `filter` no iframe do mapa, máscaras do SplitText (cortavam o "g" e o "ç" da headline), ScrollTrigger com pin e muitos scrubs, preloader atrasando tudo, máscara + parallax na foto.
Feito:
- Removidos GSAP, Lenis, WebGL, cursor customizado, preloader e transição de página. Movimento agora é só CSS (`opacity`/`transform`) + IntersectionObserver. Scroll nativo.
- Fundo Skin Flow virou textura estática (`fundo-escuro.webp`, 10 kB). Brilho que segue o cursor só em desktop com mouse (1 transform por quadro).
- Foto da hero: dimensão explícita, sem máscara, sem filtro, sem animação, `sizes` por altura; no celular carrega a versão 960w.
- Mapa só carrega ao clicar. Tratamentos e galeria em carrossel nativo com snap (sem pin). Assistente carregado sob demanda (`dynamic`).
- Imagens com variantes 480w. Fontes reduzidas (Cormorant 300/400 + itálico 400, Hanken variável).
- Cantos arredondados em cards, chips, inputs, painel do assistente, FAQ e seções empilhadas.
- Headline: sem máscara, `line-height` 1.06, padding no itálico.
Resultados: JS da home 175 → 122 kB. Lighthouse mobile: Performance 89–93 (antes 67), Acessibilidade 96, Boas práticas 100, TBT 80–210 ms (antes 800–4000), CLS 0, Speed Index 0,8 s. Rolagem completa com CPU 6x mais lenta: 60 fps, 0 quadros lentos.

## Rodada 6: feedback "falta um tchan"
- Fundo: a textura estática (baixa qualidade) deu lugar a 2 camadas SVG **vetoriais** de curvas de nível, movidas em sentidos opostos por CSS (`transform`, camada composta, sem repintura). Nítido em qualquer densidade de pixels.
- Hero enxuta: título com sublinhado desenhado, 1 botão; prova social e "+10 anos" viraram chips flutuantes sobre a foto. Seal, parágrafo e link secundário removidos da hero.
- Navbar com fundo sólido (verde na seção escura, marfim na clara) após 24 px de scroll.
- Fotos de banco alocadas por sentido (portas, 7 tratamentos, tecnologia, galeria ilustrativa, "aprenda"), com parallax por scroll em CSS puro (`animation-timeline: view()`).
- "Sem surpresas" virou stepper interativo: etapas tocáveis, cartão "Você / A gente", avanço automático com barra de progresso (só visível e sem interação), swipe no celular, botões anterior/próximo e CTA.
- Carrossel de tratamentos com barra de progresso de rolagem.
Resultado: Lighthouse celular Performance 91, A11y 96, Boas práticas 100, CLS 0, TBT 190 ms; rolagem a 60 fps com CPU 6x mais lenta.

## Rodada 7: hero "noite granulada"
- Hero: removidas as curvas de nível (continuam nas outras seções escuras). Novo fundo: gradiente verde-noite + 2 brilhos (jade e champagne) à deriva + 2 camadas de estrelas que cintilam (opacity) + vinheta + grão neutro (PNG 30 kB).
- Interativo: brilhos se deslocam com o ponteiro (mouse) ou toque (variáveis CSS `--mx/--my`, 1 atualização por quadro) e um halo quente segue o cursor.
- Hero mais limpa: só título + botão + chip da nota 5,0. Removidos "XAVIER" gigante, eyebrow e chip "+10 anos".
- Medição (celular simulado, CPU 6x mais lenta, hero parada): 16,7 ms/quadro com e sem animação.

## Rodada 8: hero no estilo da referência (clara, arco, cartão-pílula)
- Hero clara e quente (marfim + brilho champagne + grão fino), texto à esquerda, 3 números em linha (+10 anos, 5,0★, 166 avaliações), cartão-pílula "Por onde começar?" que abre o assistente, e o Dr. Leonardo num arco verde-floresta com moldura champagne.
- Seção seguinte (faixa de especialidades) virou escura com cantos arredondados, para contrastar com a hero clara.
- Header começa em tema claro; logo menor em telas pequenas.
- A "noite granulada" ficou no CSS (`.hero-night`), sem uso no momento.

## Rodada 9: correção da hero (fidelidade à referência)
Erros corrigidos: (1) a foto estava recortada DENTRO do arco (cabeça cortada) quando, na referência, o arco é só fundo e a pessoa fica por cima, centralizada; (2) o título invadia o arco em telas largas.
- Arco agora é uma camada de fundo; a foto é uma camada separada, sem `overflow:hidden`, centralizada, com a cabeça no topo do arco.
- Grid `1fr + auto` impede o texto de invadir a foto; título com `clamp(2.6rem, 4.6vw, 5rem)`.
- Verificado por medição (getBoundingClientRect) em 1868, 1440, 1280, 1024, 768, 390 e 360 px: sem sobreposição e sem scroll horizontal.
