import type { Metadata } from "next";
import Link from "next/link";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import Imagem from "@/componentes/Imagem";
import CartaoChamada from "@/componentes/CartaoChamada";
import { acharPeca } from "@/conteudo/pecas";
import { ordemDasPecasV2, catalogoV2 } from "@/conteudo/v2";

export const metadata: Metadata = {
  title: "Peças",
  description:
    "O catálogo do Studio Sôa: mobiliário e objetos de design autoral em madeira maciça e serralheria.",
};

// Catálogo da V2. Duas mudanças da review de 20/09: a ordem nova das peças e o
// cartão do fim, que deixa de falar da criadora e passa a falar do estúdio.
//
// As fotos perderam a borda, mas isso não está aqui: saiu no `--tile-border` do
// `style-v2.css`, porque é pele e vale para as duas versões.
export default function CatalogoV2() {
  const pecas = ordemDasPecasV2
    .map((slug) => acharPeca(slug))
    .filter((peca) => peca !== undefined);

  return (
    <PaginaV2 modificador="page--catalogo">
      <section className="catalogo">
        {pecas.map((peca) => (
          <Link
            className="catalogo__item"
            href={`/pecas/${peca.slug}`}
            key={peca.slug}
            data-reveal
          >
            <Imagem foto={peca.cartao} />
            <span className="catalogo__overlay">
              <span className="catalogo__name">{peca.nome}</span>
            </span>
          </Link>
        ))}

        <CartaoChamada
          className="catalogo__item"
          href="/sobre"
          texto={catalogoV2.cartaoFinal}
          reveal
        />
      </section>
    </PaginaV2>
  );
}
