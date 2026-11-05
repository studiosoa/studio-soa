# Site do Studio Sôa, em Next.js

Versão 2 do site, migrada do HTML estático em 16/09/2026 para receber o Payload
CMS. O site estático continua inteiro em `../Site_html/`, e nada foi apagado de
lá.

## Rodar

```
npm install
npm run dev      # http://localhost:3000
```

O Node tem que ser 20.9 ou mais novo para o site, e 22 ou 24 para o painel de edição
(o `tinacms` não roda no 20). Esta máquina não tinha Node nenhum; foi
instalada a versão 24 LTS em `%LOCALAPPDATA%\Programs\nodejs`, sem admin, e o
caminho entrou no PATH do usuário.

Outros comandos: `npm run build` gera a versão de produção, `npm run tipos`
confere os tipos sem gerar nada, e `npm run tina:dev` sobe o site junto com o
painel de edição (ver "O painel de edição" abaixo).

## Como o projeto é organizado

```
src/
  app/
    (frontend)/      o site público, com o layout raiz dele
    (payload)/       reservado pro CMS, ainda vazio (ver LEIA-ME de lá)
  componentes/       as peças de tela
  conteudo/          o conteúdo do site: em TypeScript, e as peças lidas de content/
    cms/             a ponte entre o que o painel grava e o que as telas leem
  efeitos/           as animações, portadas do site estático
  estilos/           style-v2.css, o mesmo arquivo de antes
  tipos/             o contrato entre conteúdo e tela
content/             o conteúdo que o painel edita: um JSON por peça e a ordem do catálogo
tina/config.ts       o que o painel mostra, campo a campo
scripts/             indexar-conteudo.mjs (roda sozinho) e migrar-pecas.mjs (rodou uma vez)
public/assets/       fotos, vídeos, fontes e ícones
```

A ideia que segura tudo: **nenhum componente tem conteúdo escrito dentro dele.**
Tudo vem de `src/conteudo/`, no formato de `src/tipos/conteudo.ts`. O Payload
foi o primeiro plano para o CMS e saiu em 17/09; o escolhido foi o TinaCMS. A
ideia continua valendo do mesmo jeito: muda só quem preenche esse formato, e as
telas ficam como estão.

## O que mudou de endereço

As páginas de peça eram cinco arquivos HTML quase iguais e viraram um molde só
em `app/(frontend)/pecas/[slug]/page.tsx`. Uma peça nova agora é um arquivo em
`content/pecas/`, criado pelo painel, não um arquivo HTML copiado.

| antes | agora |
|---|---|
| `index.html` | `/` |
| `sobre.html` | `/sobre` |
| `pecas/index.html` | `/pecas` |
| `pecas/mesa-onda-v2.html` | `/pecas/mesa-onda` |
| `pecas/banquinho-elis.html` | `/pecas/banquinho-elis` |
| `pecas/bandeja-elis.html` | `/pecas/bandeja-elis` |
| `pecas/espelho-miudo-graudo.html` | `/pecas/espelho-miudo-graudo` |
| `pecas/adorno-balanco.html` | `/pecas/adorno-balanco` |
| `exposicoes.html` | `/exposicoes` |
| `onde-encontrar.html` | `/onde-encontrar` |
| `contato.html` | `/contato` |

O `-v2` da Mesa Onda era cicatriz de produção, não nome, e sumiu. O site nunca
foi publicado, então não há link antigo na rua para redirecionar.

## O que NÃO foi portado

`pecas/mesa-onda.html`, a versão 1 da página, junto com o `style.css`, o
`gallery.js` e o `scroll-effects.js` que só ela usava. Nenhuma página linkava
para ela desde 30/08. Os arquivos continuam em `../Site_html/`, intocados.

## Decisões que valem saber

**O CSS é o mesmo arquivo, não foi reescrito.** São 57 KB calibrados medindo
tela real, com `object-position` escolhido a olho em cada foto. Passar isso para
CSS Modules ou Tailwind seria refazer a calibragem inteira sem ganho nenhum.
Entra global no layout raiz.

**As fotos usam `<img>`, não `next/image`.** Várias seções dependem de a imagem
ser filha direta do bloco, e o `next/image` embrulha tudo num `<span>` com
`position` próprio, o que quebraria o enquadramento em silêncio. O motivo está
escrito em `componentes/Imagem.tsx`.

**Os efeitos não viraram componentes React.** Eles continuam achando os
elementos por `data-`, do mesmo jeito, com a mesma matemática. O que mudou foi o
invólucro: cada um virou uma função que devolve a própria limpeza, chamada
depois que a página monta e desfeita quando a rota troca. Reescrever a lógica em
estado de React arriscaria perder calibragem sem melhorar nada visível.

**O Leaflet passou a vir do npm.** A cópia em `assets/vendor/` existia para o
site não depender de CDN. Com empacotador, o pacote do npm entra no bundle e o
resultado é o mesmo, sem a pasta à mão.

## O painel de edição (TinaCMS)

Em andamento desde 05/11/2026, na branch `cms-tina`. O plano inteiro está em
`../../2_Estrategia/Plano-Integracao-Tina.md`, e o que já foi feito está na seção
"Andamento" no fim dele. Resumo do que existe hoje:

**Só as peças e a ordem do catálogo estão no painel.** Exposições, páginas únicas
(home, sobre, contato, onde encontrar) e dados do site (menu, rodapé, loja, redes)
ainda são TypeScript e entram nos próximos trechos.

```
npm run tina:dev        # site em http://localhost:3000 e painel em /admin/index.html
```

O painel abre em **modo local**: lê e grava os arquivos de `content/` direto no
disco, sem conta nenhuma. Na primeira vez ele pede para "Enter Edit Mode"; é um
clique. Para valer no site publicado falta a Fase 0 do plano (criar o projeto na
TinaCloud, que só o Pedro pode fazer) e pôr três variáveis no ambiente da
Netlify:

```
NEXT_PUBLIC_TINA_CLIENT_ID=...
TINA_TOKEN=...
NEXT_PUBLIC_TINA_BRANCH=main
```

Quando elas existirem, o comando de build da Netlify passa de `npm run build`
para `tinacms build && next build`. **Hoje ele continua `npm run build`**, de
propósito: o site publicado não depende do painel e não muda.

**Como o dado chega às telas.** Cada peça é `content/pecas/<nome>.json`. O
`scripts/indexar-conteudo.mjs` lista a pasta e gera
`src/conteudo/cms/__gerado__/indice-pecas.ts` (roda sozinho antes de `dev` e de
`build`), e `src/conteudo/cms/normalizar-peca.ts` converte o que o painel grava no
formato `Peca`. `src/conteudo/pecas.ts` só junta as duas coisas. Os componentes não
sabem que existe CMS.

**A ordem do catálogo** é `content/catalogo.json`, uma lista de peças que se
reordena arrastando no painel. Peça que existe e não está na lista vai para o fim;
item da lista sem arquivo é ignorado. Nenhum dos dois derruba o site.

**Duas armadilhas que já mordem.**

1. A API `update*` do Tina **substitui o documento inteiro**: mandar só um campo
   apaga os outros. O painel manda tudo, então ele é seguro; script próprio que
   chame a API com campos parciais não é. Foi como um teste apagou uma peça em
   05/11 (recuperada de uma cópia).
2. O arquivo que o painel grava tem uma ordem de chaves e nenhuma quebra de linha
   no fim. Os JSON em `content/` foram escritos nesse formato para o primeiro
   salvamento não reorganizar o arquivo: não reformate à mão nem rode um
   formatador por cima.

