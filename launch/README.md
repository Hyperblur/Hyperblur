# Lançamento do Hyperblur: onde listar e como

Este é o guia único de divulgação. O texto pronto para colar (em inglês) está em `listings.md`. Imagens prontas estão em `launch/assets/` (avatares 1024, og-image 1200x630, screenshots 800x600 e 560x420, logos SVG).

Legenda da coluna "Verif.": **sim** = li a página oficial ou o formulário respondeu; **verificar** = não consegui confirmar, confira na hora. Datas e regras mudam, então leia a página antes de enviar.

## Antes de começar (nesta ordem)

1. **Publicar o MCP 0.2.0 no npm.** Hoje só existe a 0.1.0 no npm. O campo `mcpName` já foi adicionado em `packages/mcp/package.json`, mas ele só vale depois do publish. No terminal: `cd packages/mcp && npm publish` (pede o código do app de 2FA). Sem isso, o MCP Registry e vários diretórios rejeitam ou mostram versão velha.
2. **Domínio hyperblur.dev.** Os textos usam hyperblur.vercel.app. Quando o domínio estiver ligado, troque `hyperblur.vercel.app` por `hyperblur.dev` nos arquivos `server.json`, `listings.md` e nos formulários. Evite enviar a Product Hunt e Hacker News antes, porque o link do lançamento fica para sempre.
3. **Avatar na organização do GitHub** (use `launch/assets/avatar-blue-1024.png`) e **Releases/topics** do repositório (seção e).
4. Faça login nas contas necessárias com antecedência: GitHub (já tem), npm (já tem), Product Hunt, Reddit (conta com histórico, ver aviso), X, dev.to, Hacker News.

Ordem sugerida de envio: (e) polimento, depois (a) MCP Registry, depois diretórios MCP, depois (b) e (c), e por último (d) lançamento público numa terça a quinta.

## a) Diretórios de MCP

| Plataforma | O que é | URL de envio | O que precisa | Esforço | Verif. | Feito |
| --- | --- | --- | --- | --- | --- | --- |
| MCP Registry oficial | Catálogo oficial do projeto MCP. Outros diretórios (PulseMCP e outros) leem dele | CLI `mcp-publisher` (passos abaixo). Consulta: https://registry.modelcontextprotocol.io | Pacote no npm com `mcpName`, `packages/mcp/server.json`, login com GitHub. Em preview, pode haver resets | 20 min | sim | [ ] |
| Smithery | Diretório e hospedagem de MCP | https://smithery.ai/new (redireciona; exige conta). Docs: https://smithery.ai/docs/build/publish | Servidor stdio local = bundle `.mcpb` publicado com `smithery mcp publish ./server.mcpb -n hyperblur/mcp`. O `packages/mcp/smithery.yaml` é o formato antigo | 1 a 2 h (precisa gerar o .mcpb) | parcial: a doc atual não menciona smithery.yaml | [ ] |
| mcp.so | Diretório comunitário | https://mcp.so/submit | Conta (botão Sign In). Formulário: tipo "MCP Server", URL do repositório, nome. Existe opção paga de US$ 39 para publicar sem revisão: não precisa | 5 min | sim | [ ] |
| PulseMCP | Diretório com curadoria | https://www.pulsemcp.com/submit | Nada agora: o formulário está fechado ("temporarily not accepting"). A página diz que ele pega servidores do MCP Registry oficial automaticamente | 0 (depende do registry oficial) | sim | [ ] |
| Glama | Diretório e ranking de MCP | https://glama.ai/mcp/servers (botão "Add Server"; o link direto do formulário não consegui abrir) | Conta Glama. Para assumir a página: `glama.json` na raiz do repo (conteúdo abaixo). Repositório de organização exige glama.json | 15 min | verificar | [ ] |
| Cursor Directory | Diretório da comunidade do Cursor | https://cursor.directory/plugins/new (a página /mcp não carregou: verificar se existe envio separado) | Login com GitHub ou Google, colar a URL do repo. Lê `.mcp.json`, `skills/*/SKILL.md` etc. A raiz do nosso repo não tem `.mcp.json` (está em `plugins/hyperblur/`): verificar se aceita subpasta. Há varredura automática de segurança | 10 min | sim (fluxo) / verificar (subpasta) | [ ] |
| Cursor Marketplace | Lista curada do Cursor | https://cursor.com/marketplace/publish | Passa pela equipe do Cursor. Só depois do Cursor Directory | 30 min | verificar | [ ] |
| awesome-mcp-servers (punkpeye) | Lista no GitHub, a mais usada | PR em https://github.com/punkpeye/awesome-mcp-servers (editar README.md) | Conta GitHub. Uma linha na categoria "Developer Tools", em ordem alfabética, com link do repo. Linha pronta em `listings.md`. O sufixo 🤖🤖🤖 no título do PR é só para PRs de agentes: não use | 15 min | sim (regras do CONTRIBUTING) | [ ] |

