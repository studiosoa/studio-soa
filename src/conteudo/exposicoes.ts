import type { Exposicao } from "@/tipos/conteudo";
import ordem from "../../content/ordem-exposicoes.json";
import { arquivosDeExposicoes } from "./cms/__gerado__/indice-exposicoes";
import {
  exposicaoPublicavel,
  normalizarExposicao,
} from "./cms/normalizar-exposicao";

// Coleção `exposicoes`. Desde 11/11/2026 o dado não mora mais aqui: cada mostra é um
// arquivo em `content/exposicoes/<chave>.json`, e quem edita é o painel do Tina
// (`/admin`). Este arquivo só lê, na mesma lógica de `pecas.ts`.
//
// O arquivo de cada mostra guarda o ESTADO FINAL: nome como aparece no quadrado, ano
// e as fotos já na ordem em que abrem. A página de Exposições não calcula mais nada.
// Antes ela montava isso em quatro passos (`mostraV2` em `v2.ts`, com `antes`,
// `esconder`, `ajustes`, `abrePor` e `ordem`), e o texto das decisões de cada mostra,
// como o reenquadramento da BAB e a abertura da Design Week pelo pôster, está no
// histórico do Git, no commit 9c15aef, o último que ainda tinha isso escrito à mão.
//
// A ordem das mostras na página vem de `content/ordem-exposicoes.json`, editada no
// painel arrastando. Mostra que existe e não está na lista vai para o fim; entrada da
// lista sem arquivo é ignorada.
//
// Mostra sem nome ou sem nenhuma foto é rascunho e não entra: ver `exposicaoPublicavel`.
//
// DUVIDAS #9: confirmar com a Luiza se falta alguma foto em cada mostra.

const todas: Exposicao[] = arquivosDeExposicoes.flatMap(({ chave, dados }) =>
  exposicaoPublicavel(dados) ? [normalizarExposicao(chave, dados)] : [],
);

const chavesDaLista = ordem.exposicoes.map((item) =>
  item.exposicao.split("/").pop()!.replace(/\.json$/, ""),
);

export const exposicoes: Exposicao[] = [
  ...chavesDaLista.flatMap((chave) => {
    const achada = todas.find((e) => e.chave === chave);
    return achada ? [achada] : [];
  }),
  ...todas.filter((e) => !chavesDaLista.includes(e.chave)),
];
