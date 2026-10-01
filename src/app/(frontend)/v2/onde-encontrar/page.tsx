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

// Onde encontrar da V2, review de 20/09. A página inverteu a ordem de quem
// atende: o estúdio vem primeiro, a loja depois.
//
// O mapa interativo saiu. Ele foi construído em 14/09 com Leaflet, e o alfinete
// nunca chegou a marcar a porta da loja, só o quarteirão, porque a Ozlo não está
// cadastrada no OpenStreetMap. O botão "Abrir no mapa" resolve no ponto exato,
// no Google Maps, e é o que ficou.
//
// `Mapa.tsx`, o mapa desenhado à mão e a biblioteca Leaflet continuam no
// projeto, sem uso. Estão listados como candidatos a limpeza no relatório, e
// nada some sem o Pedro dizer sim.
export default function OndeEncontrarV2() {
  return (
    <PaginaV2 modificador="page--onde">
      <section className="onde onde--v2">
        {/* Lugar reservado para a foto da loja, que depende da Luiza. É um
            quadro vazio e assumidamente vazio: pôr uma foto qualquer aqui
            correria o risco de alguém achar que é a Ozlo de verdade e aprovar
            sem olhar. O texto dentro dele some no dia em que a foto chegar. */}
        <div className="onde__foto onde__foto--vazia" aria-hidden="true">
          <span>foto da loja</span>
        </div>

        <div className="onde__conteudo">
          {/* O rótulo "Onde encontrar" acima do título saiu: repetia o que o
              menu e o próprio título já diziam. */}
          <h1 className="onde__titulo">{ondeEncontrarV2.titulo}</h1>

          {/* Atendimento do estúdio, antes da loja e com mais peso que ela.
              Pedido do Pedro em 22/09: a compra direta com a designer é o
              caminho principal, e a loja é a alternativa de quem quer ver a
              peça de perto antes. */}
          <div className="onde-atendimento">
            <p className="onde-atendimento__rotulo">compre direto com o studio</p>
            <p className="onde-atendimento__texto">
              {ondeEncontrarV2.atendimento.texto}
            </p>
            <a
              className="btn btn--solid"
              href={linkDeWhatsapp(MENSAGEM_PADRAO)}
              target="_blank"
              rel="noopener"
            >
              <span>{ondeEncontrarV2.atendimento.rotuloDoLink}</span>
              <span className="btn__arrow">→</span>
            </a>

            {/* Texto da Luiza, ainda não escrito. Enquanto for vazio, não
                aparece: campo em branco no ar é pior que campo nenhum. */}
            {ondeEncontrarV2.reforcoDaCompra ? (
              <p className="onde-atendimento__reforco">
                {ondeEncontrarV2.reforcoDaCompra}
              </p>
            ) : null}
          </div>

          {/* A loja, depois e mais discreta: é para quem quer ver a peça
              pessoalmente antes de decidir. */}
          <div className="onde-loja">
            <p className="onde-loja__rotulo">
              ou veja as peças pessoalmente
            </p>
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
              <p className="onde-loja__aviso">
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
        </div>
      </section>
    </PaginaV2>
  );
}