### Passos exatos: MCP Registry oficial

Documentação: https://modelcontextprotocol.io/registry/quickstart

1. Publique antes o pacote no npm (passo 1 do início). O Registry só guarda metadados e confere o pacote no npm. O `package.json` já tem `"mcpName": "io.github.Hyperblur/mcp"`, igual ao `name` do `server.json`. O `version` do `server.json` e do pacote precisam ser iguais (0.2.0) e cada publicação de versão é única e não pode ser alterada.
2. Instale o CLI (macOS): `brew install mcp-publisher`. Alternativa por binário: ver a página do quickstart. Teste com `mcp-publisher --help`.
3. Entre na pasta: `cd /Users/anders/Hyperblur/packages/mcp`
4. Login: `mcp-publisher login github`. O terminal mostra um código; abra https://github.com/login/device, digite o código e autorize.
5. Publique: `mcp-publisher publish`. Saída esperada: "Successfully published".
6. Confira: `curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.Hyperblur/mcp"`

Pontos de atenção:
- Com login GitHub, o nome precisa começar com `io.github.<usuário ou organização>/`. Como o nome usa a organização `Hyperblur`, a conta andersmonteiro precisa pertencer à organização. Se o publish recusar com erro de permissão ("You do not have permission to publish this server"), confira o login e torne sua participação na organização pública (GitHub > organização > People) ou refaça o login. Também verificar se a diferença de maiúsculas (`Hyperblur`) importa; se importar, use `io.github.hyperblur/mcp` no `server.json` e no `mcpName` e republique o pacote.
- O campo `description` do `server.json` tem limite de 100 caracteres (o atual tem 81).
- O `server.json` usa o schema 2025-12-11 com campos em camelCase (`registryType`, `environmentVariables`), diferente de versões antigas com `registry_type`.
- Atualizações futuras: aumente a versão no `package.json` e no `server.json`, `npm publish`, depois `mcp-publisher publish`.

### glama.json (opcional, na raiz do repositório)

```json
{
  "$schema": "https://glama.ai/mcp/schemas/server.json",
  "maintainers": ["andersmonteiro"]
}
```

## b) Plugins do Claude Code

| Plataforma | O que é | URL de envio | O que precisa | Esforço | Verif. | Feito |
| --- | --- | --- | --- | --- | --- | --- |
| Marketplace próprio no GitHub | Já funciona: `.claude-plugin/marketplace.json` na raiz do repo. Não existe formulário | Nada a enviar. Instalação: `claude plugin install hyperblur --marketplace Hyperblur/Hyperblur` | Repo público. Rode `claude plugin validate --strict ./plugins/hyperblur` e `claude plugin validate .` antes de divulgar | 10 min | sim | [ ] |
| Diretório da Anthropic (claude.ai/directory) | Catálogo que aparece no claude.ai, no Cowork e, por sincronização, no Claude Code | https://claude.ai/directory/manage (guia: https://claude.com/docs/plugins/submit) | Plano pago do claude.ai (Pro, Max, Team ou Enterprise com permissão). Repo público no GitHub com sua conta GitHub conectada ao claude.ai. README no plugin, LICENSE, `plugin.json` completo. Passos no portal: Source, validar, Listing details, Data handling, Compliance, enviar. Revisão por humano e varredura de segurança; prazo não divulgado | 1 h (README do plugin e validação) | sim | [ ] |
| Marketplace oficial `claude-plugins-official` | Lista curada pela Anthropic | Não aceita envio pelo portal. Só via contato de parceiro da Anthropic | Não se aplica | 0 | sim | [ ] |

Notas: a opção "MCP connector" do portal é para servidores MCP remotos. O `@hyperblur/mcp` é stdio local, então só o plugin (que o inclui) se encaixa. Antes de enviar o plugin ao diretório, adicione um `README.md` em `plugins/hyperblur/` (a doc pede README na raiz do plugin) e confira a checklist: https://claude.com/docs/plugins/pre-submission-checklist

