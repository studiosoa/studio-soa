// Formato do conteúdo do site.
//
// Estes tipos são o contrato entre o conteúdo e as telas. Hoje quem os preenche
// são os arquivos de `src/conteudo/`, escritos à mão. Quando o Payload entrar,
// quem passa a preencher é o banco, e o `payload-types.ts` gerado por ele deve
// casar com o que está aqui.
//
// É por isso que cada tipo abaixo tem o desenho de uma coleção do CMS, e não o
// desenho de uma página: `Peca` é uma coleção, `Exposicao` é outra, e
// `ConteudoDoSite` é um global. Nenhum componente lê HTML solto.

/** Uma foto, com o recorte já decidido na direção de arte. */
export interface Foto {
  src: string;
  alt: string;
  /**
   * `object-position` da foto dentro do quadro, no formato do CSS
   * (ex.: "50% 62%"). É recorte de diagramação, calibrado a olho em tela real.
   * No Payload vira um campo de texto ao lado do upload.
   */
  recorte?: string;
  /**
   * Versão inteira da foto, sem o corte que o quadro da página impõe. Quando
   * existe, é ela que abre no zoom: o recorte serve à diagramação, e ampliar é
   * justamente o momento de ver a foto como ela foi tirada.
   */
  zoom?: string;
  /**
   * Arquivo alternativo para tela estreita, quando o enquadramento de desktop
   * não sobrevive ao celular. Não é a mesma foto menor: é outro recorte, porque
   * num quadro estreito o assunto fica pequeno ou sai do centro.
   */
  celular?: {
    src: string;
    /** Largura máxima em que esse arquivo vale. Padrão: 600px. */
    ate?: number;
  };
}

/** Um quadro de galeria: ou é foto, ou é vídeo. Nunca os dois. */
export type QuadroDeGaleria =
  | ({ tipo: "foto" } & Foto)
  | {
      tipo: "video";
      src: string;
      poster: string;
      /** Lido por leitor de tela no lugar do alt. */
      descricao: string;
    };

/** Uma linha da ficha técnica: um rótulo e os valores embaixo dele. */
export interface LinhaDeFicha {
  rotulo: string;
  valores: string[];
}

/** Um quadradinho de acabamento: cor chapada ou textura em imagem. */
export interface Acabamento {
  nome: string;
  /** Cor em hexadecimal, para os acabamentos chapados. */
  cor?: string;
  /** Caminho da textura, para madeira e ouro. */
  textura?: string;
}

/** Um bloco de acabamentos, com seu título. */
export interface BlocoDeAcabamentos {
  rotulo: string;
  itens: Acabamento[];
}

/** Coleção `pecas` do CMS. Uma peça do catálogo. */
export interface Peca {
  /** Vira a URL: `/pecas/<slug>`. */
  slug: string;
  /** Nome como aparece no catálogo e nos cartões. */
  nome: string;
  /** Nome como aparece no título grande da página, que às vezes difere. */
  titulo: string;
  /**
   * Artigo do nome da peça. Existe só para os botões escreverem "sobre a Mesa
   * Onda" e "sobre o Banquinho Elis" sem uma frase decorada por peça. No Payload
   * vira um select de duas opções.
   */
  artigo: "a" | "o";
  /** Foto do topo da página da peça. */
  capa: Foto;
  /** Foto usada nos cartões de catálogo e nas chamadas de outras páginas. */
  cartao: Foto;
  /** Os parágrafos do texto de apresentação. */
  descricao: string[];
  /** A galeria. O vídeo, quando existe, é sempre o último quadro. */
  galeria: QuadroDeGaleria[];
  /** Medidas e materiais. */
  ficha: LinhaDeFicha[];
  /** Opcional: só a Mesa Onda tem acabamentos escolhíveis. */
  acabamentos?: BlocoDeAcabamentos[];
  /** Slug da peça que aparece no rodapé desta. */
  proxima: string;
  /** Foto da peça seguinte no rodapé, com recorte próprio. */
  fotoDaProxima: Foto;
  /** Fundo do cartão "conheça o nosso catálogo" no rodapé. */
  fundoDoCatalogo: string;
}

/** Coleção `exposicoes` do CMS. */
export interface Exposicao {
  /** Chave usada pela troca no hover. */
  chave: string;
  /** Nome na lista da esquerda. Aceita `\n` para forçar a quebra de linha. */
  nome: string;
  local: string;
  /** Os parágrafos da descrição. */
  descricao: string[];
  fotos: Foto[];
}

/** Global `site` do CMS: o que se repete em toda página. */
export interface ConteudoDoSite {
  menu: { rotulo: string; href: string }[];
  rodape: {
    lugar: string;
    links: { rotulo: string; href: string; icone: string }[];
  };
  contato: {
    email: string;
    whatsapp: string;
  };
  loja: {
    nome: string;
    linhasDoEndereco: string[];
    coordenada: [number, number];
    linkDoMapa: string;
  };
}
