import type { Metadata } from "next";

import Pagina from "@/componentes/Pagina";
import Imagem from "@/componentes/Imagem";
import FaixaCatalogo from "@/componentes/FaixaCatalogo";
import { sobre } from "@/conteudo/paginas";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Luiza Pessôa, arquiteta e criadora, e o Studio Sôa: design autoral brasileiro nascido em 2025.",
};

export default function Sobre() {
  return (
    /* Sem cabeçalho sobreposto: ele só faz sentido com foto atrás. A Sobre agora
       abre direto no verde, e um cabeçalho transparente ali ficaria com o texto
       escuro boiando em cima do fundo escuro. */
    <Pagina modificador="page--sobre">
      {/* A foto de topo saiu a pedido do Pedro. Era o mesmo arquivo da home,
          então a Sobre abria repetindo a primeira tela do site inteiro. */}
      <section className="perfil" data-reveal>
        <div className="perfil__inner">
          <div className="perfil__foto">
            <Imagem foto={sobre.perfil.foto} />
          </div>

          <div className="perfil__texto">
            <h1 className="perfil__nome">{sobre.perfil.nome}</h1>
            {/* O negrito faz parte do texto da Luiza, então o parágrafo entra
                como HTML. Quando virar rich text no Payload, muda a fonte do
                dado e não este componente. */}
            {sobre.perfil.paragrafos.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      <section className="frase" data-reveal>
        <Imagem className="frase__img" foto={sobre.frase.foto} ariaHidden />
        <p className="frase__texto">{sobre.frase.texto}</p>
      </section>

      <section className="sobre-studio">
        <div className="sobre-studio__texto">
          <div className="sobre-studio__bloco">
            <h2 className="sobre-studio__titulo" data-reveal>
              {sobre.estudio.titulo}
            </h2>
            {sobre.estudio.paragrafos.map((p, i) => (
              <p key={i} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Os três quadros do Looping_Peças. O primeiro fica embaixo; os outros
            acendem por cima na vez deles, pelo CSS. */}
        <div className="sobre-studio__foto looping" data-reveal>
          {sobre.estudio.looping.map((foto, i) => (
            <Imagem
              key={foto.src}
              foto={foto}
              className={i === 1 ? "looping__b" : i === 2 ? "looping__c" : undefined}
              ariaHidden={i > 0}
            />
          ))}
        </div>
      </section>

      {/* Sem animação: o Pedro pediu que a faixa já estivesse lá ao sair do
          loop, em vez de surgir depois. */}
      <FaixaCatalogo semAnimacao />
    </Pagina>
  );
}
