import type { Peca } from "@/tipos/conteudo";
import { arquivosDePecas } from "./cms/__gerado__/indice-pecas";
import { normalizarPeca, pecaPublicavel } from "./cms/normalizar-peca";

// Coleção `pecas`. Desde 05/11/2026 o dado não mora mais aqui: cada peça é um
// arquivo em `content/pecas/<slug>.json`, e quem edita é o painel do Tina (`/admin`).
// Este arquivo só lê.
//
// Como o dado chega aqui: `scripts/indexar-conteudo.mjs` lista os arquivos da pasta
// e gera `cms/__gerado__/indice-pecas.ts`, e `cms/normalizar-peca.ts` converte o que
// o painel grava no formato que as telas esperam (`Peca`). Os componentes não
// mudam: continuam importando `pecas` e `acharPeca` daqui, e não sabem que existe CMS.
//
// A ordem das peças NO CATÁLOGO não é a ordem deste array (que é a do nome do
// arquivo): vem de `content/catalogo.json`, ver `ordemDasPecasV2` em `v2.ts`.
//
// As decisões de direção de arte que estavam escritas como comentário em cada peça,
// como a ordem das fotos que a Luiza indicou em 27/10, continuam no histórico do
// Git, no commit 0f152fa, que é o último que ainda tinha este arquivo escrito à mão.
//
// DUVIDAS #4: falta a sexta peça, Espelho Linha, que ainda não tem foto. Com o CMS
// ela deixa de ser tarefa de código: é criar a peça no painel.

// Peça sem a foto do topo e a do catálogo é rascunho e não entra: ver `pecaPublicavel`.
export const pecas: Peca[] = arquivosDePecas.flatMap(({ slug, dados }) =>
  pecaPublicavel(dados) ? [normalizarPeca(slug, dados)] : [],
);

export function acharPeca(slug: string): Peca | undefined {
  return pecas.find((p) => p.slug === slug);
}
