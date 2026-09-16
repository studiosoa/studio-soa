# Site do Studio Sôa, em Next.js

Versão 2 do site, migrada do HTML estático em 16/09/2026 para receber o Payload
CMS. O site estático continua inteiro em `../Site_html/`, e nada foi apagado de
lá.

## Rodar

```
npm install
npm run dev      # http://localhost:3000
```

O Node tem que ser 20.9 ou mais novo. Esta máquina não tinha Node nenhum; foi
instalada a versão 24 LTS em `%LOCALAPPDATA%\Programs\nodejs`, sem admin, e o
caminho entrou no PATH do usuário.

Outros comandos: `npm run build` gera a versão de produção, `npm run tipos`
confere os tipos sem gerar nada.

## Como o projeto é organizado

```
src/
  app/
    (frontend)/      o site público, com o layout raiz dele
    (payload)/       reservado pro CMS, ainda vazio (ver LEIA-ME de lá)
  componentes/       as peças de tela
  conteudo/          o conteúdo do site, hoje em TypeScript
  efeitos/           as animações, portadas do site estático
  estilos/           style-v2.css, o mesmo arquivo de antes
  tipos/             o contrato entre conteúdo e tela
public/assets/       fotos, vídeos, fontes e ícones
```

A ideia que segura tudo: **nenhum componente tem conteúdo escrito dentro dele.**
Tudo vem de `src/conteudo/`, no formato de `src/tipos/conteudo.ts`. Quando o
Payload entrar, muda só quem preenche esse formato, e as telas ficam como estão.

## O que mudou de endereço

As páginas de peça eram cinco arquivos HTML quase iguais e viraram um molde só
em `app/(frontend)/pecas/[slug]/page.tsx`. Uma peça nova agora é um item em
`conteudo/pecas.ts`, não um arquivo copiado.

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
