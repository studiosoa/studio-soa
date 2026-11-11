// Gera o índice dos arquivos de conteúdo: `src/conteudo/cms/__gerado__/indice-pecas.ts`
// e `indice-exposicoes.ts`.
//
// Por que existe. As telas leem as peças de forma síncrona e em qualquer lugar,
// inclusive em componentes de cliente (o cabeçalho e os blocos da home importam
// `conteudo/v2.ts`, que importa as peças). Ler a pasta com `fs` quebraria o
// pacote do navegador. Importar cada JSON de forma estática funciona nos dois
// lados, mas exige uma linha de `import` por arquivo, e uma peça nova criada no
// painel não teria quem escrevesse essa linha. Este script escreve as linhas.
//
// Roda antes de `dev` e de `build` (ganchos `predev` e `prebuild` do
// package.json), então uma peça ou mostra nova que chega pelo repositório entra
// no build sem ninguém tocar em código. Os arquivos gerados também vão para o
// Git, para o projeto compilar mesmo se alguém esquecer de rodar o script.
//
// Uso: node scripts/indexar-conteudo.mjs

import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const pastaGerada = resolve("src/conteudo/cms/__gerado__");

/**
 * Indexa uma pasta de `content/`.
 * `campo` é o nome do identificador no objeto exportado (`slug` nas peças,
 * `chave` nas exposições), e `tipo` o tipo que o JSON precisa respeitar.
 */
function indexar({ pasta, saida, exportado, campo, tipo, arquivoDoTipo, rotulo }) {
  const arquivos = readdirSync(resolve(`content/${pasta}`))
    .filter((nome) => nome.endsWith(".json"))
    .sort();

  const linhas = [
    "// GERADO por scripts/indexar-conteudo.mjs. Não edite à mão: a próxima",
    `// execução apaga a mudança. Para entrar um item, ponha o JSON dele em`,
    `// content/${pasta}/ (o painel do Tina já faz isso) e rode \`npm run indexar\`.`,
    "",
    `import type { ${tipo} } from "../${arquivoDoTipo}";`,
    "",
    ...arquivos.map(
      (nome, i) => `import p${i} from "../../../../content/${pasta}/${nome}";`,
    ),
    "",
    `export const ${exportado}: { ${campo}: string; dados: ${tipo} }[] = [`,
    ...arquivos.map(
      (nome, i) =>
        `  { ${campo}: ${JSON.stringify(nome.replace(/\.json$/, ""))}, dados: p${i} as ${tipo} },`,
    ),
    "];",
    "",
  ];

  mkdirSync(pastaGerada, { recursive: true });
  writeFileSync(resolve(pastaGerada, saida), linhas.join("\n"));
  console.log(`${saida}: ${arquivos.length} ${rotulo}`);
}

indexar({
  pasta: "pecas",
  saida: "indice-pecas.ts",
  exportado: "arquivosDePecas",
  campo: "slug",
  tipo: "PecaDoCms",
  arquivoDoTipo: "normalizar-peca",
  rotulo: "peça(s)",
});

indexar({
  pasta: "exposicoes",
  saida: "indice-exposicoes.ts",
  exportado: "arquivosDeExposicoes",
  campo: "chave",
  tipo: "ExposicaoDoCms",
  arquivoDoTipo: "normalizar-exposicao",
  rotulo: "mostra(s)",
});
