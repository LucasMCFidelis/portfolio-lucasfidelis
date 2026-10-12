# Portfólio Lucas Fidelis — Guia do Projeto

Portfólio pessoal de Lucas Fidelis (Desenvolvedor Front-end e QA). Todo o conteúdo (projetos, skills, experiências, redes sociais, textos "sobre mim") vem de um banco PostgreSQL; o código só renderiza. Idioma da UI, dos commits de conteúdo e dos textos: **pt-BR**.

## Stack

| Área | Tecnologia |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 |
| Linguagem | TypeScript 5.7 (`strict: false` hoje — ver "Pontos de atenção") |
| Estilo | Tailwind CSS v4 (`@import "tailwindcss"` em `src/app/index.css`, sem `tailwind.config`) + `tailwindcss-animate` / `tw-animate-css` |
| UI | shadcn/ui (estilo `new-york`, base `zinc`) sobre Radix UI; ícones via `@mui/icons-material` (wrapper `Icon`) |
| Banco | PostgreSQL + Drizzle ORM (`drizzle-orm/node-postgres`) |
| Formulários | react-hook-form + zod (`@hookform/resolvers`) |
| E-mail | nodemailer em Server Action |
| Feedback | react-toastify |
| Lint | ESLint 9 flat config (`next/core-web-vitals`, `next/typescript`) + `simple-import-sort` |

## Comandos

```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # next lint (imports fora de ordem são ERRO)
npx drizzle-kit generate   # gera migration em ./drizzle a partir de src/db/schema.ts
npx drizzle-kit push       # aplica o schema direto no banco
```

Não há suíte de testes configurada.

### Variáveis de ambiente (`.env`, ignorado pelo git — nunca commitar)

