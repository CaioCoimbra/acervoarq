# TASK.md — Execução do MVP AcervoARQ (Retrofit TDD + CRUD + Login)

> **Instrução para agente de IA**: este documento define escopo, ordem de execução, metodologia e critérios de aceite. Não execute nada fora dele. Ao final de cada bloco, rode os comandos de verificação indicados e só avance se todos passarem.

## Contexto do domínio (validado contra o código — commit d6daf43)

A entidade central é o **Post/Projeto** de acervo. Campos validados no formulário de criação (`src/pages/admin/post.tsx`) e na página de detalhe (`src/pages/post/[id].tsx`):

- `nome` — "Nome do Projeto"
- `autores` — créditos ("Dê os devidos créditos")
- `dataConclusao` — "Data de Conclusão"
- `localizacao` — endereço (ex.: "Av. Coronel Colares Moreira, 443A — São Luís - MA")
- `categoria` — ex.: "Universidade"
- `area` — área construída, opcional no formulário e exibida na página de detalhe
- `descricaoResumida` — texto curto de apresentação usado na home (o tooltip do formulário explica seu papel)
- `descricao` — texto longo exibido na página de detalhe
- `imagens` — URLs das imagens, uma por linha; a galeria aceita várias e mantém o fallback quando vazio
- `authorId` — usuário criador (novo; requisito de posse/RF13)

Páginas existentes: `/` (feed), `/post/[id]` (detalhe), `/admin/login`, `/admin/register`, `/admin/post` (criação) e `/admin/post/[id]` (edição). `TextoExplicativo.tsx` é um componente informativo com imagem do repositório — **caracterizar como está, não modificar**.

## Regras de execução (obrigatórias)

1. **Ordem rígida**: Fase A primeiro; nenhuma funcionalidade nova antes dela estar concluída e verde.
2. **TDD na íntegra**:
   - **Fase A**: testes de caracterização — capturam o comportamento ATUAL sem modificar código; se falharem, o erro é do teste.
   - **Fases B+**: TDD clássico Red → Green → Refactor.
3. **MVP**: mínimo utilizável; ignorar estritamente "Fora do escopo".
4. **Um item por vez**; `npm test` após cada; commit por item (`test: ...` / `feat: ...`).
5. **Convenções**: Next.js Pages Router + TypeScript (tipagem explícita obrigatória — o projeto compila estrito) + Tailwind (reutilizar classes existentes) + Prisma/SQLite + Vitest. Seguir `AGENTS.md`/`CLAUDE.md`.
6. **Bloqueio**: 3 tentativas sem sucesso → registrar em `BLOCKERS.md`, seguir para item independente.

## Stack e comandos

- Testes: `npm test` (Vitest) · Build: `npm run build` · Migrações: `npx prisma migrate dev` · Isolado: `npm test -- <arquivo>`
- **Pré-condição**: `next.config.ts` sem `output: 'export'` (API routes habilitadas). Se estiver presente, remover antes da Fase B e commitar.

---

## Fase A — Retrofit TDD: cobertura do código existente (PRIORIDADE MÁXIMA)

> Nenhum arquivo existente pode ser alterado nesta fase — apenas testado. Esses testes devem permanecer verdes em TODAS as fases; quebra = regressão = parar e corrigir.

- [x] **A.1** Setup: Vitest + @testing-library/react + @testing-library/user-event + jsdom; alias `@/`; teste canário. Verificação: `npm test` passa.
- [x] **A.2** Caracterização de `components/TextPost.tsx` (+ `TextPostTop`, `TextPostBottom`): título, autor, corpo pelas props.
- [x] **A.3** Caracterização de `components/ImagesPost.tsx`: renderização de imagem(ns) pelas props.
- [x] **A.4** Caracterização de `components/Post.tsx`: subcomponente renderizado por tipo de props.
- [x] **A.5** Caracterização de `components/Header.tsx` + `HeaderSearch.tsx`: logo, busca, links.
- [x] **A.6** Caracterização de `components/Nav.tsx`, `NavItem.tsx`, `NavItemMenu.tsx`: itens; comportamento do submenu.
- [x] **A.7** Caracterização de `components/Main.tsx` + `src/pages/index.tsx`: Header + título + cards; feed paginado e navegação entre páginas.
- [x] **A.8** Caracterização de `components/TextoExplicativo.tsx` + página `/admin/post`: formulário renderiza nome, autores, data, localização, categoria, área, uma ou mais imagens (uma URL por linha), descrições e ações; tooltip de descrição resumida alterna visibilidade (`showExplicacao`).
- [x] **A.9** Caracterização de `/post/[id]`: renderiza dados do projeto, metadados, descrição e galeria com imagens persistidas; id inexistente → 404.
- [x] **A.10** Caracterização de `/admin/login`: formulário de login renderiza (campos + botão), comportamento atual do submit.
- [x] **A.11** Caracterização de `ExplorarModalDesktop/Mobile`: renderização e abertura/fechamento atuais.
- [x] **A.12** Gate da Fase A: `npm test` 100% verde + `npm run build` verde + commit `test: rede de caracterização do código existente`.

## Fase B — Setup e fundação

- [x] **B.1** Prisma + SQLite:
  ```prisma
  model User {
    id           String    @id @default(cuid())
    email        String    @unique
    passwordHash String
    posts        Post[]
    createdAt    DateTime  @default(now())
  }
  model Post {
    id                String   @id @default(cuid())
    nome              String
    autores           String
    dataConclusao     String?
    localizacao       String?
    categoria         String?
    area              String?
    descricaoResumida String
    descricao         String
    imagens           String?
    author            User     @relation(fields: [authorId], references: [id])
    authorId          String
    createdAt         DateTime @default(now())
  }
  ```
  Verificação: `npx prisma migrate dev` sem erro; caracterização da Fase A verde.
