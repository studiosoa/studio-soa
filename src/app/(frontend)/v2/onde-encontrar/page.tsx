import { Fragment } from "react";
import type { Metadata } from "next";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import { site, linkDeWhatsapp } from "@/conteudo/site";
import { ondeEncontrarV2, MENSAGEM_PADRAO } from "@/conteudo/v2";

export const metadata: Metadata = {
  title: "Onde encontrar",
  description:
    "Compre direto com o Studio Sôa, ou encontre as peças na Ozlo Home Brand, na Praia do Canto, em Vitória.",
};

// Onde encontrar da V2, refeita na revisão de 14/10: só texto, sem foto, tudo
// centrado, em duas faixas. A de cima é bege e traz a compra direta com o
// estúdio; a de baixo é branca e traz a loja.
//
// Saíram o quadro vazio reservado para a foto da loja e o bloco café do
// atendimento. A Luiza desenhou a página sem imagem de propósito, e o café
// ficava pesado demais num bloco que é só um convite a chamar no WhatsApp.
//
// O mapa interativo saiu em 22/09. Ele foi construído em 14/09 com Leaflet, e o
// alfinete nunca chegou a marcar a porta da loja, só o quarteirão, porque a Ozlo
// não está cadastrada no OpenStreetMap. O botão "Abrir no mapa" resolve no ponto
// exato, no Google Maps, e é o que ficou.
//
// `Mapa.tsx`, o mapa desenhado à mão e a biblioteca Leaflet continuam no
// projeto, sem uso. Estão listados como candidatos a limpeza no relatório, e
// nada some sem o Pedro dizer sim.
export default function OndeEncontrarV2() {
  const { atendimento, loja } = ondeEncontrarV2;

  return (
    <PaginaV2 modificador="page--onde">
      {/* 1. A compra direta vem primeiro: é o caminho principal. O título da
          página é este, o que a pessoa lê antes de qualquer coisa. */}
      <section className="onde-secao onde-secao--bege">
        <div className="onde-secao__conteudo">
          <h1 className="onde-secao__titulo">{atendimento.titulo}</h1>
          <p className="onde-secao__texto">{atendimento.texto}</p>

          <a
            className="btn btn--solid"
            href={linkDeWhatsapp(MENSAGEM_PADRAO)}
            target="_blank"
            rel="noopener"
          >
            <span>{atendimento.rotuloDoLink}</span>
            <span className="btn__arrow">→</span>
          </a>

          {/* Texto da Luiza, ainda não escrito. Enquanto for vazio, não
              aparece: campo em branco no ar é pior que campo nenhum. */}
          {ondeEncontrarV2.reforcoDaCompra ? (
            <p className="onde-secao__aviso">
              {ondeEncontrarV2.reforcoDaCompra}
            </p>
          ) : null}
        </div>
      </section>

      {/* 2. A loja, depois: é para quem quer ver a peça pessoalmente antes de
          decidir. */}
      <section className="onde-secao onde-secao--branca">
        <div className="onde-secao__conteudo">
          <p className="onde-secao__rotulo">{loja.rotulo}</p>

          <address className="onde__endereco">
            <p className="onde__loja">{site.loja.nome}</p>
            <p>
              {site.loja.linhasDoEndereco.map((linha, i) => (
                <Fragment key={linha}>
                  {i > 0 ? <br /> : null}
                  {linha}
                </Fragment>
              ))}
            </p>
          </address>

          {/* Igual ao anterior: espera o texto dela sobre a disponibilidade
              das peças na loja variar. */}
          {ondeEncontrarV2.avisoDeDisponibilidade ? (
            <p className="onde-secao__aviso">
              {ondeEncontrarV2.avisoDeDisponibilidade}
            </p>
          ) : null}

          <a
            className="btn btn--outline"
            href={site.loja.linkDoMapa}
            target="_blank"
            rel="noopener"
          >
            <span>Abrir no mapa</span>
            <span className="btn__arrow">→</span>
          </a>
        </div>
      </section>
    </PaginaV2>
  );
}
