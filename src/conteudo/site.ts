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
      // Endereços confirmados pelo Pedro em 16/09/2026. Eram `#` desde 30/08.
      {
        rotulo: "Instagram",
        href: "https://www.instagram.com/o.studiosoa/",
        icone: "ic-instagram",
      },
      {
        rotulo: "Pinterest",
        href: "https://br.pinterest.com/ostudiosoa/",
        icone: "ic-pinterest",
      },
      {
        rotulo: "E-mail",
        href: "mailto:luiza.studiosoa@gmail.com",
        icone: "ic-email",
      },
    ],
  },

  contato: {
    email: "luiza.studiosoa@gmail.com",
    // DUVIDAS #2: número de trabalho a confirmar com a Luiza. A Mesa Onda é a
    // exceção e tem número próprio, ver `pecas.ts`.
    whatsapp: "5527988338333",
  },

  // Pasta com os blocos 3D das peças, para arquiteto baixar e usar em projeto.
  // DUVIDAS #15: hoje a pasta tem um arquivo só, o da Mesa Onda, mas o botão
  // aparece nas cinco peças a pedido do Pedro.
  blocos3d:
    "https://drive.google.com/drive/folders/11tLCxl2R6pOosXoJR4-p2frLt9l1OVTh?usp=sharing",

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

/**
 * Monta o link de WhatsApp já com a mensagem escrita.
 *
 * `numero` existe porque nem toda peça leva ao estúdio: a Mesa Onda foi
 * assinada para a Dopo Studio depois do prêmio, e quem vende é lá. Sem número,
 * cai no do estúdio.
 */
export function linkDeWhatsapp(mensagem: string, numero?: string): string {
  const destino = numero ?? site.contato.whatsapp;
  return `https://api.whatsapp.com/send?phone=${destino}&text=${encodeURIComponent(mensagem)}`;
}

/** Monta o link de e-mail já com o assunto preenchido. */
export function linkDeEmail(assunto: string): string {
  return `mailto:${site.contato.email}?subject=${encodeURIComponent(assunto)}`;
}
