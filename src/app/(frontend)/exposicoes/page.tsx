import { Fragment } from "react";
import type { Metadata } from "next";

import Pagina from "@/componentes/Pagina";
import Galeria from "@/componentes/Galeria";
import FaixaCatalogo from "@/componentes/FaixaCatalogo";
import { exposicoes } from "@/conteudo/exposicoes";

export const metadata: Metadata = {
  title: "Exposições",
  description:
    "As mostras e prêmios de que o Studio Sôa participou: Club&Casa Autoral 6, DW! São Paulo, BAB e Casacor ES.",
};

export default function Exposicoes() {
  const primeira = exposicoes[0].chave;

  return (
    <Pagina modificador="page--exposicoes" comLightbox>
      <section className="expo" data-expo-secao>
        <div className="expo__inner">
          <div className="expo__coluna">
            <h1 className="expo__titulo">EXPOSIÇÕES</h1>

            {/* Cada nome é um botão: o mouse troca por cima, o toque troca no
                clique e o teclado troca no foco.
                No celular esta lista vira uma tira que corre de lado, um nome
                por tela, e arrastar troca a mostra. Ver `.expo__nomes` no CSS. */}
            <ul className="expo__nomes" data-expo-tira>
              {exposicoes.map((expo) => (
                <li key={expo.chave}>
                  <button
                    className={`expo__nome${expo.chave === primeira ? " is-ativo" : ""}`}
                    type="button"
                    data-expo={expo.chave}
                    aria-controls={`painel-${expo.chave}`}
                  >
                    {/* A quebra vem do conteúdo: em negrito o nome da BAB
                        reflui sozinho e joga só "BAB" para a segunda linha. */}
                    {expo.nome.split("\n").map((linha, i) => (
                      <Fragment key={i}>
                        {i > 0 ? <br /> : null}
                        {linha}
                      </Fragment>
                    ))}
                  </button>
                </li>
              ))}
            </ul>

            {/* Pontos só de celular: numa tira que corre de lado, sem eles não
                há como saber que existem mais três mostras atrás da borda. */}
            <div className="expo__pontos" data-expo-pontos aria-hidden="true">
              {exposicoes.map((expo) => (
                <span
                  className={`expo__ponto${expo.chave === primeira ? " is-ativo" : ""}`}
                  data-ponto={expo.chave}
                  key={expo.chave}
                />
              ))}
            </div>
          </div>

          <div className="expo__painel">
            {/* As galerias ficam empilhadas na mesma célula de grade: a altura é
                a da maior e a troca é um esmaecer de uma sobre a outra, sem o
                quadro pular de tamanho. */}
            <div className="expo__quadros">
              {exposicoes.map((expo) => (
                <div
                  className={`expo__quadro${expo.chave === primeira ? " is-ativo" : ""}`}
                  id={`painel-${expo.chave}`}
                  data-painel={expo.chave}
                  key={expo.chave}
                >
                  <Galeria
                    className="expo__galeria"
                    quadros={expo.fotos.map((foto) => ({
                      tipo: "foto" as const,
                      ...foto,
                    }))}
                  />
                </div>
              ))}
            </div>

            {/* Mesma grade empilhada para os textos: um sai pela esquerda, o
                outro entra logo atrás, e o bloco nunca muda de altura. */}
            <div className="expo__textos">
              {exposicoes.map((expo) => (
                <div
                  className={`expo__texto${expo.chave === primeira ? " is-ativo" : ""}`}
                  data-texto={expo.chave}
                  key={expo.chave}
                >
                  <div className="expo__local">
                    <p className="expo__rotulo">Localização</p>
                    <p>{expo.local}</p>
                  </div>
                  <div className="expo__descricao">
                    {expo.descricao.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaixaCatalogo semAnimacao />
    </Pagina>
  );
}
