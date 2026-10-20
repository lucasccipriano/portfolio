# Portfólio — Lucas Cipriano

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · PT-BR + EN

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # versão de produção
```

Defina o domínio final em `.env.local` (usado em canonical, sitemap, Open Graph e JSON-LD):

```
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

## Onde mexer no conteúdo

| O quê | Arquivo |
| --- | --- |
| Nome, cargo, e-mail, redes, CV, descrição (JSON-LD e meta) | `src/content/profile.ts` |
| Projetos (cards e páginas `/work/[slug]`) | `src/content/projects.ts` |
| Depoimentos | `src/content/testimonials.ts` |
| Imagens do hero e fotos do About (com `alt`) | `src/content/media.ts` |
| Textos da interface PT/EN | `src/i18n/dictionaries.ts` |
| Tokens (cores, tipografia, espaços) | `src/app/globals.css` |

Procure por `TODO(Lucas)` para ver o que ainda falta preencher.

## Idioma por localização

`src/proxy.ts` decide o idioma de quem acessa `/` (ou qualquer caminho sem idioma):

1. Escolha manual salva (seletor PT / EN do header, cookie `NEXT_LOCALE`, 1 ano)
2. País informado pela hospedagem: Brasil → `/pt-br`, resto → `/en` (Vercel: `x-vercel-ip-country`; Cloudflare: `cf-ipcountry`)
3. Sem país (ex.: local): idioma do navegador
4. Padrão: inglês

`/pt-br` e `/en` nunca redirecionam, para que Google e IAs indexem as duas versões (ligadas por `hreflang`; `x-default` = raiz).

## Arquivos que faltam

- `public/fonts/Satoshi-Variable.woff2` — baixe em fontshare.com/fonts/satoshi (licença gratuita ITF FFL)
- `public/images/**` — imagens exportadas do Figma (nomes em `src/content/*.ts`)
- `public/images/brand/obrigado.svg` e `public/images/brand/globo.svg`
- `public/cv/lucas-cipriano-cv.pdf`

## Checklist antes de publicar

- [ ] Google Search Console e Bing Webmaster Tools: cadastrar o site e enviar `/sitemap.xml`
- [ ] Validar o JSON-LD no Rich Results Test e no validator.schema.org
- [ ] Conferir em `robots.ts` a decisão sobre bots de treinamento (hoje permitidos)
- [ ] Garantir que o firewall/anti-bot da hospedagem não bloqueia os bots de IA
- [ ] Lighthouse (Performance, Acessibilidade, SEO) com as imagens reais
