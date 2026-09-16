import type { ConteudoDoSite } from "@/tipos/conteudo";

// O que se repete em toda página. No Payload isto vira um global chamado
// `site`, e esta constante passa a ser o retorno de uma consulta.
export const site: ConteudoDoSite = {
  menu: [
    { rotulo: "Peças", href: "/pecas" },
    { rotulo: "Sobre", href: "/sobre" },
    { rotulo: "Onde encontrar", href: "/onde-encontrar" },
    { rotulo: "Exposições", href: "/exposicoes" },
    { rotulo: "Contato", href: "/contato" },
  ],

  rodape: {
    lugar: "Studio Sôa · Vitória ES",
    links: [
      // DUVIDAS #6: os endereços de Instagram e Pinterest ainda não vieram.
      { rotulo: "Instagram", href: "#", icone: "ic-instagram" },
      { rotulo: "Pinterest", href: "#", icone: "ic-pinterest" },
      {
        rotulo: "E-mail",
        href: "mailto:luiza.studiosoa@gmail.com",
        icone: "ic-email",
      },
    ],
  },

  contato: {
    email: "luiza.studiosoa@gmail.com",
    // DUVIDAS #2: número de trabalho a confirmar com a Luiza.
    whatsapp: "5527988338333",
  },

  loja: {
    nome: "Ozlo Home Brand",
    linhasDoEndereco: [
      "Av. Rio Branco, 1305, loja 01",
      "Centro Comercial Solar da Praia",
      "Praia do Canto, Vitória ES",
      "29055-643",
    ],
    // DUVIDAS #11: a loja não está cadastrada no OpenStreetMap. Este ponto é o
    // trecho da Avenida Rio Branco no quarteirão do CEP, não a porta.
    coordenada: [-20.30141, -40.29834],
    linkDoMapa:
      "https://www.google.com/maps/search/?api=1&query=Ozlo+Home+Brand%2C+Av.+Rio+Branco%2C+1305%2C+Praia+do+Canto%2C+Vit%C3%B3ria+-+ES%2C+29055-643",
  },
};

/** Monta o link de WhatsApp já com a mensagem escrita. */
export function linkDeWhatsapp(mensagem: string): string {
  return `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Monta o link de e-mail já com o assunto preenchido. */
export function linkDeEmail(assunto: string): string {
  return `mailto:${site.contato.email}?subject=${encodeURIComponent(assunto)}`;
}
