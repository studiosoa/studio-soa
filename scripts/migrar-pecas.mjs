// Migração única das peças: lê `src/conteudo/pecas.ts` (como estava no commit
// 0f152fa, 27/10/2026) e escreve um JSON por peça em `content/pecas/`, mais a
// ordem do catálogo em `content/catalogo.json`. É a Fase 3 do
// `2_Estrategia/Plano-Integracao-Tina.md`.
//
// Rodou uma vez, em 05/11/2026. Depois dela `src/conteudo/pecas.ts` virou um
// leitor desses JSON, então este script não roda mais contra o código de hoje: ele
// fica como registro de como o dado saiu do TypeScript para o CMS. Para rodar de
// novo, é preciso o `pecas.ts` antigo (`git show 0f152fa:src/conteudo/pecas.ts`).
//
// Uso: node scripts/migrar-pecas.mjs <caminho do pecas.ts antigo>

import { mkdirSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve, join } from "node:path";

const origem = process.argv[2];
if (!origem) {
  console.error("Passe o caminho do pecas.ts antigo.");
  process.exit(1);
}

const { pecas } = await import(pathToFileURL(resolve(origem)).href);

// A ordem do catálogo da V2. Estava escrita à mão em `v2.ts`
// (`ordemDasPecasV2`) e passa a morar em `content/catalogo.json`.
const ordemDoCatalogo = [
  "mesa-onda",
  "espelho-miudo-graudo",
  "bandeja-elis",
  "banquinho-elis",
  "adorno-balanco",
];

// Peças em que o vídeo abre a galeria (`pecaV2.videoPrimeiro` em `v2.ts`).
const videoPrimeiro = ["adorno-balanco"];

// Cada peça guardava a foto da peça que vinha DEPOIS dela (`fotoDaProxima`), e a
// V2 virava essa relação do avesso para achar "a foto grande desta peça"
// (`fotoGrandeDaPeca`). No CMS isso vira um campo da própria peça,
// `fotoDeAtalho`: quem edita a Mesa Onda vê a foto da Mesa Onda, e não a do
// Banquinho escondida no registro de outra.
const fotoDeAtalho = Object.fromEntries(
  pecas.map((p) => [p.proxima, p.fotoDaProxima]),
);

const limpa = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

const foto = (f) =>
  limpa({
    src: f.src,
    alt: f.alt,
    recorte: f.recorte,
    zoom: f.zoom,
    celular: f.celular ? limpa({ src: f.celular.src, ate: f.celular.ate }) : undefined,
  });

// `_template` vai por último de propósito: é onde a Tina o grava. A ordem das chaves
// não muda nada para as telas, mas faz o primeiro salvamento no painel produzir uma
// diferença de uma linha no Git, e não de quinhentas.
const quadro = (q) =>
  q.tipo === "video"
    ? { src: q.src, poster: q.poster, descricao: q.descricao, _template: "video" }
    : { ...foto(q), _template: "foto" };

const pasta = resolve("content/pecas");
mkdirSync(pasta, { recursive: true });

for (const p of pecas) {
  // As chaves seguem a ordem dos campos em `tina/config.ts`, que é a ordem em que a
  // Tina grava. Pelo mesmo motivo de `_template`: o primeiro salvamento não
  // reorganiza o arquivo.
  const json = limpa({
    nome: p.nome,
    titulo: p.titulo,
    artigo: p.artigo,
    capa: foto(p.capa),
    cartao: foto(p.cartao),
    fotoDeAtalho: foto(fotoDeAtalho[p.slug]),
    // Um parágrafo por item, cada um numa caixa de texto própria no painel.
    descricao: p.descricao.map((texto) => ({ texto })),
    galeria: p.galeria.map(quadro),
    videoPrimeiro: videoPrimeiro.includes(p.slug),
    ficha: p.ficha.map((l) => ({ rotulo: l.rotulo, valores: l.valores })),
    acabamentos: p.acabamentos
      ? p.acabamentos.map((b) => ({
          rotulo: b.rotulo,
          itens: b.itens.map((i) => limpa({ nome: i.nome, cor: i.cor, textura: i.textura })),
        }))
      : undefined,
    whatsapp: p.whatsapp,
    bloco3d: p.bloco3d,
    // `proxima`, `fotoDaProxima` e `fundoDoCatalogo` NÃO migram. São do rodapé da
    // V1, que a V2 não lê, e deixar campo sem uso no arquivo faria o painel
    // reclamar dele ou apagá-lo sozinho na primeira edição. O tipo `Peca` ainda os
    // pede, e `cms/normalizar-peca.ts` põe um valor padrão.
  });
  writeFileSync(join(pasta, `${p.slug}.json`), JSON.stringify(json, null, 2)); // a Tina grava sem quebra de linha no fim
  console.log("escrito", `content/pecas/${p.slug}.json`);
}

writeFileSync(
  resolve("content/catalogo.json"),
  JSON.stringify(
    { pecas: ordemDoCatalogo.map((slug) => ({ peca: `content/pecas/${slug}.json` })) },
    null,
    2,
  ),
);
console.log("escrito content/catalogo.json");
