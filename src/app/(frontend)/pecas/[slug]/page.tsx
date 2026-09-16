import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Pagina from "@/componentes/Pagina";
import Imagem, { recorteDe } from "@/componentes/Imagem";
import Galeria from "@/componentes/Galeria";
import CartaoChamada from "@/componentes/CartaoChamada";
import { pecas, acharPeca } from "@/conteudo/pecas";
import { linkDeWhatsapp, linkDeEmail } from "@/conteudo/site";

// Aqui está o ganho mais concreto da mudança de framework: as cinco páginas de
// peça, que eram cinco arquivos HTML quase idênticos, viraram um molde só. Uma
// peça nova passa a ser um item em `conteudo/pecas.ts`, e amanhã uma linha no
// Payload, sem ninguém copiar arquivo e trocar texto dentro.

type Props = { params: Promise<{ slug: string }> };

/** Gera as cinco rotas no build. Com o Payload, passa a ler do banco. */
export function generateStaticParams() {
  return pecas.map((peca) => ({ slug: peca.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const peca = acharPeca(slug);
  if (!peca) return {};
  return {
    title: peca.nome,
    description: peca.descricao[0],
  };
}

export default async function PaginaDaPeca({ params }: Props) {
  const { slug } = await params;
  const peca = acharPeca(slug);
  if (!peca) notFound();

  const proxima = acharPeca(peca.proxima);

  return (
    <Pagina comLightbox>
      <section className="hero">
        <Imagem className="hero__img" foto={peca.capa} />
        <h1 className="hero__title">{peca.titulo}</h1>
      </section>

      <section className="description">
        <div className="description__inner wrap">
          {peca.descricao.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="product wrap">
        <div className="product__gallery">
          <Galeria quadros={peca.galeria} />
        </div>

        <div className="product__info">
          <div className="spec-list" data-reveal>
            {peca.ficha.map((linha) => (
              <div className="spec-row" key={linha.rotulo}>
                <span className="spec-row__label">{linha.rotulo}</span>
                {linha.valores.map((valor) => (
                  <span className="spec-row__value" key={valor}>
                    {valor}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {peca.acabamentos?.map((bloco) => (
            <div className="finish-block" key={bloco.rotulo} data-reveal>
              <span className="finish-block__label">{bloco.rotulo}</span>
              <div className="swatches">
                {bloco.itens.map((item) => (
                  <button className="swatch" type="button" key={item.nome}>
                    <span
                      className="swatch__color"
                      style={
                        item.textura
                          ? { backgroundImage: `url('${item.textura}')` }
                          : { backgroundColor: item.cor }
                      }
                    />
                    <span className="swatch__label">{item.nome}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="product__actions" data-reveal>
            <a
              className="btn btn--solid"
              href={linkDeWhatsapp(
                `Olá! Gostaria de saber mais sobre ${peca.artigo} ${peca.nome}.`,
              )}
              target="_blank"
              rel="noopener"
            >
              <span>Solicitar esta peça</span>
              <span className="btn__arrow">→</span>
            </a>
            <a
              className="btn btn--outline"
              href={linkDeEmail(`Dúvida sobre ${peca.artigo} ${peca.nome}`)}
            >
              <span>Tire dúvidas com o estúdio</span>
              <span className="btn__arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="related">
        <Link className="related__item" href={`/pecas/${peca.proxima}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-parallax="up"
            src={peca.fotoDaProxima.src}
            alt={peca.fotoDaProxima.alt}
            style={recorteDe(peca.fotoDaProxima)}
          />
          <span className="related__overlay">
            <span className="related__name">
              {proxima ? proxima.nome : peca.fotoDaProxima.alt}
            </span>
          </span>
        </Link>

        <CartaoChamada
          className="related__item"
          href="/pecas"
          texto="CONHEÇA O NOSSO CATÁLOGO"
          fundo={peca.fundoDoCatalogo}
        />
      </section>
    </Pagina>
  );
}
