import type { Metadata } from "next";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import Imagem from "@/componentes/Imagem";
import { sobre } from "@/conteudo/paginas";
import { sobreV2 } from "@/conteudo/v2";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "O Studio Sôa: design autoral brasileiro nascido em 2025, entre escultura, materialidade e cotidiano.",
};

// Sobre da V2, review de 20/09.
//
// A ordem virou de cabeça para baixo, e é a mudança que carrega o sentido: a
// página abre no estúdio e só depois apresenta quem o criou. Antes abria na
// pessoa. É a mesma decisão que trocou "criadora das peças" por "estúdio" no
// catálogo.
//
// "Sobre Studio" virou "O studio", "Luiza Pessôa" virou "Criadora e designer",
// e a faixa do catálogo do fim saiu. O texto dos parágrafos continua o da
// Luiza, e ela ficou de mandar a revisão.
export default function SobreV2() {
  return (
    <PaginaV2 modificador="page--sobre">
      {/* 1. O studio. O branco cru é o teste que ela pediu: este é o único
          bloco fora do creme do resto do site. Tirar a classe
          `sobre-studio--branco` devolve o creme, sem mexer em mais nada. */}
      <section className="sobre-studio sobre-studio--branco">
        <div className="sobre-studio__texto">
          <div className="sobre-studio__bloco">
            <h1 className="sobre-studio__titulo" data-reveal>
              {sobreV2.tituloDoEstudio}
            </h1>
            {/* O negrito é parte do texto (revisão de 14/10, os trechos que a
                Luiza sublinhou), então o parágrafo entra como HTML, igual ao
                do perfil logo abaixo. */}
            {sobre.estudio.paragrafos.map((p, i) => (
              <p key={i} data-reveal dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>

        <div className="sobre-studio__foto looping" data-reveal>
          {sobre.estudio.looping.map((foto, i) => (
            <Imagem
              key={foto.src}
              foto={foto}
              className={
                i === 1 ? "looping__b" : i === 2 ? "looping__c" : undefined
              }
              ariaHidden={i > 0}
            />
          ))}
        </div>
      </section>

      {/* 2. Criadora e designer. O nome dela sai do título e fica no texto: é a
          exceção combinada na review, o único lugar que continua apresentando a
          pessoa. */}
      <section className="perfil" data-reveal>
        <div className="perfil__inner">
          <div className="perfil__foto">
            <Imagem foto={sobre.perfil.foto} />
          </div>

          <div className="perfil__texto">
            <h2 className="perfil__nome">{sobreV2.tituloDoPerfil}</h2>
            {/* O negrito faz parte do texto da Luiza, então o parágrafo entra
                como HTML. Quando virar rich text no CMS, muda a fonte do dado e
                não este componente. */}
            {sobre.perfil.paragrafos.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Manifesto. Era o bloco azul, virou café no `style-v2.css`. */}
      <section className="frase" data-reveal>
        <Imagem className="frase__img" foto={sobre.frase.foto} ariaHidden />
        <p className="frase__texto">{sobre.frase.texto}</p>
      </section>
    </PaginaV2>
  );
}
