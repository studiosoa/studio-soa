import type { Foto } from "@/tipos/conteudo";
import { pecas } from "./pecas";

// Conteúdo que só a V2 usa, saído da review de 20/09 com a Luiza.
//
// Por que um arquivo separado em vez de editar `site.ts` e `paginas.ts`: as
// páginas antigas continuam no ar em `/`, `/sobre` e companhia, para o Pedro
// comparar as duas versões lado a lado antes de escolher. Se ele mexesse nos
// arquivos originais, a V1 mudaria junto e não haveria o que comparar.
//
// Quando a V2 for aprovada, isto aqui não vira código novo: cada constante
// abaixo tem o formato do lugar de onde ela veio, então é recortar e colar por
// cima do original. Se for reprovada, apagar este arquivo e a pasta `v2/`
// devolve o site ao estado de hoje.

/** Um item do menu. `botao` é o "Arquivos 3D", que sai do site e abre o Drive. */
export interface ItemDeMenu {
  rotulo: string;
  href: string;
  botao?: boolean;
  externo?: boolean;
}

/* Menu novo: Peças, Sobre, Exposições, Onde encontrar, Arquivos 3D e Contato.
   A ordem mudou (Exposições subiu para antes de Onde encontrar) e "Arquivos 3D"
   fecha uma pendência aberta desde 03/08: o contrato listava "Blocos 3D" como
   seção e ninguém sabia o que era. É um botão que leva à pasta do Drive. */
export const menuV2: ItemDeMenu[] = [
  { rotulo: "Peças", href: "/v2/pecas" },
  { rotulo: "Sobre", href: "/v2/sobre" },
  { rotulo: "Exposições", href: "/v2/exposicoes" },
  { rotulo: "Onde encontrar", href: "/v2/onde-encontrar" },
  {
    rotulo: "Arquivos 3D",
    href: "https://drive.google.com/drive/folders/11tLCxl2R6pOosXoJR4-p2frLt9l1OVTh?usp=sharing",
    botao: true,
    externo: true,
  },
  { rotulo: "Contato", href: "/v2/contato" },
];

/* Rodapé: "Brasil" no lugar de "Vitória ES", a pedido dela. O endereço da loja
   continua na Onde encontrar, que é onde ele resolve alguma coisa.

   Os ícones perdem o texto visível e ganham `rotulo` como nome acessível: quem
   enxerga vê só o símbolo, quem usa leitor de tela continua ouvindo o nome. */