- [x] **B.2** `types/Post.ts` e `types/User.ts` compartilhados. Verificação: `npm run build`.

## Fase C — Autenticação (RF1–RF5)

- [x] **RF1 — Cadastro**: `POST /api/auth/register` — email+senha válidos → usuário criado (bcrypt); email duplicado → 409; senha curta → 422.
- [x] **RF2 — Login**: `POST /api/auth/login` — válido → 200 + cookie httpOnly (JWT); inválido → 401. **Conectar a página `/admin/login` existente** a esta API.
- [x] **RF3 — Logout**: `POST /api/auth/logout` — encerra sessão/cookie.
- [x] **RF4 — Proteção de rotas**: `requireAuth` nas rotas de escrita; sem sessão → 401. Leitura permanece pública.
- [x] **RF5 — Erro genérico**: resposta idêntica para email inexistente e senha errada.

## Fase D — Leitura (RF6–RF9)

- [x] **RF6 — Seed**: 3 posts realistas de acervo de arquitetura (todos os campos do modelo). Verificação: Prisma retorna 3.
- [x] **RF7 — Feed paginado**: `lib/posts.ts` com `getPosts(page)` (10/página); home via `getServerSideProps`; Anterior/Próxima com limites. Atualizar teste A.7 num commit próprio.
- [x] **RF8 — Detalhe dinâmico**: `/post/[id]` via `getServerSideProps` substitui os dados hardcoded pelos dados reais do modelo (metadados, descrição, imagens); id inexistente → 404. Atualizar teste A.9 num commit próprio.
- [x] **RF9 — Navegação**: cards do feed → `<Link href="/post/[id]">`.

## Fase E — Escrita autenticada (RF10–RF13)

- [x] **RF10 — Create (conectar formulário existente)**: `/admin/post` chama `POST /api/posts` com os campos reais; grava vinculado à sessão; redireciona ao `/post/[id]` criado; sem sessão → 401; Cancelar → volta ao feed.
- [x] **RF11 — Update**: edição pré-preenchida (pode reutilizar a estrutura de `/admin/post`) + `PUT /api/posts/[id]`.
- [x] **RF12 — Delete**: botão com confirmação + `DELETE /api/posts/[id]`; redireciona ao feed.
- [x] **RF13 — Autorização por posse**: `session.userId === post.authorId` em PUT/DELETE; não-dono autenticado → 403.

## Fase F — Validação e encerramento (RF14–RF15)

- [x] **RF14 — Validações**: nome e descricaoResumida obrigatórios, email formato válido, senha ≥ 8; erros na UI (front + API).
- [x] **RF15 — E2E manual**: cadastro → login (via `/admin/login`) → criar post (via `/admin/post`) → ver no feed → detalhe → editar → excluir → logout.
- [x] Gate final: `npm test` 100% verde; `npm run build` verde; commit final.

## Fase G — Melhorias de front-end com alto impacto e baixo custo

Reutilizar páginas, componentes e Tailwind existentes. Sem dependências novas, redesenho amplo ou conteúdo fictício. Executar um item por vez, com teste e commit.

- [x] **G.1 — Acesso contextual** *(custo baixo · impacto alto)*: cabeçalho oferece início, cadastro, login, criação e logout; login retorna à rota protegida solicitada; edição e exclusão aparecem apenas ao autor. Aceite: ações disponíveis nos contextos corretos e rotas protegidas redirecionam ao login.
- [x] **G.2 — Imagens reais e múltiplas** *(custo baixo · impacto alto)*: cards usam as imagens persistidas no banco; formulário aceita uma URL por linha; galeria mostra todas as imagens sem duplicar a principal. Aceite: URL única, várias URLs e ausência de imagens têm renderização válida.
- [x] **G.3 — Erros de login compreensíveis** *(custo baixo · impacto alto)*: diferenciar credenciais inválidas, indisponibilidade do serviço e falha de conexão. Aceite: erro fica visível junto ao formulário e a navegação só ocorre após sucesso.
- [ ] **G.4 — Feed vazio acionável** *(custo baixo · impacto alto)*: quando não houver projetos, explicar o estado e oferecer o próximo passo; pessoa autenticada pode cadastrar e visitante pode entrar ou criar conta. Aceite: estado não parece falha e cada CTA tem destino válido.
- [ ] **G.5 — Feedback de gravação** *(custo baixo · impacto alto)*: criação e edição mostram estado de envio, impedem submissões duplicadas e preservam os dados com erro; exclusão informa falha sem perder o contexto. Aceite: cada ação tem resposta visível para sucesso, envio e erro.
- [ ] **G.6 — Recuperação de rota** *(custo baixo · impacto médio)*: página 404 com ação de retorno ao feed. Aceite: rota inexistente oferece navegação de volta sem alterar o comportamento das páginas válidas.

---

## Fora do escopo (NÃO implementar)

Recuperação de senha, verificação de email, perfis/avatares, curtidas, comentários, busca, upload de arquivo (usar URL de imagem), papéis/admin além do login existente, infinite scroll, unificação dos modais de Explorar, modificação do componente TextoExplicativo, refactors de estética além do funcional, recriação de formulários/páginas que já existem.

## Definição de "pronto" (DoD)

Item pronto quando: testes (incluindo toda a caracterização da Fase A) passam em `npm test`, `npm run build` não apresenta erros, e o commit correspondente existe.

