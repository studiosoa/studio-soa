import type { CSSProperties } from "react";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import BlocosDaHome from "@/componentes/v2/BlocosDaHome";
import Imagem from "@/componentes/Imagem";
import { home } from "@/conteudo/paginas";
import { manifestoV2 } from "@/conteudo/v2";

// Home da V2. Duas rodadas de revisão, 20/09 e 14/10, as duas no sentido de
// encurtar e de dar mais peso ao texto do que à imagem:
//
// 1. A seção da designer saiu (20/09). Era a maior da página e falava da Luiza,
//    não do estúdio, que é justamente o que a review inverteu.
// 2. A fileira das três peças saiu (14/10, o "X" vermelho do documento da
//    Luiza). As peças já têm a página delas, e o bloco "Peças" que fecha a home
//    leva até lá.
// 3. A faixa do catálogo virou três blocos colados, que levam às três páginas
//    que interessam (20/09).
// 4. O manifesto deixou de ser duas colunas com três fotos e virou um poema em
//    cima de uma foto chapada (14/10): "quero ênfase mais no texto do que nas
//    imagens, algo mais delicado". A foto passou a ser a da bandeja e a seção
//    ocupa a tela inteira (revisão de 14/10, segunda rodada).
// 5. O botão "conhecer mais peças" saiu (pedido do Pedro, 15/10). Era o único
//    caminho solto entre a foto do topo e o manifesto; o bloco "Peças" que fecha
//    a página já leva ao catálogo.

/** Quebra o manifesto em estrofes: a abertura, o fechamento e a citação. */
function estrofes() {
  return [
    [home.manifesto.abertura],
    home.manifesto.fechamento,
    home.manifesto.citacao,
  ];
}

export default function HomeV2() {
  // Número de ordem de cada linha do poema, para o CSS escalonar a entrada.
  let ordem = 0;

  return (
    <PaginaV2 modificador="page--home" classeDoMiolo="home" cabecalhoSobreposto>
      <section className="home-hero">
        <Imagem className="home-hero__img" foto={home.capa} />
      </section>

      {/* Manifesto. A foto é chapada, sem movimento, e cada bloco do texto
          estoura em opacidade, de zero a cem, quando a seção chega à tela. O
          véu escuro é só no canto do texto: a foto é muito clara, e texto
          branco direto na parede some. */}
      <section className="manifesto-poema" data-reveal>
        <Imagem
          className="manifesto-poema__img"
          foto={manifestoV2.foto}
          ariaHidden
        />

        <div className="manifesto-poema__texto">
          <p
            className="manifesto-poema__rotulo"
            style={{ "--i": ordem++ } as CSSProperties}
          >
            {home.manifesto.rotulo}
          </p>

          {estrofes().map((linhas, e) => (
            <div className="manifesto-poema__estrofe" key={e}>
              {linhas.map((linha) => (
                <p key={linha} style={{ "--i": ordem++ } as CSSProperties}>
                  {linha}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <BlocosDaHome />
    </PaginaV2>
  );
}
