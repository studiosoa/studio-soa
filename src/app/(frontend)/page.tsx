import Link from "next/link";

import Pagina from "@/componentes/Pagina";
import Imagem from "@/componentes/Imagem";
import FaixaCatalogo from "@/componentes/FaixaCatalogo";
import { home } from "@/conteudo/paginas";

export default function Home() {
  return (
    <Pagina modificador="page--home" classeDoMiolo="home" cabecalhoSobreposto>
      <section className="home-hero">
        <Imagem className="home-hero__img" foto={home.capa} />
      </section>

      <section className="home-band__bg">
        <div className="home-band">
          <div className="home-band__left">
            <Link
              className="home-photo"
              href={`/pecas/${home.vitrine.esquerda.peca}`}
              data-reveal
            >
              <Imagem foto={home.vitrine.esquerda.foto} />
              <span className="photo-overlay">
                <span className="photo-overlay__name">
                  {home.vitrine.esquerda.nome}
                </span>
              </span>
            </Link>
            <Link
              className="home-cta home-band__cta"
              href={home.vitrine.chamada.href}
              data-reveal
            >
              {home.vitrine.chamada.rotulo}
            </Link>
          </div>

          <div className="home-band__right">
            {home.vitrine.direita.map((item) => (
              <Link
                className="home-photo"
                href={`/pecas/${item.peca}`}
                key={item.peca}
                data-reveal
              >
                <Imagem foto={item.foto} />
                <span className="photo-overlay">
                  <span className="photo-overlay__name">{item.nome}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-designer">
        <div className="home-designer__photo" data-reveal>
          <Imagem foto={home.designer.foto} />
        </div>

        <div className="home-designer__text">
          <p className="home-eyebrow" data-reveal>
            {home.designer.sobrancelha}
          </p>
          <h2 className="home-designer__title" data-reveal>
            {home.designer.titulo}
          </h2>
          <p className="home-designer__lead" data-reveal>
            {home.designer.resumo}
          </p>
          <Link
            className="home-cta home-cta--light"
            href={home.designer.chamada.href}
            data-reveal
          >
            {home.designer.chamada.rotulo}
          </Link>
        </div>
      </section>

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

      <FaixaCatalogo />
    </Pagina>
  );
}
