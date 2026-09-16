import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import Pagina from "@/componentes/Pagina";
import Mapa from "@/componentes/Mapa";
import FaixaCatalogo from "@/componentes/FaixaCatalogo";
import { site } from "@/conteudo/site";
import { ondeEncontrar } from "@/conteudo/paginas";

export const metadata: Metadata = {
  title: "Onde encontrar",
  description:
    "As peças do Studio Sôa estão na Ozlo Home Brand, na Praia do Canto, em Vitória.",
};

export default function OndeEncontrar() {
  return (
    <Pagina modificador="page--onde">
      <section className="onde">
        <Mapa />

        <div className="onde__conteudo">
          <p className="onde__rotulo">{ondeEncontrar.rotulo}</p>
          <h1 className="onde__titulo">{ondeEncontrar.titulo}</h1>

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

          <a
            className="btn btn--outline"
            href={site.loja.linkDoMapa}
            target="_blank"
            rel="noopener"
          >
            <span>Abrir no mapa</span>
            <span className="btn__arrow">→</span>
          </a>

          <p className="onde__nota">
            {ondeEncontrar.nota} <Link href="/contato">fale com a gente</Link>.
          </p>
        </div>
      </section>

      <FaixaCatalogo semAnimacao />
    </Pagina>
  );
}
