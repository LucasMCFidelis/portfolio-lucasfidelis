# Portfólio Lucas Fidelis — Guia do Projeto

Portfólio pessoal de Lucas Fidelis (Desenvolvedor Front-end e QA). Todo o conteúdo (projetos, skills, experiências, redes sociais, textos "sobre mim") vem de um banco PostgreSQL; o código só renderiza. Idioma da UI, dos commits de conteúdo e dos textos: **pt-BR**.

## Stack

| Área | Tecnologia |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 |
| Linguagem | TypeScript 5.7 (`strict: true`, `moduleResolution: bundler`) |
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
npm run lint     # eslint . (imports fora de ordem são ERRO)
npx tsc --noEmit # checagem de tipos
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
│   ├── layout.tsx            # Layout raiz: next/font, script anti-flash do tema, ThemeProvider > Header + {children} + Separator + SectionContact
│   ├── index.css             # Tailwind, tokens CSS (oklch) claro/escuro; fontes vêm de next/font (variáveis --font-inter / --font-bebas-neue)
│   ├── (home)/               # Route group → "/"
│   │   ├── page.tsx
│   │   └── components/       # Componentes exclusivos da rota (ActionsHomeCard)
│   ├── about/                # "/about" (page.tsx + components/DownloadResumeButton)
│   └── projects/             # "/projects"
├── actions/                  # Server Actions ("use server")
│   ├── sendEmail.ts          # Mutação (e-mail)
│   └── <dominio>/get*.ts     # Consultas Drizzle expostas como actions (únicas a tocar o `db`)
├── assets/                   # Imagens importadas estaticamente (svg, etc.)
├── components/
│   ├── ui/                   # Primitivos shadcn/ui (gerados pelo CLI — editar com cuidado)
│   ├── sections/             # Seções de página (SectionProjects, SectionSkills, SectionExperience, SectionContact)
│   ├── ProjectCard/          # Card de projeto dividido em Wrapper / Carousel / TextArea
│   ├── SkillList.tsx         # Lista de skills da seção "Minhas habilidades" (badges apenas com o título)
│   ├── RelatedSkills.tsx     # Badges das skills relacionadas a uma experiência ou projeto
│   ├── ExperienceCard/
│   └── *.tsx                 # Componentes compartilhados (Header, SectionWrapper, IconWrapper, FormContact, ThemeToggle, SocialMediasButtons)
├── data/                     # Camada de acesso a dados (TanStack Query sobre as actions)
│   └── <dominio>/            # projects, skills, experiences, socialMedias, globalContent, images
│       ├── <dominio>Queries.ts # `queryOptions` (chave + queryFn → action); sem "use client", usável no servidor
│       ├── use*.ts           # Hooks `useQuery` ("use client") consumidos pelos componentes
│       ├── *DTO.ts           # Tipos de saída consumidos pela UI (também as uniões/constantes dos tipos, ex.: academicExperienceDTO.ts)
│       └── map*.ts           # Mapeadores banco → UI (usados pelas actions)
├── db/
│   ├── index.ts              # Instância `db` do Drizzle
│   └── schema.ts             # Tabelas, enums e relations
├── hooks/states/             # Hooks de estado/contexto (useThemeContext)
├── lib/
│   ├── utils.ts              # `cn()` (clsx + tailwind-merge) — convenção shadcn
│   ├── makeQueryClient.ts    # Factory do QueryClient (staleTime 5 min) — server e client
│   └── getServerQueryClient.ts # QueryClient por requisição (`React.cache`) — só servidor
├── providers/                # Context providers ("use client"): ThemeProvider, QueryProvider
└── utils/                    # Funções puras e constantes (formatDate, appSections, scrollToContactSession…)
public/                       # Estáticos (icon.svg, profile.jpeg)
drizzle/                      # Migrations geradas (drizzle-kit)
```

Alias de import: `@/*` → `./src/*`. Dentro da mesma pasta de feature, imports relativos (`./`, `../`) são aceitos (ex.: `../SectionWrapper` em `sections/`); entre áreas diferentes, use `@/`.

## Arquitetura e fluxo de dados

```
Postgres ──Drizzle──▶ src/actions/<dominio>/get*.ts ("use server")
                          ▲                      ▲
        queryFn (client)  │                      │  prefetchQuery (servidor)
 use*() / useQuery ◀──────┘                      └── page/layout: <PrefetchBoundary queries=[...]>
 (Client Components)  ◀── cache hidratado (dehydrate → HydrationBoundary) ──┘
```

1. **Schema** em `src/db/schema.ts` (tabelas `*Table`, enums `pgEnum`, `relations`). Tabelas: `global_content`, `social_medias`, `images`, `projects`, `project_repositories` (0..N repositórios por projeto, com `repository_title` opcional), `skills`, `experiences`, `experience_skills` e `project_skills` (N:N entre skills e experiências/projetos).
2. **Actions de leitura** em `src/actions/<dominio>/get*.ts`: uma função `getX` por caso de uso, retornando um DTO/tipo próprio (nunca o row cru do banco quando a UI não precisa de tudo). Ordenação e filtros (ex.: `visible = true`, `projectInEvidence`) ficam na query, não na UI. Elas **propagam erros** (não engolem com `catch`), para o React Query poder tratar/refazer a busca em vez de cachear `[]`.
3. **Data layer** em `src/data/<dominio>/`: `<dominio>Queries.ts` define `queryOptions` (chave + `queryFn` chamando a action) e `use*.ts` expõe os hooks `useQuery`. Componentes **nunca chamam a action direto** — usam o hook.
4. **Prefetch no servidor**: cada `page.tsx`/`layout.tsx` envolve o que consome dados em `<PrefetchBoundary queries={[...]}>` com os mesmos `queryOptions`. O servidor busca (via `getServerQueryClient`, um client por requisição), hidrata o cache e o HTML inicial já sai com os dados (SEO/LCP preservados). O `QueryProvider` (no `layout.tsx`) dá o cache ao browser: navegar entre páginas reaproveita dados "frescos" por 5 min (`staleTime`) sem novo request.
5. **Seções e componentes que leem dados são Client Components** (`"use client"` + hook `use*`). Páginas continuam Server Components, agora síncronos: só declaram o `PrefetchBoundary` e a composição. Ao criar um componente que precisa de dados, **prefetch a mesma query na página** — senão ele só busca depois da hidratação.
6. **Client Components** também existem para: Header (navegação/sheet), ThemeProvider/ThemeToggle, FormContact, carrosséis, botões com `onClick`/estado.
7. **Mutações** (envio de e-mail) via Server Action em `src/actions/`, chamada pelo formulário client.
8. **Navegação/seções** centralizadas em `src/utils/lists/appSections.tsx` (`id` para âncoras, `href` para rotas). Use essa constante em vez de strings soltas.
9. **Tema** (claro/escuro): classe `dark` no `<html>` controlada por `ThemeProvider`, com preferência salva em `localStorage` (`isDarkMode`) ou `prefers-color-scheme`; um script inline em `layout.tsx` aplica a classe antes da hidratação (mantenha a mesma chave nos dois lugares); cores via tokens CSS (`bg-background`, `text-primary`…) — não use cores hardcoded.

## Convenções do projeto

- **Componentes**: um componente por arquivo, `PascalCase.tsx`, default export para componentes de seção/card e named export para utilitários (`Icon`, `FormContact`). Props tipadas com `interface XProps`.
- **Composição**: cards complexos são quebrados em `Wrapper` + partes (ver `ProjectCard/`) para manter o máximo possível no servidor e isolar o que precisa de `"use client"`.
- **Seções** usam `SectionWrapper` (`id` vindo de `appSections`) e o padrão `Card` do shadcn com `bg-transparent border-none`.
- **Ícones**: sempre `<Icon name="..." />`. Para um novo ícone, registre-o no mapa `ICONS` de `IconWrapper.tsx`. Ícones de redes sociais usam o `title` do banco como `IconName`.
- **Classes**: `cn()` de `@/lib/utils` para condicionais; `twMerge` já está embutido em `cn`.
- **Imports**: ordenados pelo `simple-import-sort` — rode `npx eslint --fix` se o lint reclamar. Estilos globais (`import "./index.css"`, CSS de libs) ficam no topo.
- **Metadata**: cada `page.tsx` exporta `metadata` próprio (title no formato `"<Página> - Portfólio de Lucas Fidelis"`).
- **IDs HTML**: elementos interativos importantes têm `id` estável e `aria-label` (usados também por testes/QA) — mantenha ao criar botões/links/forms.
- **Commits**: Conventional Commits em inglês (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `perf:`). Branch de trabalho: `develop`; PRs para `main`.

### Como adicionar…

- **Uma nova entidade de conteúdo**: tabela em `schema.ts` → `drizzle-kit generate/push` → DTO em `src/data/<dominio>/` → action `get*` em `src/actions/<dominio>/` → `<dominio>Queries.ts` + hook `use*.ts` → Client Component de seção em `components/sections/` → adicione o `queryOptions` ao `PrefetchBoundary` das páginas que usam a seção.
- **Um componente shadcn**: `npx shadcn@latest add <componente>` (config em `components.json`; vai para `src/components/ui`).
- **Uma nova página**: pasta em `src/app/<rota>/page.tsx` + `metadata`; componentes só dela em `src/app/<rota>/components/`; registre em `appSections` se entrar no menu.

---

## Boas práticas — Next.js (App Router)

1. **Server Components por padrão.** Só adicione `"use client"` quando precisar de estado, efeitos, eventos ou APIs de browser — e o mais baixo possível na árvore (extraia o trecho interativo em um componente pequeno, como foi feito em `ProjectCard/` e `ActionsHomeCard`).
2. **Busque dados via hooks do data layer** (`useQuery` sobre as actions) com prefetch no servidor (`PrefetchBoundary`). Evite `useEffect` + `fetch` e não chame actions de leitura direto de componentes.
3. **Paralelize** buscas independentes: o `PrefetchBoundary` já roda a lista de queries em `Promise.all`, e hooks `useQuery` independentes no mesmo componente rodam em paralelo. Queries separadas já isolam falhas (uma falhar não derruba a outra).
4. **Deduplicação** é do React Query: mesma `queryKey` = uma única busca por requisição no servidor (`getServerQueryClient`) e por sessão no browser. Mantenha as chaves em `<dominio>Queries.ts`, nunca soltas nos componentes.
5. **Cache/revalidação conscientes.** Páginas que leem do banco sem APIs dinâmicas podem ser pré-renderizadas no build; se o conteúdo muda no banco, defina a estratégia explicitamente (`export const revalidate = N`, `revalidatePath/revalidateTag` ou `dynamic = "force-dynamic"`) em vez de deixar implícita.
6. **Server Actions**: sempre valide a entrada **no servidor** (zod) — a validação do client não protege nada; retorne resultados serializáveis; não vaze mensagens internas de erro; mantenha segredos apenas em `process.env` do servidor (nunca `NEXT_PUBLIC_*` para credenciais).
7. **Server-only**: só `src/actions/**` (e `src/db`) tocam o banco; `src/data/**` importa as actions, nunca o `db`. Client Components não devem importar `src/db`. Actions `"use server"` só podem exportar funções `async` e são endpoints públicos — retorne apenas DTOs sem dados sensíveis.
8. **`next/image`** para imagens (sempre com `alt`, `fill`/`width`+`height` e `sizes` quando `fill`); novos domínios remotos precisam entrar em `images.remotePatterns` no `next.config.ts`. Use `priority` na imagem LCP (foto da home).
9. **`next/link` e `useRouter`**: `Link` para navegação declarativa (melhor para SEO/prefetch); `router.push` só quando houver lógica. Links externos: `target="_blank"` + `rel="noopener noreferrer"`.
10. **Metadata API** em todas as páginas (`metadata` ou `generateMetadata`) com `title` e `description` únicos; considere `openGraph` e `metadataBase`.
11. **Fontes**: use `next/font` (self-host, sem layout shift), como em `layout.tsx`; as variáveis CSS são expostas ao Tailwind via `@theme inline` em `index.css`. Não use `@import url(fonts.googleapis…)`.
12. **Segmentos especiais**: adicione `loading.tsx`, `error.tsx` e `not-found.tsx` para estados de carregamento/erro por rota, em vez de mensagens fixas como "Carregando…" dentro de um Server Component.
13. **Route groups** `(nome)` organizam sem afetar a URL; `components/` dentro de uma rota é colocation privada — nada ali vira rota (só `page`/`route` viram).
14. **Variáveis de ambiente**: validar presença no boot (ex.: lançar erro claro se `DATABASE_URL` faltar) e nunca commitar `.env`.
15. **Acessibilidade e SEO**: um único `<h1>` por página, hierarquia de headings correta, `lang="pt-BR"` no `<html>`, `aria-label` em botões só com ícone.

## Boas práticas — React

1. **Componentes puros e pequenos**: uma responsabilidade por componente; extraia quando houver JSX repetido ou lógica distinta (como `Wrapper` + conteúdo nos cards).
2. **Props tipadas e mínimas**: passe só o que o componente usa (`Pick<SkillDTO, "titleSkill">` em `SkillList` é um bom exemplo); prefira dados primitivos/DTOs a objetos de banco.
3. **`key` estável**: use o `id` do item, não o índice do array, em listas que podem mudar/reordenar. Quando o item não tem `id` (ex.: skills, experiências), use um campo único como `titleSkill` ou uma chave composta.
4. **Estado**: mantenha o menor estado possível e derive o resto durante o render; não duplique em `useState` o que pode ser calculado. Levante o estado só até o ancestral comum.
5. **`useEffect` só para sincronizar com sistemas externos** (DOM, localStorage, subscriptions). Não use para derivar estado nem para tratar eventos; sempre limpe timers/listeners no retorno (ex.: o `setTimeout` de `DownloadResumeButton` deveria ser limpo no unmount).
6. **Eventos**: handlers com nome `handleX`/`onX`; evite criar lógica pesada inline no JSX.
7. **Context**: use para dados realmente globais (tema). Memoize o `value` do Provider (`useMemo`) para não re-renderizar todos os consumidores; exponha via hook dedicado (`useThemeContext`) que valida a presença do Provider — para isso funcionar, o `createContext` deve ter default `undefined`, não `{}`.
8. **Memoização com critério**: `memo`, `useMemo` e `useCallback` apenas quando houver custo medido ou identidade de referência importando (ex.: `Header`, `SectionContact`). Não envolva tudo por padrão.
9. **Formulários**: react-hook-form + zod; defina o schema fora do componente; tipos via `z.infer`; desabilite o submit durante o envio e trate erro/sucesso com feedback ao usuário (padrão do `FormContact`).
10. **Acessibilidade**: elementos semânticos (`section`, `article`, `nav`, `header`), `label` associado a inputs, `alt` descritivo (ou `alt=""` para decorativas), foco visível, contraste suficiente nos dois temas.
11. **Evite `dangerouslySetInnerHTML`**. Se for inevitável (hoje em `about/page.tsx` com `aboutLargeDescription`), o conteúdo precisa ser confiável ou sanitizado.
12. **Composição > configuração**: prefira `children`/slots (`skillButtonElement`, `skillCardContentElement`) a dezenas de props booleanas.
13. **TypeScript**: tipos explícitos nas fronteiras (props, retorno das actions `get*`, DTOs); evite `any`; use unions literais para variantes (`"hard" | "soft"`). Reaproveite tipos inferidos do Drizzle (`typeof table.$inferSelect`) em vez de duplicar manualmente.
14. **Tratamento de erros**: nunca deixe uma action/função de dados retornar `undefined` silenciosamente após `catch`; propague o erro (o React Query expõe `isError`/`error` e refaz a busca) e trate o estado de erro no componente. Valores padrão (`data = []`) ficam na camada de UI, não dentro da action — senão uma falha é cacheada como "lista vazia".

---

## Pontos de atenção conhecidos (dívida técnica observada)

Itens encontrados na análise do código. Não são regras — são candidatos a melhoria; corrija-os ao mexer nas áreas relacionadas.

- `sendEmail` não valida a entrada no servidor e recebe 4 argumentos posicionais; preferir um objeto validado com o mesmo schema zod do formulário (compartilhado). *(Decidido manter por enquanto.)*
- Dados de contato (`fidelis.lucasm@gmail.com`) estão hardcoded em `SectionContact`; considerar mover para o banco/`global_content` junto das demais informações. *(Decidido manter por enquanto — exigiria alteração de schema + migration.)*
- `package.json` ainda tem `"type": "module"` e `"version": "0.0.0"` herdados do template Vite (`"type": "module"` é necessário para o `eslint.config.js` atual em ESM — não remover sem ajustar o config).
- `ProjectCardCarousel.tsx` passa `title="Teste"` fixo para `ProjectCarouselFull` (placeholder esquecido; deveria receber o título do projeto).
- `ExperienceCard` não exibe o rótulo de tipo das experiências acadêmicas (`typeComplement` `degree`/`bootcamp` já é entregue pelo data layer, mas `typeLabels` só cobre os tipos profissionais).
