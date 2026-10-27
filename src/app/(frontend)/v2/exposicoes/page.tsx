import type { Metadata } from "next";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import Galeria from "@/componentes/Galeria";
import FaixaCatalogo from "@/componentes/FaixaCatalogo";
import { exposicoes } from "@/conteudo/exposicoes";
import {
  anosDasExposicoes,
  mostraV2,
  ordemDasExposicoesV2,
} from "@/conteudo/v2";

export const metadata: Metadata = {
  title: "Exposições",
  description:
    "As mostras e prêmios de que o Studio Sôa participou: Club&Casa Autoral 6, DW! São Paulo, BAB e Casacor ES.",
};

// Exposições da V2. É a página mais refeita da review de 20/09.
//
// A de antes era marrom de ponta a ponta, com logo branca, uma lista de nomes à
// esquerda e um painel que trocava foto e texto ao passar o mouse. Sai tudo: a
// página passa a ter fundo claro como as outras e vira uma grade de quadrados,
// no estilo do catálogo, com nome, ano e cidade. O texto explicativo de cada
// mostra deixa de aparecer.
//
// O que NÃO foi feito, de propósito: os textos explicativos continuam inteiros
// em `conteudo/exposicoes.ts`. Parar de exibir não é apagar, e eles voltam sem
// ninguém precisar reescrever nada. Pelo mesmo motivo, as regras de
// `.page--exposicoes` continuam no `style-v2.css`: a página antiga ainda usa
// elas, e é ela que está no ar.
//
// Cada quadrado é a galeria daquela mostra, com as setas escondidas pelo CSS.
// Clicar abre a cortina de tela cheia com todas as fotos e as setas dela, então
// nenhuma foto se perdeu na simplificação.
export default function ExposicoesV2() {
  return (
    <PaginaV2 modificador="page--expo-v2" comLightbox>
      <section className="expo-grade">
        {/* O título "Exposições" saiu da vista (pedido do Pedro, 27/10), mas a
            página continua com o seu h1, para leitor de tela e busca: as quatro
            mostras já dizem onde a pessoa está. */}
        <h1 className="so-leitor">Exposições</h1>

        <div className="expo-grade__lista">
          {ordemDasExposicoesV2.map((chave) => {
            const expo = exposicoes.find((e) => e.chave === chave);
            if (!expo) return null;

            const conf = mostraV2[expo.chave] ?? {};

            // O nome escrito por extenso em `mostraV2` ganha do de
            // `exposicoes.ts`. Sem ele, cai no de lá, sem a quebra de linha que
            // servia à lista vertical da página antiga (onde "BAB" caía sozinha
            // na segunda linha) e que no quadrado não tem função.
            const nome = conf.nome ?? expo.nome.replace(/\n/g, " ");
            const ano = anosDasExposicoes[expo.chave];

            // Monta as fotos desta mostra em quatro passos, nesta ordem: põe as
            // que entram na frente, tira as escondidas, troca o arquivo ou o
            // recorte das que foram reenquadradas, e roda a lista até a
            // escolhida abrir. Nada disso mexe em `exposicoes.ts`, que é o
            // conteúdo que a página antiga também usa.
            const todas = [...(conf.antes ?? []), ...expo.fotos];

            const visiveis = conf.esconder
              ? todas.filter(
                  (foto) =>
                    !conf.esconder!.some((trecho) => foto.src.includes(trecho)),
                )
              : todas;

            const ajustadas = visiveis.map((foto) => {
              const ajuste = conf.ajustes?.find((a) => foto.src.includes(a.trecho));
              return ajuste
                ? {
                    ...foto,
                    ...(ajuste.src ? { src: ajuste.src } : {}),
                    ...(ajuste.recorte ? { recorte: ajuste.recorte } : {}),
                  }
                : foto;
            });

            const abre = conf.abrePor ?? 0;
            const girada = [
              ...ajustadas.slice(abre),
              ...ajustadas.slice(0, abre),
            ];

            // Se a mostra tem `ordem`, ela manda: cada foto vai para a posição do
            // primeiro trecho que casar com o caminho dela, e as que não casam
            // com nenhum ficam no fim, na ordem em que estavam.
            const posicao = (foto: (typeof girada)[number]) => {
              const i = conf.ordem?.findIndex((trecho) =>
                foto.src.includes(trecho),
              );
              return i === undefined || i < 0 ? Number.MAX_SAFE_INTEGER : i;
            };
            const fotos = conf.ordem
              ? [...girada].sort((a, b) => posicao(a) - posicao(b))
              : girada;

            return (
              <article className="expo-card" key={expo.chave}>
                <Galeria
                  className="expo-card__foto"
                  quadros={fotos.map((foto) => ({
                    tipo: "foto" as const,
                    ...foto,
                  }))}
                />

                <div className="expo-card__meta">
                  <h2 className="expo-card__nome">{nome}</h2>
                  {/* Só o ano (pedido do Pedro, 27/10): a cidade saiu da
                      linha de baixo. Ela continua em `exposicoes.ts`, que
                      outras partes do site leem. O ano só aparece quando
                      existir: inventar data de exposição é o tipo de erro que
                      ninguém corrige depois. Os quatro chegaram na revisão de
                      14/10. */}
                  {ano ? <p className="expo-card__dados">{ano}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* A única página que mantém a faixa do catálogo, decisão da review. A
          imagem segue a de hoje até o Pedro indicar outra. */}
      <FaixaCatalogo semAnimacao href="/pecas" />
    </PaginaV2>
  );
}
