import type { Foto } from "@/tipos/conteudo";
import catalogo from "../../content/catalogo.json";
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
   segunda (fundo branco) é a loja. O título de página deixou de ser "As peças
   estão na Ozlo Home Brand": quem abre a página vê primeiro o caminho principal,
   e o nome da loja entra na segunda parte. */
export const ondeEncontrarV2 = {
  /* A compra direta com o estúdio vem primeiro, e a loja física vem depois como
     segunda opção. Texto exato dela. */
  atendimento: {
    titulo: "compre direto com o studio",
    texto:
      "atendimento studio sôa, online de segunda à sexta, das 8h às 18h. entre em contato para compra, orçamento e encomendas",
    rotuloDoLink: "faça seu pedido aqui",
  },

  /* Frase dela que abre a segunda parte, antes do nome da loja. */
  loja: {
    rotulo: "nossas peças também estão disponíveis em",
  },

  /* Os dois campos abaixo esperam texto da Luiza e não aparecem enquanto
     estiverem vazios. O primeiro reforça a compra direta e a credibilidade de a
     peça estar numa loja; o segundo avisa que a disponibilidade na Ozlo varia.
     Ficam como string vazia, e não como comentário, para entrar no ar assim que
     o texto chegar, sem mexer em componente.

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

/* Ano de cada mostra, para a página nova mostrar nome, ano e cidade. Chegaram
   na revisão de 14/10, que lista as quatro da mais nova para a mais antiga. */
export const anosDasExposicoes: Record<string, string> = {
  casacor: "2026",
  bab: "2026",
  "design-week": "2025",
  "club-casa": "2024",
};

/* Ordem da página de Exposições: da mais recente para a mais antiga, como a
   Luiza listou na revisão de 14/10. Em `exposicoes.ts` a ordem é a da lista de
   hoje, e ela fica como está: quem decide a ordem desta página é esta lista. */
export const ordemDasExposicoesV2 = [
  "casacor",
  "bab",
  "design-week",
  "club-casa",
];

/* Como cada mostra aparece na página de Exposições da V2.
 *
 * Um objeto por mostra, com tudo que se decide sobre ela. Já foram três mapas
 * separados aqui, e virou um só depois que o Pedro cobrou padronização nos
 * botões em 23/09: a mesma lição vale para dado, não só para CSS. Decisão que
 * sempre se toma junto se escreve junto, senão a quarta vira um quarto mapa.
 *
 * - `nome`: como o título da mostra é escrito no quadro. Revisão de 14/10: com
 *   maiúsculas e por extenso ("Casacor Espírito Santo", não "Casacor ES"). O
 *   `exposicoes.ts` não muda, porque outras partes do site leem o nome de lá.
 * - `antes`: fotos que entram NA FRENTE das da mostra, na ordem escrita aqui.
 * - `esconder`: fotos que não entram no carrossel. Trecho do caminho basta. Não
 *   apaga arquivo nem mexe em `exposicoes.ts`: a foto volta tirando uma linha
 *   daqui.
 * - `ajustes`: troca o arquivo e/ou o recorte de UMA foto, achada por um trecho
 *   do caminho. Existe por geometria: as fotos de exposição são 1300x1191,
 *   deitadas, e o quadro é em pé, então o encaixe é pela altura, corta os lados
 *   e não sobra folga vertical para deslizar. As versões em `zoom/` são as fotos
 *   inteiras, e várias são retrato: nelas a folga volta.
 * - `abrePor`: qual foto abre o quadro, contando DEPOIS de `antes` e `esconder`.
 * - `ordem`: ordem completa da mostra, por trecho do caminho de cada foto. Existe
 *   porque `abrePor` só gira a lista, e girar não troca duas vizinhas de lugar
 *   (Club&Casa, 27/10). Foto que não casar com nenhum trecho vai para o fim.
 *
 * Mostra que não estiver aqui usa todas as fotos, na ordem do conteúdo, sem
 * recorte. */
export interface AjusteDeFoto {
  trecho: string;
  src?: string;
  recorte?: string;
}

export const mostraV2: Record<
  string,
  {
    nome?: string;
    antes?: Foto[];
    esconder?: string[];
    ajustes?: AjusteDeFoto[];
    abrePor?: number;
    ordem?: string[];
  }
> = {
  casacor: { nome: "Casacor Espírito Santo" },

  /* A primeira foto vem reenquadrada pela Luiza (revisão de 14/10): o sofá
     curvo e a Mesa Onda verde, mais de perto, em vez da vista aberta com a
     planta. O arquivo é o recorte que ela mandou no documento. A foto tirada do
     carrossel em 23/09 (`bab-2`) continua de fora, e a ordem das outras segue. */
  bab: {
    nome: "Bienal da Arquitetura Brasileira, BAB",
    esconder: ["bab-2.jpg"],
    ajustes: [
      {
        trecho: "bab-1.jpg",
        src: "/assets/img/exposicoes/bab-1-reenquadrada.jpg",
        recorte: "50% 50%",
      },
    ],
  },

  /* O pôster da Mesa Onda abre o quadro, e a Luiza pediu para aparecerem os
     escritos do canto (as logos da BoomSP Design e do Club&Casa Autoral, e o
     nome da peça). A versão de `exposicoes/` é um recorte deitado que corta
     tudo isso; a de `zoom/` é o pôster inteiro. É a terceira da lista, por isso
     `abrePor: 2`. Antes abria pela segunda (22/09), por causa da luz da
     primeira, e as duas continuam no carrossel. */
  "design-week": {
    nome: "DW! Design Week São Paulo",
    abrePor: 2,
    ajustes: [
      {
        trecho: "design-week-3.jpg",
        src: "/assets/img/exposicoes/zoom/design-week-3.jpg",
        recorte: "50% 50%",
      },
    ],
  },

  /* A Luiza sentada ao lado da Mesa Onda entra como primeira foto, e as duas de
     antes ficam depois dela (revisão de 14/10). O reenquadramento do troféu que
     o Pedro pediu em 23/09 continua valendo, agora na segunda foto: o arquivo
     deitado não tinha folga vertical, e a foto inteira (853x1280) é mais
     estreita que o quadro, então ali o encaixe passa a ser pela largura e sobra
     altura para descer o enquadramento. */
  "club-casa": {
    nome: "Prêmio Club&Casa Autoral 6",
    // Ordem da Luiza (pasta `4 EXPOSIÇÕES/PREMIO CLUB&CASA`, 27/10): ela sentada,
    // depois a Luiza com o troféu diante do telão (`club-casa-2`) e por último a
    // foto da festa de premiação (`club-casa-1`). Antes eram as duas últimas
    // trocadas.
    ordem: ["club-casa-luiza", "club-casa-2", "club-casa-1"],
    antes: [
      {
        src: "/assets/img/exposicoes/club-casa-luiza.jpg",
        zoom: "/assets/img/exposicoes/club-casa-luiza.jpg",
        alt: "Luiza Pessôa sentada num bloco branco, ao lado da Mesa Onda",
      },
    ],
    ajustes: [
      {
        trecho: "club-casa-1.jpg",
        src: "/assets/img/exposicoes/zoom/club-casa-1.jpg",
        recorte: "50% 100%",
      },
    ],
  },
};
