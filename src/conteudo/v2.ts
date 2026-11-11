import type { Foto } from "@/tipos/conteudo";
import catalogo from "../../content/catalogo.json";
import ondeEncontrarJson from "../../content/onde-encontrar.json";
import { normalizarOndeEncontrar } from "./cms/normalizar-onde-encontrar";
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

/* Menu novo: Peças, Sobre, Exposições, Onde encontrar, Contato e Arquivos 3D.
   A ordem mudou (Exposições subiu para antes de Onde encontrar) e "Arquivos 3D"
   fecha uma pendência aberta desde 03/08: o contrato listava "Blocos 3D" como
   seção e ninguém sabia o que era. É um botão que leva à pasta do Drive.

   Na revisão de 14/10 a Luiza pediu para trocar "Arquivos 3D" e "Contato" de
   lugar: o botão que sai do site vai para o fim da fila, e as páginas do
   próprio site ficam juntas. */
export const menuV2: ItemDeMenu[] = [
  { rotulo: "Peças", href: "/pecas" },
  { rotulo: "Sobre", href: "/sobre" },
  { rotulo: "Exposições", href: "/exposicoes" },
  { rotulo: "Onde encontrar", href: "/onde-encontrar" },
  { rotulo: "Contato", href: "/contato" },
  {
    rotulo: "Arquivos 3D",
    href: "https://drive.google.com/drive/folders/11tLCxl2R6pOosXoJR4-p2frLt9l1OVTh?usp=sharing",
    botao: true,
    externo: true,
  },
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

/* Desde 05/11 a lista mora em `content/catalogo.json` e é editada no painel do
   Tina, arrastando as peças. Cada item guarda o caminho do arquivo da peça, e o
   slug sai do nome dele. Uma peça que existe e não está na lista vai para o
   fim, e uma entrada da lista sem arquivo é ignorada: criar uma peça nova ou
   apagar uma antiga sem mexer na lista não derruba nem esconde nada do site. */
const slugsDoCatalogo = catalogo.pecas.map((item) =>
  item.peca.split("/").pop()!.replace(/\.json$/, ""),
);
export const ordemDasPecasV2: string[] = [
  ...slugsDoCatalogo.filter((slug) => pecas.some((p) => p.slug === slug)),
  ...pecas.map((p) => p.slug).filter((slug) => !slugsDoCatalogo.includes(slug)),
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
  pecas.map((peca) => [peca.slug, peca.fotoDeAtalho ?? peca.cartao]),
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

/* O bloco "Peças" já foi a Mesa Onda fixa, depois uma peça sorteada a cada
   visita (pedido de 23/09), e agora é a foto em preto e branco da pasta de ordem
   da Luiza (`1 INICIAL/BW1.jpg`, a tigela sobre o pedestal): ela mandou as três
   dos blocos já convertidas, na ordem Peças, Sobre, Exposições, para acabar com a
   diferença de tom entre as fotos. A lista continua sendo uma lista, e o
   componente continua sorteando: com uma foto só, sorteia sempre a mesma, e
   voltar a variar é pôr mais fotos em preto e branco aqui. */
export const fotosDoBlocoDePecas: Foto[] = [
  {
    src: "/assets/img/home/bw-pecas.jpg",
    alt: "Tigela de madeira sobre um pedestal branco, em preto e branco",
    recorte: "50% 45%",
  },
];

/* Os três blocos colados que fecham a home, no lugar da faixa do catálogo.
   Sem borda e sem espaço entre eles, a pedido dela: menos cliques para chegar
   às três páginas que importam. Em 27/10 as três passaram a ser as fotos em
   preto e branco que a Luiza mandou na pasta de ordem (`1 INICIAL`: BW1, BW2 e
   BW3, nessa ordem). As versões coloridas continuam no projeto. */
export const blocosDaHomeV2: { rotulo: string; href: string; foto: Foto }[] = [
  {
    rotulo: "Peças",
    href: "/pecas",
    // Serve só de imagem de partida pro servidor renderizar antes do sorteio
    // do lado do cliente (ver `BlocosDaHome.tsx`); ela nunca fica na tela
    // depois que a página termina de carregar.
    foto: fotosDoBlocoDePecas[0],
  },
  {
    rotulo: "Sobre",
    href: "/sobre",
    // A Luiza sentada com as peças em volta, escolhida pelo Pedro em 22/09
    // (`11052025-_MG_0981.jpg` dos editados). O bloco leva à página do estúdio,
    // que fala da designer e do trabalho juntos, então a foto precisa mostrar os
    // dois. A anterior tinha só ela, e antes dela só as peças.
    foto: {
      src: "/assets/img/home/bw-sobre.jpg",
      alt: "Luiza Pessôa sentada com as peças do Studio Sôa em volta, em preto e branco",
      recorte: "50% 42%",
    },
  },
  {
    rotulo: "Exposições",
    href: "/exposicoes",
    // Revisão de 14/10: a Luiza mandou uma foto nova para este bloco, a Mesa
    // Onda verde diante do sofá curvo, e disse para manter as outras duas. Antes
    // era a `design-week-2` (estande com três peças). O recorte vem dela, já
    // em pé; só o horizontal é ajustado aqui, para a faixa de madeira da borda
    // esquerda da foto (uns 9% dela) ficar de fora do quadro.
    foto: {
      src: "/assets/img/home/bw-exposicoes.jpg",
      alt: "Mesa Onda diante de um sofá curvo, no Pavilhão Espírito Santo da Bienal da Arquitetura Brasileira, em preto e branco",
      recorte: "100% 50%",
    },
  },
];

/* Catálogo: o cartão do fim deixa de falar da criadora e passa a falar do
   estúdio. É a mesma decisão que atravessa a review inteira. Em 20/10 o Pedro
   pediu "mude para studio": o cartão escreve o nome como o resto do site. */
export const catalogoV2 = {
  cartaoFinal: "conheça mais sobre o studio",
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
  /* Peças em que o vídeo abre a galeria em vez de fechar. Vem do campo
     "O vídeo abre a galeria" de cada peça no painel; hoje só o Adorno Balanço,
     por pedido dela na review. */
  videoPrimeiro: pecas.filter((p) => p.videoPrimeiro).map((p) => p.slug),
};

export const sobreV2 = {
  /* "Sobre Studio" vira "O studio" e "Luiza Pessôa" vira "Criadora e designer".
     Este é o único título que continua falando de pessoa, e é exceção
     combinada: o resto da página passa a falar do estúdio. */
  tituloDoEstudio: "O studio",
  tituloDoPerfil: "Criadora e designer",
};

/* Onde encontrar, depois da revisão de 14/10: só texto, sem foto, tudo centrado,
   em duas partes. A primeira (fundo bege) é a compra direta com o estúdio; a
   segunda (fundo branco) são os pontos de venda. O título de página deixou de ser
   "As peças estão na Ozlo Home Brand": quem abre a página vê primeiro o caminho
   principal, e o nome da loja entra na segunda parte.

   Desde 11/11/2026 os textos e a lista de pontos de venda moram em
   `content/onde-encontrar.json`, editado no painel do Tina. A lista cresce: cada
   ponto novo vira um bloco ao lado dos outros, e a Ozlo Home Brand é o primeiro. O
   endereço da Ozlo saiu de `site.ts` (`site.loja`) e foi para lá. */
const ondeEncontrar = normalizarOndeEncontrar(ondeEncontrarJson);

export const ondeEncontrarV2 = {
  /* A compra direta com o estúdio vem primeiro, e os pontos de venda vêm depois
     como segunda opção. Texto exato dela. */
  atendimento: ondeEncontrar.atendimento,

  /* Frase dela que abre a segunda parte, antes do nome dos lugares. */
  rotuloDosPontos: ondeEncontrar.rotuloDosPontos,
  pontos: ondeEncontrar.pontos,

  /* Os dois campos abaixo esperam texto da Luiza e não aparecem enquanto
     estiverem vazios. O primeiro reforça a compra direta e a credibilidade de a
     peça estar numa loja; o segundo avisa que a disponibilidade nos pontos de
     venda varia. Ficam como string vazia, e não como comentário, para entrar no ar
     assim que o texto chegar, sem mexer em componente.

     O rascunho dela mostra "*peças à pronta entrega a confirmar" abaixo da
     Ozlo: é nota para ela mesma, ainda sem texto final, então segue aqui
     vazio. Ver DUVIDAS #20. */
  reforcoDaCompra: "",
  avisoDeDisponibilidade: "",
};

export const contatoV2 = {
  /* O rótulo acima do título "Ficou com alguma dúvida?" deixou de ser "Fale com
     o estúdio" e virou só "studio", revisão de 14/10. Sozinha a palavra não
     dizia nada (relatório de 20/10, B2), e em 27/10 o Pedro pediu "fale com
     studio": escrito "fale com o studio", como o resto do site escreve o nome. */
  rotulo: "fale com o studio",
  lead: "Sobre peças, materiais, encomendas sob medida, prazos, produção ou dúvidas sobre o studio. Fique à vontade para escrever uma mensagem.",
};

/* O manifesto da home virou um poema em cima de uma foto chapada (revisão de
   14/10). O texto é o mesmo de antes, palavra por palavra, e continua em
   `paginas.ts` (`home.manifesto`): só muda que ele é dito de uma vez, em vez de
   espalhado entre três fotos. Aqui mora a foto de fundo.

   Foram quatro versões em dois dias: um recorte largo da `_MG_1000` (tigela e
   espelho); a Bandeja Elis; a `_MG_1000` inteira numa caixa à direita; e, a
   atual, a Bandeja Elis de novo, de ponta a ponta. É a `6.png` da pasta da
   peça, no tamanho original (1856x2266), exportada com compressão leve: a
   versão da segunda rodada tinha os mesmos pixels e um terço do peso, e as
   paredes lisas da foto mostravam a compressão como se fosse baixa resolução.
   O enquadramento é feito no CSS. */
export const manifestoV2 = {
  foto: {
    src: "/assets/img/home/manifesto-bandeja-hd.jpg",
    alt: "",
  } as Foto,
};

/* Exposições: o ano, a ordem das mostras e o jeito de cada uma abrir (`anosDasExposicoes`,
   `ordemDasExposicoesV2` e `mostraV2`, com `antes`, `esconder`, `ajustes`, `abrePor` e
   `ordem`) moravam aqui até 11/11/2026. Agora cada mostra é um arquivo em
   `content/exposicoes/` com o estado final, e a ordem vem de
   `content/ordem-exposicoes.json`: ver `exposicoes.ts`. O texto completo dessas decisões,
   foto por foto, está no histórico do Git, no commit 9c15aef. */
