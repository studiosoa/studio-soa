import type { Metadata } from "next";

import PaginaV2 from "@/componentes/v2/PaginaV2";
import Imagem from "@/componentes/Imagem";
import FormContato from "@/componentes/FormContato";
import { site, linkDeWhatsapp } from "@/conteudo/site";
import { contato } from "@/conteudo/paginas";
import { contatoV2, MENSAGEM_PADRAO } from "@/conteudo/v2";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Studio Sôa sobre peças, materiais, encomendas sob medida, prazos e produção.",
};

// Contato da V2. Muda só o texto de apoio, que passa a listar o que dá para
// perguntar em vez de falar do jeito como o estúdio trabalha.
//
// A foto continua a de hoje: a Luiza ficou de escolher outra e ainda não
// mandou. Trocar por qualquer coisa agora seria decidir no lugar dela.
export default function ContatoV2() {
  return (
    <PaginaV2 modificador="page--contato">
      <section className="contato">
        {/* A foto sobe e aparece com o mesmo efeito do resto do site
            (`data-reveal`: opacidade de zero a cem e 24px de subida), em vez de
            entrar da esquerda (pedido do Pedro, 27/10: "parecido com a página
            de exposições e de sobre, de baixo para cima, bem leve"). */}
        <div className="contato__foto" data-reveal>
          <Imagem foto={contato.foto} />
        </div>

        <div className="contato__conteudo">
          <p className="contato__rotulo">{contatoV2.rotulo}</p>
          <h1 className="contato__titulo">{contato.titulo}</h1>
          <p className="contato__lead">{contatoV2.lead}</p>

          <FormContato />

          <ul className="contato__redes">
            <li>
              <a
                href={linkDeWhatsapp(MENSAGEM_PADRAO)}
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
    </PaginaV2>
  );
}
