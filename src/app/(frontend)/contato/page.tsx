import type { Metadata } from "next";

import Pagina from "@/componentes/Pagina";
import Imagem from "@/componentes/Imagem";
import FormContato from "@/componentes/FormContato";
import { site, linkDeWhatsapp } from "@/conteudo/site";
import { contato } from "@/conteudo/paginas";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Studio Sôa sobre uma peça, a madeira, o prazo ou o jeito como o estúdio trabalha.",
};

export default function Contato() {
  return (
    <Pagina modificador="page--contato">
      <section className="contato">
        <div className="contato__foto">
          <Imagem foto={contato.foto} />
        </div>

        <div className="contato__conteudo">
          <p className="contato__rotulo">{contato.rotulo}</p>
          <h1 className="contato__titulo">{contato.titulo}</h1>
          <p className="contato__lead">{contato.lead}</p>

          <FormContato />

          <ul className="contato__redes">
            <li>
              <a
                href={linkDeWhatsapp("Olá! Vim pelo site do Studio Sôa.")}
                target="_blank"
                rel="noopener"
              >
                <svg className="ico" aria-hidden="true">
                  <use href="/assets/icons.svg#ic-whatsapp" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </li>
            {site.rodape.links
              .filter((link) => link.icone !== "ic-email")
              .map((link) => (
                <li key={link.rotulo}>
                  <a href={link.href} target="_blank" rel="noopener">
                    <svg className="ico" aria-hidden="true">
                      <use href={`/assets/icons.svg#${link.icone}`} />
                    </svg>
                    <span>{link.rotulo}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </Pagina>
  );
}
