import Link from "next/link";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import BlocosDaHome from "@/componentes/v2/BlocosDaHome";
import Imagem from "@/componentes/Imagem";
import { home } from "@/conteudo/paginas";
import { acharPeca } from "@/conteudo/pecas";
import { pecasDaHomeV2 } from "@/conteudo/v2";

// Home da V2, review de 20/09. Três mudanças, todas no sentido de encurtar:
//
// 1. A seção da designer saiu. Era a maior da página e falava da Luiza, não do
//    estúdio, que é justamente o que a review inverteu.
// 2. As peças ficam lado a lado e encostadas, em vez de uma grande à esquerda e
//    duas menores à direita.
// 3. A faixa do catálogo virou três blocos colados, que levam às três páginas
//    que interessam, em vez de um caminho só.
//
// O manifesto ficou, e o azul dele virou café no `style-v2.css`.

export default function HomeV2() {
  const pecas = pecasDaHomeV2
    .map((slug) => acharPeca(slug))
    .filter((peca) => peca !== undefined);

  return (
    <PaginaV2 modificador="page--home" classeDoMiolo="home" cabecalhoSobreposto>
      <section className="home-hero">
        <Imagem className="home-hero__img" foto={home.capa} />
      </section>

      {/* As três primeiras peças da ordem nova, no tamanho que elas têm no
          catálogo. Sem intervalo entre elas: a review pediu encostadas. O
          respiro entre a foto do topo e esta fileira veio em 22/09. */}
      <section className="home-pecas">
        {pecas.map((peca) => (
          <Link
            className="home-pecas__item"
            href={`/v2/pecas/${peca.slug}`}
            key={peca.slug}
            data-reveal
          >
            <Imagem foto={peca.cartao} />
            <span className="photo-overlay">
              <span className="photo-overlay__name">{peca.nome}</span>
            </span>
          </Link>
        ))}
      </section>

      {/* A home mostra três das cinco peças, então precisa de uma porta para o
          catálogo inteiro. Sem isto, quem quer ver mais depende de achar o
          "Peças" no menu.

          Usa `.btn--solid`, o mesmo botão de ação do resto do site, e não a
          `.home-cta`, que era um segundo desenho de botão cheio: corpo 12 em vez
          de 10,5, espaçamento 3,6 em vez de 2,1, sem seta e num café diferente.
          Dois botões primários com duas aparências era exatamente o que o Pedro
          mandou parar de fazer. */}
      <div className="home-mais">
        <Link className="btn btn--solid" href="/v2/pecas">
          <span>conhecer mais peças</span>
          <span className="btn__arrow">→</span>
        </Link>
      </div>

      <section className="home-manifesto">
        <div className="home-manifesto__col home-manifesto__col--left">
          <div
            className="home-manifesto__text home-manifesto__text--intro"
            data-reveal
          >
            <p className="home-manifesto__label">{home.manifesto.rotulo}</p>
            <p>{home.manifesto.abertura}</p>
          </div>

          <div className="desliza" data-desliza="esquerda">
            <div className="home-photo home-manifesto__photo--tall">
              <Imagem foto={home.manifesto.fotoAlta} />
            </div>
          </div>

          <div
            className="home-manifesto__text home-manifesto__text--outro"
            data-reveal
          >
            {home.manifesto.fechamento.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="home-manifesto__col">
          <div className="desliza" data-desliza="direita">
            <div className="home-photo home-manifesto__photo--wide">
              <Imagem foto={home.manifesto.fotoLarga} />
            </div>
          </div>

          <div className="home-manifesto__quote" data-reveal>
            <div>
              {home.manifesto.citacao.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="desliza" data-desliza="direita">
            <div className="home-photo home-manifesto__photo--wide">
              <Imagem foto={home.manifesto.fotoDaMao} />
            </div>
          </div>
        </div>
      </section>

      <BlocosDaHome />
    </PaginaV2>
  );
}
