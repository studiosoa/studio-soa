import type { Metadata } from "next";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import Galeria from "@/componentes/Galeria";
import FaixaCatalogo from "@/componentes/FaixaCatalogo";
import { exposicoes } from "@/conteudo/exposicoes";

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
// no estilo do catálogo, com nome e ano. O texto explicativo de cada mostra deixa
// de aparecer.
//
// Desde 11/11/2026 a página não calcula mais nada: cada mostra vem de
// `content/exposicoes/<chave>.json` com o estado final (nome, ano e as fotos já na
// ordem em que abrem), e a ordem das mostras vem de `content/ordem-exposicoes.json`.
// Quem edita é o painel do Tina. Ver `conteudo/exposicoes.ts`.
//
// O que NÃO foi feito, de propósito: o texto explicativo e a cidade de cada mostra
// continuam guardados nos arquivos, escondidos no painel. Parar de exibir não é
// apagar, e eles voltam sem ninguém precisar reescrever nada. Pelo mesmo motivo, as
// regras de `.page--exposicoes` continuam no `style-v2.css`: a página antiga ainda
// usa elas.
//
// Cada quadrado é a galeria daquela mostra, com as setas escondidas pelo CSS.
// Clicar abre a cortina de tela cheia com todas as fotos e as setas dela, então
// nenhuma foto se perdeu na simplificação.
export default function ExposicoesV2() {
  return (
    <PaginaV2 modificador="page--expo-v2" comLightbox>
      <section className="expo-grade">
        {/* O título "Exposições" saiu da vista (pedido do Pedro, 27/10), mas a
            página continua com o seu h1, para leitor de tela e busca: as mostras
            já dizem onde a pessoa está. */}
        <h1 className="so-leitor">Exposições</h1>

        <div className="expo-grade__lista">
          {exposicoes.map((expo) => (
            <article className="expo-card" key={expo.chave}>
              <Galeria
                className="expo-card__foto"
                quadros={expo.fotos.map((foto) => ({
                  tipo: "foto" as const,
                  ...foto,
                }))}
              />

              <div className="expo-card__meta">
                <h2 className="expo-card__nome">{expo.nome}</h2>
                {/* Só o ano (pedido do Pedro, 27/10): a cidade saiu da linha de
                    baixo. O ano só aparece quando existir: inventar data de
                    exposição é o tipo de erro que ninguém corrige depois. */}
                {expo.ano ? <p className="expo-card__dados">{expo.ano}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* A única página que mantém a faixa do catálogo, decisão da review. A
          imagem segue a de hoje até o Pedro indicar outra. */}
      <FaixaCatalogo semAnimacao href="/pecas" />
    </PaginaV2>
  );
}
