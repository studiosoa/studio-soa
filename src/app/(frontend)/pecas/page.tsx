import type { Metadata } from "next";
import Link from "next/link";

import Pagina from "@/componentes/Pagina";
import Imagem from "@/componentes/Imagem";
import CartaoChamada from "@/componentes/CartaoChamada";
import { pecas } from "@/conteudo/pecas";

export const metadata: Metadata = {
  title: "Peças",
  description:
    "O catálogo do Studio Sôa: mobiliário e objetos de design autoral em madeira maciça e serralheria.",
};

export default function Catalogo() {
  return (
    <Pagina modificador="page--catalogo">
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
          texto="CONHEÇA MAIS SOBRE A CRIADORA DAS PEÇAS"
          reveal
        />
      </section>
    </Pagina>
  );
}
