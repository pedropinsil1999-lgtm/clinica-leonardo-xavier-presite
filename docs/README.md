# Clínica Dr. Leonardo Xavier · pré-site

Next.js 15 (App Router) + TypeScript + Tailwind v4 + GSAP (ScrollTrigger, SplitText) + Lenis. Export estático para Netlify.

## Rodar
```
cd site
npm install
npm run dev        # http://localhost:3000
npm run build      # gera ./out (site estático)
```
Laboratório do fundo interativo: `/lab/skin-flow`.

## Editar dados
- `site/src/data/clinica.ts`: contato, WhatsApp, horários, CRM/RQE, diretor técnico, convênio, flags (`mostrarAntesDepois`, `mostrarValores`, `mostrarAvaliacoes`) e avaliações.
- `site/src/data/tratamentos.ts`: gera os cards da home e as páginas `/tratamentos/[slug]`.

## Modo pré-site
`NEXT_PUBLIC_PRESITE=true` (padrão; em `.env.local` e `netlify.toml`): `noindex, nofollow`, `robots.txt` bloqueando tudo, analytics e schema.org desligados.
Para lançar: troque para `false`, defina o domínio em `layout.tsx`, `sitemap.ts` e `robots.ts`, e adicione GA4/Meta Pixel (os eventos já chamam `gtag`/`fbq` se existirem).

## Publicar no Netlify
1. Suba a pasta `site/` para um repositório (ou arraste a pasta `out/` em app.netlify.com/drop).
2. Com repositório: o `netlify.toml` já define `npm run build` e a pasta `out`.

## Deep link do assistente
`/?agendar=1&tipo=consulta|avaliacao&tratamento=<slug>&utm_source=instagram&utm_medium=bio`

## Trocar o link da bio do Instagram
1. Publique o site e copie a URL final, ex.: `https://SEU-DOMINIO/?agendar=1&utm_source=instagram&utm_medium=bio`.
2. No app do Instagram: Perfil > Editar perfil > Links > editar o link atual (bit.ly/37DVv7Z).
3. Cole a nova URL e salve. Teste no celular: o assistente deve abrir sozinho.
4. Opcional: nos Destaques "Procedimentos", use links com `&tratamento=<slug>`.