export const rodapeV2 = {
  lugar: "Studio Sôa · Brasil",
  links: [
    {
      rotulo: "WhatsApp",
      href: "whatsapp" as const,
      icone: "ic-whatsapp",
    },
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
};

/** Mensagem que abre toda conversa de WhatsApp vinda do site. */
export const MENSAGEM_PADRAO = "Olá! Vim pelo site do Studio Sôa.";

/* Ordem nova do catálogo, ditada por ela na review. Só o Banquinho e o Espelho
   trocaram de lugar, mas a lista inteira fica escrita para não depender de
   quem lê lembrar disso.

   Ela mora aqui em vez de reordenar o array de `pecas.ts` porque aquele array é
   a ordem da V1 também. A página de peça calcula a "próxima" a partir desta
   lista, então o atalho do rodapé segue a ordem nova sozinho, sem precisar
   reescrever os campos `proxima` de cada peça. */
export const ordemDasPecasV2 = [
  "mesa-onda",
  "espelho-miudo-graudo",
  "bandeja-elis",
  "banquinho-elis",
  "adorno-balanco",
];

/** As três peças que aparecem na home, lado a lado. As três primeiras da ordem nova. */
export const pecasDaHomeV2 = ordemDasPecasV2.slice(0, 3);

/* A foto grande do atalho "próxima peça" estava amarrada à ordem antiga: cada
   peça guarda em `fotoDaProxima` a foto da peça que vinha depois DELA. Com a
   ordem nova, a Mesa Onda apontaria para o nome do Espelho com a foto do
   Banquinho.
 *
 * Em vez de reescrever os cinco campos à mão, este mapa vira a relação do
 * avesso: se a peça P guardava a foto da peça P.proxima, então essa foto é a
 * foto DE P.proxima. Sai um mapa de slug para foto, com os recortes que já
 * foram calibrados a olho em tela, e que continuam valendo seja qual for a
 * ordem de amanhã. */
export const fotoGrandeDaPeca: Record<string, Foto> = Object.fromEntries(
  pecas.map((peca) => [peca.proxima, peca.fotoDaProxima]),
);

/**
 * Fundo do cartão "Mais peças", no fim da página de peça.
 *
 * Não usa o `fundoDoCatalogo` que cada peça guarda. Aqueles valores foram
 * escolhidos à mão para a ordem antiga, e com a ordem nova a Mesa Onda caiu num
 * caso absurdo: a foto da próxima peça, à esquerda, e o fundo do cartão, à
 * direita, eram o mesmo arquivo do Espelho. A mesma foto duas vezes, lado a
 * lado, uma delas desfocada.
 *
 * Aqui o fundo passa a ser a peça DEPOIS da próxima. Com isso ele nunca coincide
 * com a peça atual nem com a próxima, seja qual for a ordem, porque numa lista
 * de cinco as posições +1 e +2 são sempre diferentes entre si e da atual. O erro
 * deixa de depender de alguém conferir peça por peça.
 */
export function fundoDoCartaoDePeca(slug: string): string {
  const posicao = ordemDasPecasV2.indexOf(slug);
  const slugDoFundo =
    ordemDasPecasV2[(posicao + 2) % ordemDasPecasV2.length];
  const foto = fotoGrandeDaPeca[slugDoFundo];
  return foto ? foto.src : "";
}

/* O bloco "Peças" sempre foi a Mesa Onda, e o Pedro já pediu pra trocar mais
   de uma vez sem eu ter feito. Pedido de 23/09: em vez de outra foto fixa,
   sorteada uma vez a cada visita, entre as outras peças (a Mesa Onda fica de
   fora de propósito, é justamente dela que ele quer distância aqui). Cada uma
   já tem uma foto de cartão pensada pra esse enquadramento em pé, a mesma que
   aparece no catálogo, então não precisou de foto nova nenhuma.
 *
 * Mora aqui, não em `BlocosDaHome.tsx`, pelo mesmo motivo do resto deste
 * arquivo: conteúdo fica no conteúdo, componente só lê. */
export const fotosDoBlocoDePecas: Foto[] = pecas
  .filter((peca) => peca.slug !== "mesa-onda")
  .map((peca) => peca.cartao);

/* Os três blocos colados que fecham a home, no lugar da faixa do catálogo.
   Sem borda e sem espaço entre eles, a pedido dela: menos cliques para chegar
   às três páginas que importam. As fotos são reaproveitadas do que já existe no
   projeto, nenhuma foto nova entrou. */
export const blocosDaHomeV2: { rotulo: string; href: string; foto: Foto }[] = [
  {
    rotulo: "Peças",
    href: "/v2/pecas",
    // Serve só de imagem de partida pro servidor renderizar antes do sorteio
    // do lado do cliente (ver `BlocosDaHome.tsx`); ela nunca fica na tela
    // depois que a página termina de carregar.
    foto: fotosDoBlocoDePecas[0],
  },
  {
    rotulo: "Sobre",
    href: "/v2/sobre",
    // A Luiza sentada com as peças em volta, escolhida pelo Pedro em 22/09
    // (`11052025-_MG_0981.jpg` dos editados). O bloco leva à página do estúdio,
    // que fala da designer e do trabalho juntos, então a foto precisa mostrar os
    // dois. A anterior tinha só ela, e antes dela só as peças.
    foto: {
      src: "/assets/img/home/luiza-pecas.jpg",
      alt: "Luiza Pessôa sentada com as peças do Studio Sôa em volta",
      recorte: "50% 42%",
    },
  },
  {
    rotulo: "Exposições",
    href: "/v2/exposicoes",
    // Era a `design-week-1`, a do painel com sombra dura, que o Pedro apontou em
    // 22/09 como foto de luz ruim. Trocada junto com a da página de Exposições,
    // para as duas não mostrarem coisas diferentes da mesma mostra.
    foto: {
      src: "/assets/img/exposicoes/design-week-2.jpg",
      alt: "Estande do Studio Sôa na Design Week São Paulo, com três peças sobre o pódio",
      recorte: "50% 60%",
    },
  },
];

/* Catálogo: o cartão do fim deixa de falar da criadora e passa a falar do
   estúdio. É a mesma decisão que atravessa a review inteira. */
export const catalogoV2 = {
  cartaoFinal: "conheça mais sobre o estúdio",
};

export const pecaV2 = {
  /* Os três botões da ficha. "Comprar" no lugar de "Solicitar esta peça". */
  botoes: {
    comprar: "Comprar",
    duvidas: "Tire dúvidas com o studio",
    bloco3d: "Baixar arquivo 3D",
  },
  /* "Conheça o nosso catálogo" vira "Mais peças" só aqui. A Exposições mantém o
     rótulo antigo até o Pedro dizer o contrário. */
  atalhoDoCatalogo: "Mais peças",
  /* Peças em que o vídeo abre a galeria em vez de fechar. Hoje só o Adorno
     Balanço, por pedido dela na review. Escrito como lista para a próxima peça
     com vídeo não exigir mexer em componente. */
  videoPrimeiro: ["adorno-balanco"],
};

export const sobreV2 = {
  /* "Sobre Studio" vira "O studio" e "Luiza Pessôa" vira "Criadora e designer".
     Este é o único título que continua falando de pessoa, e é exceção
     combinada: o resto da página passa a falar do estúdio. */
  tituloDoEstudio: "O studio",
  tituloDoPerfil: "Criadora e designer",
};

export const ondeEncontrarV2 = {
  /* O rótulo "Onde encontrar" acima do título saiu: repetia o que o menu e o
     título já diziam. */
  titulo: "As peças estão na Ozlo Home Brand",

  /* Bloco novo, antes da Ozlo: a compra direta com o estúdio vem primeiro, e a
     loja física vem depois como segunda opção. Texto exato dela. */
  atendimento: {
    texto:
      "atendimento studio sôa, online de segunda à sexta, das 8h às 18h. entre em contato para compra, orçamento e encomendas",
    rotuloDoLink: "faça seu pedido aqui",
  },

  /* Os dois campos abaixo esperam texto da Luiza e não aparecem enquanto
     estiverem vazios. O primeiro reforça a compra direta e a credibilidade de a
     peça estar numa loja; o segundo avisa que a disponibilidade na Ozlo varia.
     Ficam como string vazia, e não como comentário, para entrar no ar assim que
     o texto chegar, sem mexer em componente. */
  reforcoDaCompra: "",
  avisoDeDisponibilidade: "",
};

export const contatoV2 = {
  lead: "Sobre peças, materiais, encomendas sob medida, prazos, produção ou dúvidas sobre o studio. Fique à vontade para escrever uma mensagem.",
};

/* Ano de cada mostra, para a página nova mostrar nome, ano e cidade. A Luiza
   ficou de mandar os anos junto com a revisão dos nomes, então o campo existe
   e fica vazio: a página não imprime ano nenhum enquanto for assim, em vez de
   inventar data ou deixar buraco na diagramação. */
export const anosDasExposicoes: Record<string, string> = {
  "club-casa": "",
  "design-week": "",
  bab: "",
  casacor: "",
};

/* Como cada mostra aparece na página de Exposições da V2.
 *
 * Um objeto por mostra, com tudo que se decide sobre as fotos dela. Já foram
 * três mapas separados aqui, e virou um só depois que o Pedro cobrou
 * padronização nos botões em 23/09: a mesma lição vale para dado, não só para
 * CSS. Decisão que sempre se toma junto se escreve junto, senão a quarta vira
 * um quarto mapa.
 *
 * - `esconder`: fotos que não entram no carrossel. Trecho do caminho basta. Não
 *   apaga arquivo nem mexe em `exposicoes.ts`: a página antiga continua
 *   mostrando todas, e a foto volta tirando uma linha daqui.
 * - `abrePor`: qual foto abre o quadro, contando DEPOIS do `esconder`.
 * - `capaSrc`: troca o arquivo só da capa. Existe por geometria: as fotos de
 *   exposição são 1300x1191, deitadas, e o quadro é em pé, então o encaixe é
 *   pela altura e não sobra folga vertical para deslizar. As versões em `zoom/`
 *   são as fotos inteiras, e várias são retrato: nelas a folga volta.
 * - `capaRecorte`: o `object-position` da capa. Qual eixo funciona depende do
 *   arquivo, ver acima.
 *
 * Mostra que não estiver aqui usa todas as fotos, na ordem do conteúdo, sem
 * recorte. */
export const mostraV2: Record<
  string,
  {
    esconder?: string[];
    abrePor?: number;
    capaSrc?: string;
    capaRecorte?: string;
  }
> = {
  /* O corte de diagramação cortava o troféu fora. O Pedro pediu em 23/09 para
     mostrar a Luiza com ele: cortar mais em cima, mostrar mais embaixo. No
     arquivo deitado era impossível, porque não havia folga vertical. A foto
     inteira é 853x1280, mais estreita que o quadro, então ali o encaixe passa a
     ser pela largura e sobra altura para descer o enquadramento. */
  "club-casa": {
    capaSrc: "/assets/img/exposicoes/zoom/club-casa-1.jpg",
    capaRecorte: "50% 100%",
  },

  /* A primeira foto da Design Week é a do painel com a sombra dura, que o Pedro
     apontou em 22/09. A segunda mostra o mesmo estande com três peças sobre o
     pódio e luz limpa. As outras não sumiram: as setas passam por todas. */
  "design-week": { abrePor: 1 },

  /* Foto tirada do carrossel a pedido do Pedro em 23/09. O arquivo continua em
     `public/` e na lista de `exposicoes.ts`, então a página antiga segue
     mostrando as três. */
  bab: { esconder: ["bab-2.jpg"] },
};