## c) shadcn

| Plataforma | O que é | URL de envio | O que precisa | Esforço | Verif. | Feito |
| --- | --- | --- | --- | --- | --- | --- |
| Diretório oficial de registries do shadcn | Lista em https://ui.shadcn.com/docs/directory. Os registries listados viram `npx shadcn add @hyperblur/glitch-text` sem configuração | PR em https://github.com/shadcn-ui/ui adicionando uma entrada em `apps/v4/registry/directory.json`. Docs: https://ui.shadcn.com/docs/registry/registry-index | Registry open source e público, JSON válido, "flat" (`registry.json` e `<item>.json` juntos), sem `content` dentro de `files` no `registry.json` (confere: o nosso não tem). Rode `pnpm validate:registries` no fork. Entrada pronta em `listings.md` | 30 min | sim | [ ] |
| registry.directory (comunidade) | Índice comunitário de registries shadcn, busca por componente | `POST https://registry.directory/api/submit` (sem conta nem PR). Contrato: https://registry.directory/how-to-submit.md | Campos: name, description (até 300), url, registry_url (https://hyperblur.vercel.app/r/registry.json). Auditoria automática e humana, "alguns dias". Comando pronto abaixo | 10 min | sim | [ ] |

Comando para o registry.directory (rode no terminal quando quiser enviar; guarde o `submission_token` da resposta, ele aparece uma vez):

```sh
curl -X POST https://registry.directory/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hyperblur",
    "description": "Copy-paste React visual effects, components and page blocks. One shadcn command to install, MCP server for coding agents.",
    "url": "https://hyperblur.vercel.app",
    "registry_url": "https://hyperblur.vercel.app/r/registry.json",
    "github_url": "https://github.com/Hyperblur/Hyperblur",
    "github_profile": "https://github.com/Hyperblur.png"
  }'
```

Não envie o campo `namespace` até estar listado no diretório do shadcn (ele é verificado). Não envie `pro`: ainda não há plano pago à venda.

## d) Lançamento geral

| Plataforma | O que é | URL de envio | O que precisa | Esforço | Verif. | Feito |
| --- | --- | --- | --- | --- | --- | --- |
| Product Hunt | Lançamento diário de produtos | https://www.producthunt.com/launch (Submit > New Product) | Conta pessoal (contas de empresa são proibidas), nome, tagline até 60 caracteres, descrição até 500, thumbnail quadrado 240x240 (menos de 3 MB), galeria com 2+ imagens (recomendado 1270x760; nossos screenshots são 800x600, vale refazer), até 3 tópicos, comentário do maker. Pode agendar; 12:01 da manhã (horário do Pacífico) é o recomendado. Não peça upvotes, peça comentários e feedback | 2 h + dia do lançamento | sim | [ ] |
| Hacker News (Show HN) | Fórum do Y Combinator | https://news.ycombinator.com/submit. Regras: https://news.ycombinator.com/showhn.html | Conta. Título começa com "Show HN". Precisa ser algo que as pessoas possam rodar/testar, feito por você e você responde nos comentários. Sem cadastro obrigatório para testar (ok). Não peça votos a amigos. Poste na semana, de manhã no horário dos EUA | 30 min + ficar online | sim | [ ] |
| Reddit r/reactjs | Comunidade de React | https://www.reddit.com/r/reactjs/submit | Conta com histórico de participação (sem histórico o post costuma ser removido). Regras de autopromoção: não consegui ler a página de regras (o acesso é bloqueado). **Leia a barra lateral e as regras antes**; costuma haver restrição a posts promocionais e thread semanal de projetos | 20 min | verificar | [ ] |
| Reddit r/webdev | Comunidade geral de web | https://www.reddit.com/r/webdev/submit | Idem. Em geral só se aceita projeto com valor real para os outros, e há dia/thread de showcase. Regras exatas: verificar | 20 min | verificar | [ ] |
| Reddit r/nextjs | Comunidade de Next.js | https://www.reddit.com/r/nextjs/submit | Idem. Regras exatas: verificar | 20 min | verificar | [ ] |
| X (Twitter) | Rede social | https://x.com/compose/post | Conta com avatar e bio. Três variações em `listings.md`. Anexe um GIF ou vídeo curto de um efeito | 15 min | sim | [ ] |
| dev.to | Blog de desenvolvedores | https://dev.to/new | Conta. Front matter: title, published, description, tags (máximo 4), cover_image (1000x420 recomendado), canonical_url. Roteiro do artigo em `listings.md` | 2 a 3 h | sim | [ ] |
| Vercel Templates | Galeria de templates da Vercel | https://vercel.com/templates/submit | Repo público no GitHub, descrição do uso, thumbnail 1200x630 (`launch/assets/og-image.png` serve), template com deploy simples. A equipe revisa tudo; relatos de comunidade citam formulário sem confirmação e revisão em reavaliação em 2026. Hoje o repo é um catálogo, não um template; o mais próximo é a rota /templates/landing. Candidato fraco: só vale se extrair um starter | 2 a 4 h | parcial | [ ] |
| awesome-react | Lista no GitHub de recursos React | PR em https://github.com/enaqx/awesome-react (README.md, seções "React Component Libraries" ou "React Graphics and Animations") | Só recursos gratuitos, prefere links do GitHub, "não use a lista como quadro de anúncios". Faça depois de ter algumas semanas de uso e estrelas | 15 min | sim | [ ] |
| awesome-tailwindcss | Lista no GitHub de Tailwind | https://github.com/aniftyco/awesome-tailwindcss (CONTRIBUTING.md) | Os efeitos não dependem do Tailwind, então provavelmente não se encaixa. Regras: PR escrito à mão por quem usou o recurso, formulário do PR preenchido, PRs com ajuda de IA são fechados. Recomendo pular | n/a | sim | [ ] |

