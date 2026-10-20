import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import Imagem, { recorteDe } from "@/componentes/Imagem";
import Galeria from "@/componentes/Galeria";
import CartaoChamada from "@/componentes/CartaoChamada";
import { acharPeca } from "@/conteudo/pecas";
import { site, linkDeWhatsapp, linkDeEmail } from "@/conteudo/site";
import {
  ordemDasPecasV2,
  pecaV2,
  fotoGrandeDaPeca,
  fundoDoCartaoDePeca,
} from "@/conteudo/v2";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ordemDasPecasV2.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const peca = acharPeca(slug);
  if (!peca) return {};
  return { title: peca.nome, description: peca.descricao[0] };
}

export default async function PaginaDaPecaV2({ params }: Props) {
  const { slug } = await params;
  const peca = acharPeca(slug);
  if (!peca) notFound();

  // A próxima peça sai da ordem nova, não do campo `proxima` de cada peça.
  // Assim o atalho do rodapé acompanha sozinho qualquer reordenação, em vez de
  // exigir que alguém lembre de reescrever cinco campos e acerte o ciclo.
  const posicao = ordemDasPecasV2.indexOf(peca.slug);
  const slugDaProxima =
    ordemDasPecasV2[(posicao + 1) % ordemDasPecasV2.length];
  const proxima = acharPeca(slugDaProxima);

  // A foto grande do atalho vem da peça de destino, não de um campo desta peça:
  // com a ordem nova, o campo antigo mostraria a foto errada embaixo do nome
  // certo. Ver `fotoGrandeDaPeca` em `conteudo/v2.ts`.
  const fotoDaProxima = fotoGrandeDaPeca[slugDaProxima] ?? peca.fotoDaProxima;

  // O vídeo do Adorno Balanço abre a galeria em vez de fechá-la, pedido dela na
  // review. Ordenação estável: só o vídeo sobe, o resto mantém a ordem.
  const galeria = pecaV2.videoPrimeiro.includes(peca.slug)
    ? [
        ...peca.galeria.filter((q) => q.tipo === "video"),
        ...peca.galeria.filter((q) => q.tipo !== "video"),
      ]
    : peca.galeria;

  return (
    <PaginaV2 comLightbox>
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
          <Galeria quadros={galeria} />
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
                `Olá! Vim pelo site do Studio Sôa. Gostaria de comprar ${peca.artigo} ${peca.nome}.`,
                peca.whatsapp,
              )}
              target="_blank"
              rel="noopener"
            >
              <span>{pecaV2.botoes.comprar}</span>
              <span className="btn__arrow">→</span>
            </a>
            <a
              className="btn btn--outline"
              href={linkDeEmail(`Dúvida sobre ${peca.artigo} ${peca.nome}`)}
            >
              <span>{pecaV2.botoes.duvidas}</span>
              <span className="btn__arrow">→</span>
            </a>
            <a
              className="btn btn--outline"
              href={peca.bloco3d ?? site.blocos3d}
              target="_blank"
              rel="noopener"
            >
              <span>{pecaV2.botoes.bloco3d}</span>
              <span className="btn__arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="related">
        <Link className="related__item" href={`/pecas/${slugDaProxima}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-parallax="up"
            src={fotoDaProxima.src}
            alt={fotoDaProxima.alt}
            style={recorteDe(fotoDaProxima)}
          />
          <span className="related__overlay">
            <span className="related__name">
              {proxima ? proxima.nome : fotoDaProxima.alt}
            </span>
          </span>
        </Link>

        {/* "Conheça o nosso catálogo" virou "Mais peças" só aqui. A Exposições
            mantém o rótulo antigo até o Pedro dizer o contrário.

            O fundo vem de `fundoDoCartaoDePeca` e não do campo da peça: o campo
            foi escolhido para a ordem antiga, e na Mesa Onda dava a MESMA foto
            que a do atalho à esquerda, lado a lado. */}
        <CartaoChamada
          className="related__item"
          href="/pecas"
          texto={pecaV2.atalhoDoCatalogo}
          fundo={fundoDoCartaoDePeca(peca.slug)}
        />
      </section>
    </PaginaV2>
  );
}
