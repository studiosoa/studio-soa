// Gera o índice dos arquivos de conteúdo: `src/conteudo/cms/__gerado__/indice-pecas.ts`.
//
// Por que existe. As telas leem as peças de forma síncrona e em qualquer lugar,
// inclusive em componentes de cliente (o cabeçalho e os blocos da home importam
// `conteudo/v2.ts`, que importa as peças). Ler a pasta com `fs` quebraria o
// pacote do navegador. Importar cada JSON de forma estática funciona nos dois
// lados, mas exige uma linha de `import` por arquivo, e uma peça nova criada no
// painel não teria quem escrevesse essa linha. Este script escreve as linhas.
//
// Roda antes de `dev` e de `build` (ganchos `predev` e `prebuild` do
// package.json), então uma peça nova que chega pelo repositório entra no build
// sem ninguém tocar em código. O arquivo gerado também vai para o Git, para o
// projeto compilar mesmo se alguém esquecer de rodar o script.
//
// Uso: node scripts/indexar-conteudo.mjs

import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";

const pastaDePecas = resolve("content/pecas");
const saida = resolve("src/conteudo/cms/__gerado__/indice-pecas.ts");

const arquivos = readdirSync(pastaDePecas)
  .filter((nome) => nome.endsWith(".json"))
  .sort();

const linhas = [
  "// GERADO por scripts/indexar-conteudo.mjs. Não edite à mão: a próxima",
  "// execução apaga a mudança. Para entrar uma peça, ponha o JSON dela em",
  "// content/pecas/ (o painel do Tina já faz isso) e rode `npm run indexar`.",
  "",
  'import type { PecaDoCms } from "../normalizar-peca";',
  "",
  ...arquivos.map(
    (nome, i) => `import p${i} from "../../../../content/pecas/${nome}";`,
  ),
  "",
  "export const arquivosDePecas: { slug: string; dados: PecaDoCms }[] = [",
  ...arquivos.map(
    (nome, i) =>
      `  { slug: ${JSON.stringify(nome.replace(/\.json$/, ""))}, dados: p${i} as PecaDoCms },`,
  ),
  "];",
  "",
];

mkdirSync(resolve(saida, ".."), { recursive: true });
writeFileSync(saida, linhas.join("\n"));
console.log(`indice-pecas.ts: ${arquivos.length} peça(s)`);