Avisos de autopromoção: Reddit e Hacker News toleram projeto próprio quando o post é honesto, mostra algo que funciona e o autor participa da conversa. Poste em um subreddit por dia, nunca copie o mesmo texto, responda comentários, não peça votos. Se for removido, não repita.

## e) npm e GitHub

| Item | O que fazer | Onde | Esforço | Verif. | Feito |
| --- | --- | --- | --- | --- | --- |
| Página do pacote no npm | Publicar 0.2.0. A página mostra o README do pacote (`packages/mcp/README.md`) e os links de `homepage`/`repository`. Depois do domínio, troque o `homepage` | https://www.npmjs.com/package/@hyperblur/mcp | 5 min | sim (pacote existe; a página bloqueia robôs) | [ ] |
| Topics do repositório | Até 20, minúsculas e hífen. Sugestão: `react`, `shadcn`, `shadcn-ui`, `registry`, `mcp`, `mcp-server`, `model-context-protocol`, `claude-code`, `animation`, `ui-components`, `copy-paste`, `nextjs`, `typescript`. Repo > engrenagem ao lado de "About" > Topics | https://github.com/Hyperblur/Hyperblur | 5 min | sim | [ ] |
| Social preview | Repo > Settings > General > Social preview: enviar `launch/assets/og-image.png` (1200x630). Passo de interface, não confirmado em página oficial | https://github.com/Hyperblur/Hyperblur/settings | 3 min | verificar | [ ] |
| GitHub Release | Releases > Draft a new release. Tag `v0.2.0`, título "Hyperblur 0.2.0", botão "Generate release notes". Texto sugerido em `listings.md` | https://github.com/Hyperblur/Hyperblur/releases/new | 10 min | sim | [ ] |
| Avatar da organização | Subir `launch/assets/avatar-blue-1024.png` em Organization settings > Profile | https://github.com/organizations/Hyperblur/settings/profile | 2 min | verificar (caminho do menu) | [ ] |

## Arquivos criados nesta etapa

- `launch/README.md` (este) e `launch/listings.md` (textos em inglês).
- `packages/mcp/server.json` (MCP Registry) e `packages/mcp/smithery.yaml` (formato antigo do Smithery).
- `packages/mcp/package.json`: só foi acrescentado `"mcpName": "io.github.Hyperblur/mcp"`.

## Incertezas conhecidas

- Maiúsculas no nome do MCP Registry (`Hyperblur` vs `hyperblur`) e a exigência de participação pública na organização: verificar no primeiro `mcp-publisher publish`.
- Smithery: a doc atual só descreve URL (HTTP) e bundle `.mcpb`. O `smithery.yaml` pode ser ignorado. Para stdio, prefira o bundle.
- PulseMCP está fechado para envios; o caminho é o registry oficial.
- Regras de autopromoção do Reddit e do formulário do Glama não foram lidas.
- Os itens do catálogo e `server.json` apontam para hyperblur.vercel.app; ao ligar hyperblur.dev, atualize.
