import type { Metadata } from "next";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import Galeria from "@/componentes/Galeria";
import FaixaCatalogo from "@/componentes/FaixaCatalogo";
import { exposicoes } from "@/conteudo/exposicoes";
import { anosDasExposicoes, mostraV2 } from "@/conteudo/v2";

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
        <h1 className="expo-grade__titulo">Exposições</h1>

        <div className="expo-grade__lista">
          {exposicoes.map((expo) => {
            // A quebra de linha no nome servia à lista vertical da página
            // antiga, onde "BAB" caía sozinha na segunda linha. No quadrado ela
            // não tem função.
            const nome = expo.nome.replace(/\n/g, " ");
            const ano = anosDasExposicoes[expo.chave];

            // Monta as fotos desta mostra em três passos, nesta ordem: tira as
            // escondidas, roda a lista até a escolhida abrir, e troca o arquivo
            // ou o recorte da capa. Nada disso mexe em `exposicoes.ts`, que é o
            // conteúdo que a página antiga também usa.
            const conf = mostraV2[expo.chave] ?? {};

            const visiveis = conf.esconder
              ? expo.fotos.filter(
                  (foto) =>
                    !conf.esconder!.some((trecho) => foto.src.includes(trecho)),
                )
              : expo.fotos;

            const abre = conf.abrePor ?? 0;
            const fotos = [
              ...visiveis.slice(abre),
              ...visiveis.slice(0, abre),
            ].map((foto, i) =>
              i === 0
                ? {
                    ...foto,
                    ...(conf.capaSrc ? { src: conf.capaSrc } : {}),
                    ...(conf.capaRecorte ? { recorte: conf.capaRecorte } : {}),
                  }
                : foto,
            );

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
                  {/* O ano só aparece quando existir. A Luiza ficou de mandar
                      os quatro junto com a revisão dos nomes, e inventar data
                      de exposição é o tipo de erro que ninguém corrige depois. */}
                  <p className="expo-card__dados">
                    {ano ? `${ano} · ` : ""}
                    {expo.local}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* A única página que mantém a faixa do catálogo, decisão da review. A
          imagem segue a de hoje até o Pedro indicar outra. */}
      <FaixaCatalogo semAnimacao href="/v2/pecas" />
    </PaginaV2>
  );
}