- `DATABASE_URL` — usada por `src/db/index.ts` e `drizzle.config.ts`
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS` — SMTP usado em `src/actions/sendEmail.ts`

## Estrutura de pastas

```
src/
├── app/                      # Rotas (App Router)
│   ├── layout.tsx            # Layout raiz: ThemeProvider > Header + {children} + Separator + SectionContact
│   ├── index.css             # Tailwind, tokens CSS (oklch) claro/escuro, fontes
│   ├── (home)/               # Route group → "/"
│   │   ├── page.tsx
│   │   └── components/       # Componentes exclusivos da rota (ActionsHomeCard)
│   ├── about/                # "/about" (page.tsx + components/DownloadResumeButton)
│   └── projects/             # "/projects"
├── actions/                  # Server Actions ("use server") — ex.: sendEmail
├── assets/                   # Imagens importadas estaticamente (svg, etc.)
├── components/
│   ├── ui/                   # Primitivos shadcn/ui (gerados pelo CLI — editar com cuidado)
│   ├── sections/             # Seções de página (SectionProjects, SectionSkills, SectionExperience, SectionContact)
│   ├── ProjectCard/          # Card de projeto dividido em Wrapper / Carousel / TextArea
│   ├── SkillCard/            # Card de skill dividido em Wrapper / Button / Content
│   ├── ExperienceCard/
│   └── *.tsx                 # Componentes compartilhados (Header, SectionWrapper, IconWrapper, FormContact, ThemeToggle, SocialMediasButtons)
├── data/                     # Camada de acesso a dados (server-only na prática)
│   └── <dominio>/            # projects, skills, experiences, socialMedias, globalContent, images
│       ├── get*.ts           # Funções de consulta (Drizzle)
│       ├── *DTO.ts           # Tipos de saída consumidos pela UI
│       └── map*.ts           # Mapeadores banco → UI
├── db/
│   ├── index.ts              # Instância `db` do Drizzle
│   └── schema.ts             # Tabelas, enums e relations
├── hooks/states/             # Hooks de estado/contexto (useThemeContext)
├── lib/utils.ts              # `cn()` (clsx + tailwind-merge) — convenção shadcn
├── providers/                # Context providers ("use client")
└── utils/                    # Funções puras e constantes (formatDate, appSections, scrollToContactSession…)
public/                       # Estáticos (icon.svg, profile.jpeg)
drizzle/                      # Migrations geradas (drizzle-kit)
```

Alias de import: `@/*` → `./src/*`. Dentro da mesma pasta de feature, imports relativos (`./`, `../`) são aceitos (ex.: `../SectionWrapper` em `sections/`); entre áreas diferentes, use `@/`.

## Arquitetura e fluxo de dados

```
Postgres ──Drizzle──▶ src/data/<dominio>/get*.ts ──▶ Server Component (page/section) ──props──▶ componentes de UI
                                                                                       └──▶ Client Component (só onde há interação)
```

1. **Schema** em `src/db/schema.ts` (tabelas `*Table`, enums `pgEnum`, `relations`). Tabelas: `global_content`, `social_medias`, `images`, `projects`, `skills`, `experiences`.
2. **Data layer** em `src/data/<dominio>/`: uma função `getX` por caso de uso, retornando um DTO/tipo próprio (nunca o row cru do banco quando a UI não precisa de tudo). A ordenação e os filtros (ex.: `visible = true`, `projectInEvidence`) ficam na query, não na UI.
3. **Páginas e seções são Server Components `async`** que chamam o data layer direto (sem API routes) e usam `Promise.all` para buscas independentes.
4. **Client Components** existem apenas para: Header (navegação/sheet), ThemeProvider/ThemeToggle, FormContact, carrosséis, botões com `onClick`/estado.
5. **Mutações** (envio de e-mail) via Server Action em `src/actions/`, chamada pelo formulário client.
6. **Navegação/seções** centralizadas em `src/utils/lists/appSections.tsx` (`id` para âncoras, `href` para rotas). Use essa constante em vez de strings soltas.
7. **Tema** (claro/escuro): classe `dark` no `<html>` controlada por `ThemeProvider`; cores via tokens CSS (`bg-background`, `text-primary`…) — não use cores hardcoded.

## Convenções do projeto

- **Componentes**: um componente por arquivo, `PascalCase.tsx`, default export para componentes de seção/card e named export para utilitários (`Icon`, `FormContact`). Props tipadas com `interface XProps`.
- **Composição**: cards complexos são quebrados em `Wrapper` + partes (ver `ProjectCard/` e `SkillCard/`) para manter o máximo possível no servidor e isolar o que precisa de `"use client"`.
- **Seções** usam `SectionWrapper` (`id` vindo de `appSections`) e o padrão `Card` do shadcn com `bg-transparent border-none`.
- **Ícones**: sempre `<Icon name="..." />`. Para um novo ícone, registre-o no mapa `ICONS` de `IconWrapper.tsx`. Ícones de redes sociais usam o `title` do banco como `IconName`.
- **Classes**: `cn()` de `@/lib/utils` para condicionais; `twMerge` já está embutido em `cn`.
- **Imports**: ordenados pelo `simple-import-sort` — rode `npx eslint --fix` se o lint reclamar. Estilos globais (`import "./index.css"`, CSS de libs) ficam no topo.
- **Metadata**: cada `page.tsx` exporta `metadata` próprio (title no formato `"<Página> - Portfólio de Lucas Fidelis"`).
- **IDs HTML**: elementos interativos importantes têm `id` estável e `aria-label` (usados também por testes/QA) — mantenha ao criar botões/links/forms.
- **Commits**: Conventional Commits em inglês (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `perf:`). Branch de trabalho: `develop`; PRs para `main`.

### Como adicionar…

- **Uma nova entidade de conteúdo**: tabela em `schema.ts` → `drizzle-kit generate/push` → pasta `src/data/<dominio>/` com DTO + `get*` → Server Component de seção em `components/sections/`.
- **Um componente shadcn**: `npx shadcn@latest add <componente>` (config em `components.json`; vai para `src/components/ui`).
- **Uma nova página**: pasta em `src/app/<rota>/page.tsx` + `metadata`; componentes só dela em `src/app/<rota>/components/`; registre em `appSections` se entrar no menu.

---

## Boas práticas — Next.js (App Router)

1. **Server Components por padrão.** Só adicione `"use client"` quando precisar de estado, efeitos, eventos ou APIs de browser — e o mais baixo possível na árvore (extraia o trecho interativo em um componente pequeno, como foi feito em `ProjectCard/` e `ActionsHomeCard`).
2. **Busque dados no servidor**, direto no Server Component ou no data layer. Evite `useEffect` + `fetch` para dados que o servidor já pode entregar.
3. **Paralelize** buscas independentes com `Promise.all` / `Promise.allSettled` (já usado em Home, Skills e Experiences) para evitar waterfalls. Use `allSettled` quando uma falha não deve derrubar a página inteira.
4. **Deduplique com `React.cache`** funções chamadas em vários componentes da mesma requisição (padrão já usado em `getGlobalContent` e `getAllSocialMedias`).
5. **Cache/revalidação conscientes.** Páginas que leem do banco sem APIs dinâmicas podem ser pré-renderizadas no build; se o conteúdo muda no banco, defina a estratégia explicitamente (`export const revalidate = N`, `revalidatePath/revalidateTag` ou `dynamic = "force-dynamic"`) em vez de deixar implícita.
6. **Server Actions**: sempre valide a entrada **no servidor** (zod) — a validação do client não protege nada; retorne resultados serializáveis; não vaze mensagens internas de erro; mantenha segredos apenas em `process.env` do servidor (nunca `NEXT_PUBLIC_*` para credenciais).
7. **Server-only**: módulos que tocam o banco (`src/db`, `src/data`) nunca devem ser importados por Client Components. Considere `import "server-only"` nesses módulos para o build falhar se isso acontecer.
8. **`next/image`** para imagens (sempre com `alt`, `fill`/`width`+`height` e `sizes` quando `fill`); novos domínios remotos precisam entrar em `images.remotePatterns` no `next.config.ts`. Use `priority` na imagem LCP (foto da home).
9. **`next/link` e `useRouter`**: `Link` para navegação declarativa (melhor para SEO/prefetch); `router.push` só quando houver lógica. Links externos: `target="_blank"` + `rel="noopener noreferrer"`.
10. **Metadata API** em todas as páginas (`metadata` ou `generateMetadata`) com `title` e `description` únicos; considere `openGraph` e `metadataBase`.
11. **Fontes**: prefira `next/font` (self-host, sem layout shift) em vez de `@import url(fonts.googleapis…)` no CSS.
12. **Segmentos especiais**: adicione `loading.tsx`, `error.tsx` e `not-found.tsx` para estados de carregamento/erro por rota, em vez de mensagens fixas como "Carregando…" dentro de um Server Component.
13. **Route groups** `(nome)` organizam sem afetar a URL; `components/` dentro de uma rota é colocation privada — nada ali vira rota (só `page`/`route` viram).
14. **Variáveis de ambiente**: validar presença no boot (ex.: lançar erro claro se `DATABASE_URL` faltar) e nunca commitar `.env`.
15. **Acessibilidade e SEO**: um único `<h1>` por página, hierarquia de headings correta, `lang="pt-BR"` no `<html>`, `aria-label` em botões só com ícone.

## Boas práticas — React

1. **Componentes puros e pequenos**: uma responsabilidade por componente; extraia quando houver JSX repetido ou lógica distinta (como `Wrapper` + conteúdo nos cards).
2. **Props tipadas e mínimas**: passe só o que o componente usa (`Omit<SkillDTO, "typeSkill">` é um bom exemplo); prefira dados primitivos/DTOs a objetos de banco.
3. **`key` estável**: use o `id` do item, não o índice do array, em listas que podem mudar/reordenar. (Hoje vários `.map` usam `index` — prefira `id` ou um campo único.)
4. **Estado**: mantenha o menor estado possível e derive o resto durante o render; não duplique em `useState` o que pode ser calculado. Levante o estado só até o ancestral comum.
5. **`useEffect` só para sincronizar com sistemas externos** (DOM, localStorage, subscriptions). Não use para derivar estado nem para tratar eventos; sempre limpe timers/listeners no retorno (ex.: o `setTimeout` de `DownloadResumeButton` deveria ser limpo no unmount).
6. **Eventos**: handlers com nome `handleX`/`onX`; evite criar lógica pesada inline no JSX.
7. **Context**: use para dados realmente globais (tema). Memoize o `value` do Provider (`useMemo`) para não re-renderizar todos os consumidores; exponha via hook dedicado (`useThemeContext`) que valida a presença do Provider — para isso funcionar, o `createContext` deve ter default `undefined`, não `{}`.
8. **Memoização com critério**: `memo`, `useMemo` e `useCallback` apenas quando houver custo medido ou identidade de referência importando (ex.: `Header`, `SectionContact`). Não envolva tudo por padrão.
9. **Formulários**: react-hook-form + zod; defina o schema fora do componente; tipos via `z.infer`; desabilite o submit durante o envio e trate erro/sucesso com feedback ao usuário (padrão do `FormContact`).
10. **Acessibilidade**: elementos semânticos (`section`, `article`, `nav`, `header`), `label` associado a inputs, `alt` descritivo (ou `alt=""` para decorativas), foco visível, contraste suficiente nos dois temas.
11. **Evite `dangerouslySetInnerHTML`**. Se for inevitável (hoje em `about/page.tsx` com `aboutLargeDescription`), o conteúdo precisa ser confiável ou sanitizado.
12. **Composição > configuração**: prefira `children`/slots (`skillButtonElement`, `skillCardContentElement`) a dezenas de props booleanas.
13. **TypeScript**: tipos explícitos nas fronteiras (props, retorno de `get*`, DTOs); evite `any`; use unions literais para variantes (`"hard" | "soft"`). Reaproveite tipos inferidos do Drizzle (`typeof table.$inferSelect`) em vez de duplicar manualmente.
14. **Tratamento de erros**: nunca deixe uma função de data layer retornar `undefined` silenciosamente após `catch`; ou propague o erro (para `error.tsx`) ou retorne um valor padrão tipado (ex.: `[]`).

---

## Pontos de atenção conhecidos (dívida técnica observada)

Itens encontrados na análise do código. Não são regras — são candidatos a melhoria; corrija-os ao mexer nas áreas relacionadas.

- `tsconfig.json` tem `"strict": false`; vários trechos dependem disso (ex.: `getInEvidenceProjects` pode retornar `undefined` no `catch`; `getGlobalContent` acessa `allGlobalContent.fileResumeId` após usar `?.`; `ExperienceCard` indexa `typeLabels[type]` com `type` possivelmente `undefined`). Ativar `strict` gradualmente.
- `ThemeProvider` inicia em `isDarkMode=false` e **escreve** no `localStorage`, mas nunca o lê nem respeita `prefers-color-scheme` → o tema não persiste e pode haver flash. Ler a preferência na inicialização (e idealmente aplicar a classe `dark` via script inline para evitar FOUC). O `createContext({} as ...)` também torna a checagem em `useThemeContext` inútil.
- `package.json`: `"lint": "next lint"` (descontinuado em versões futuras do Next — migrar para `eslint .`); `@tailwindcss/vite` é resquício da migração Vite → Next e pode ser removido; `"type": "module"` e `"version": "0.0.0"` também vêm do template Vite.
- `@import url(fonts.googleapis…)` em `index.css` → migrar para `next/font`.
- `src/utils/checkExperienceType.ts` está 100% comentado (código morto) — remover ou reativar.
- `getAcademicExperiences.ts` e `mapAcademicType.ts` têm import circular (tipo importado de volta); mover `AcademicExperienceType` para um arquivo de tipos/DTO como nos outros domínios (`*DTO.ts`). `mapAcademicType` também mapeia qualquer valor ≠ `"bootcamp"` para `"academic"`, enquanto o enum do banco usa `degree`/`bootcamp`.
- `SectionExperiencies`/`SectionExperience`: mostra "Carregando formação..." quando a lista está vazia (inclusive em erro) — mensagem enganosa para um Server Component; usar estado vazio/`loading.tsx`.
- `.map` com `key={index}` em Skills, Experiences e badges.
- `SectionWrapper.tsx` e `ThemeProvider.tsx` estão com formatação fora do padrão (indentação/aspas) — rodar Prettier se for adotado.
- Dados de contato (`fidelis.lucasm@gmail.com`) estão hardcoded em `SectionContact`; considerar mover para o banco/`global_content` junto das demais informações.
- `sendEmail` não valida a entrada no servidor e recebe 4 argumentos posicionais; preferir um objeto validado com o mesmo schema zod do formulário (compartilhado).
