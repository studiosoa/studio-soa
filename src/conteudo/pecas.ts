import type { Peca } from "@/tipos/conteudo";

// Coleção `pecas`. A ordem deste array é a ordem do catálogo.
//
// Quando o Payload entrar, este arquivo sai e no lugar dele fica uma consulta
// (`payload.find({ collection: "pecas" })`). Os componentes não mudam, porque
// já leem deste formato e não de HTML escrito à mão.
//
// DUVIDAS #4: falta a sexta peça, Espelho Linha, que ainda não tem foto.

const ACABAMENTOS_MESA_ONDA = [
  {
    rotulo: "Acabamentos de serralheria",
    itens: [
      { nome: "Areia", cor: "#d9c9b3" },
      { nome: "Argila", cor: "#e07e67" },
      { nome: "Branco", cor: "#ffffff" },
      { nome: "Bronze", cor: "#767264" },
      { nome: "Café", cor: "#200b07" },
      { nome: "Chumbo", cor: "#3d3831" },
      { nome: "Cinza", cor: "#a6a5a0" },
      { nome: "Corda", cor: "#9b9186" },
      { nome: "Ocre", cor: "#a98450" },
      { nome: "Ouro", textura: "/assets/img/acabamentos/ouro.png" },
      { nome: "Preto", cor: "#000000" },
      { nome: "Sálvia", cor: "#435e54" },
    ],
  },
  {
    rotulo: "Acabamentos de madeira maciça",
    itens: [
      { nome: "Ébano", textura: "/assets/img/acabamentos/ebano.png" },
      { nome: "Mel", textura: "/assets/img/acabamentos/mel.png" },
      { nome: "Nozes", textura: "/assets/img/acabamentos/nozes.png" },
      { nome: "Tauari", textura: "/assets/img/acabamentos/tauari.png" },
    ],
  },
];

export const pecas: Peca[] = [
  {
    slug: "mesa-onda",
    nome: "Mesa Onda",
    titulo: "Mesa onda",
    artigo: "a",
    capa: {
      src: "/assets/img/mesa-onda/hero.jpg",
      alt: "Mesa Onda em ambiente com xícara e livro sobre o tampo",
    },
    cartao: {
      src: "/assets/img/pecas/mesa-onda.jpg",
      alt: "Mesa Onda",
    },
    descricao: [
      "De forma refinada com traços minimalistas e esculturais, sua curvatura em aço carbono faz referência às ondas do mar e tubos procurados pelos surfistas; Suas linhas retas e topo circular em madeira, resgatam o movimento de boiar e flutuar. A mescla entre as formas naturais e contemporâneas confere presença e cria diálogo com os espaços em que a peça é inserida.",
      "Ganhadora do prêmio Club&Casa Autoral 6, Mesa Onda foi a primeira peça criada no Studio Sôa, e participou de mostras como DW! (Design Week São Paulo) e BAB (Bienal da Arquitetura Brasileira).",
    ],
    // DUVIDAS #8: a Mesa Onda é a única peça sem vídeo.
    galeria: [
      {
        tipo: "foto",
        src: "/assets/img/mesa-onda/detalhe-02.jpg",
        alt: "Mesa Onda, vista completa da peça",
        recorte: "50% 40%",
      },
      {
        tipo: "foto",
        src: "/assets/img/mesa-onda/detalhe-01.jpg",
        alt: "Mesa Onda, outro ângulo",
        recorte: "50% 62%",
      },
      {
        tipo: "foto",
        src: "/assets/img/mesa-onda/detalhe-03.jpg",
        alt: "Mesa Onda, detalhe do acabamento",
        recorte: "50% 45%",
      },
      {
        tipo: "foto",
        src: "/assets/img/mesa-onda/ambiente-01.jpg",
        alt: "Mesa Onda em ambiente completo",
        recorte: "45% 68%",
      },
      {
        tipo: "foto",
        src: "/assets/img/mesa-onda/ambiente-02.jpg",
        alt: "Duas Mesas Onda escuras em uma sala com sofá curvo e planta",
        recorte: "50% 85%",
      },
      {
        tipo: "foto",
        src: "/assets/img/mesa-onda/ambiente-03.jpg",
        alt: "Mesa Onda em tom areia ao lado do sofá, com poltrona e luminária ao fundo",
        recorte: "50% 85%",
      },
    ],
    ficha: [
      {
        rotulo: "Medidas",
        valores: ["Largura: 40cm", "Profundidade: 40cm", "Altura: 62cm"],
      },
      {
        rotulo: "Material",
        valores: ["Estrutura de serralheria", "Tampo em madeira maciça"],
      },
    ],
    // A Mesa Onda foi assinada para a Dopo Studio depois do prêmio Club&Casa,
    // e quem vende é lá: 46 é DDD de Pato Branco, no Paraná, onde foi o prêmio.
    // Link entregue pelo Pedro em 16/09/2026.
    whatsapp: "554699090117",
    acabamentos: ACABAMENTOS_MESA_ONDA,
    proxima: "banquinho-elis",
    fotoDaProxima: {
      src: "/assets/img/pecas/banquinho-elis.jpg",
      alt: "Banquinho Elis",
      recorte: "50% 65%",
    },
    fundoDoCatalogo: "/assets/img/pecas/espelho-miudo-graudo.jpg",
  },

  {
    slug: "banquinho-elis",
    nome: "Banquinho Elis",
    titulo: "Banquinho Elis",
    artigo: "o",
    capa: {
      src: "/assets/img/banquinho-elis/foto-1.jpg",
      alt: "Banquinho Elis sobre pedestal",
      recorte: "50% 65%",
    },
    cartao: {
      src: "/assets/img/banquinho-elis/hero.jpg",
      alt: "Banquinho Elis",
    },
    descricao: [
      "Elis propõe uma linguagem robusta e escultural para o tradicional banquinho. Uma peça versátil e de presença, refletindo o design brasileiro contemporâneo por meio de sua forte presença escultórica. Seu desenho explora equilíbrio, contrastes, proporção e materialidade para criar um objeto funcional e visualmente marcante.",
      "Além da volumetria, como elemento de destaque, o tampo recebe inserções de pedras naturais provenientes de recortes que seriam descartados, unindo estética, sustentabilidade e identidade brasileira, valorizando o reaproveitamento no topo da peça como \"a cereja do bolo\". Transforma o que seria resíduo em elemento de destaque.",
    ],
    galeria: [
      {
        tipo: "foto",
        src: "/assets/img/banquinho-elis/foto-1.jpg",
        alt: "Banquinho Elis sobre pedestal",
        recorte: "50% 65%",
      },
      {
        tipo: "foto",
        src: "/assets/img/banquinho-elis/hero.jpg",
        alt: "Banquinho Elis, vista completa da peça",
        recorte: "50% 62%",
      },
      {
        tipo: "foto",
        src: "/assets/img/banquinho-elis/foto-2.jpg",
        alt: "Banquinho Elis, detalhe da pedra natural no tampo",
        recorte: "50% 50%",
      },
      {
        tipo: "video",
        src: "/assets/video/banquinho-elis.mp4",
        poster: "/assets/img/banquinho-elis/video-poster.jpg",
        descricao: "Vídeo curto do Banquinho Elis",
      },
    ],
    ficha: [
      { rotulo: "Medidas", valores: ["Diâmetro: 35cm", "Altura: 18cm"] },
      {
        rotulo: "Material",
        valores: ["Madeira maciça freijó", "Pedra natural"],
      },
    ],
    proxima: "espelho-miudo-graudo",
    fotoDaProxima: {
      src: "/assets/img/pecas/espelho-miudo-graudo.jpg",
      alt: "Espelho Miúdo e Graúdo",
      recorte: "50% 57%",
    },
    fundoDoCatalogo: "/assets/img/pecas/bandeja-elis.jpg",
  },

  {
    slug: "bandeja-elis",
    nome: "Bandeja Elis",
    titulo: "Bandeja Elis",
    artigo: "a",
    capa: {
      src: "/assets/img/bandeja-elis/hero.jpg",
      alt: "Bandeja Elis sendo apresentada nas mãos",
      recorte: "50% 62%",
    },
    cartao: {
      src: "/assets/img/pecas/bandeja-elis.jpg",
      alt: "Bandeja Elis",
      recorte: "50% 58%",
    },
    descricao: [
      "Com destaque para o contraste entre formas, a Bandeja Elis combina linhas retas e arredondadas preenchendo os espaços de forma funcional e bela.",
      "O rebaixo cria uma borda que protege os elementos apoiados na bandeja, funcionando tanto para compor e decorar como também para servir.",
      "Uma peça simples com presença.",
    ],
    galeria: [
      {
        tipo: "foto",
        src: "/assets/img/bandeja-elis/detalhe.jpg",
        alt: "Bandeja Elis, vista completa da peça",
        recorte: "50% 62%",
      },
      {
        tipo: "foto",
        src: "/assets/img/bandeja-elis/hero.jpg",
        alt: "Bandeja Elis, detalhe da madeira",
        recorte: "50% 62%",
      },
      {
        tipo: "foto",
        src: "/assets/img/bandeja-elis/mesa-posta.jpg",
        alt: "Bandeja Elis posta com xícara, prato e um pequeno vaso, vista de cima",
        recorte: "50% 45%",
      },
      {
        tipo: "video",
        src: "/assets/video/bandeja-elis.mp4",
        poster: "/assets/img/bandeja-elis/video-poster.jpg",
        descricao: "Vídeo curto da Bandeja Elis",
      },
    ],
    ficha: [
      {
        rotulo: "Medidas",
        valores: ["Largura: 40cm", "Profundidade: 30cm", "Altura: 5cm"],
      },
      { rotulo: "Material", valores: ["Madeira maciça freijó"] },
    ],
    proxima: "adorno-balanco",
    fotoDaProxima: {
      src: "/assets/img/pecas/adorno-balanco-catalogo.jpg",
      alt: "Adorno Balanço",
      recorte: "50% 45%",
    },
    fundoDoCatalogo: "/assets/img/mesa-onda/ambiente-01.jpg",
  },

  {
    slug: "espelho-miudo-graudo",
    artigo: "o",
    nome: "Espelho Miúdo e Graúdo",
    titulo: "Espelho miúdo e graúdo",
    capa: {
      src: "/assets/img/espelho-miudo-graudo/hero.jpg",
      alt: "Espelho Miúdo e Graúdo sobre pedestal",
      recorte: "50% 45%",
    },
    cartao: {
      src: "/assets/img/pecas/espelho-miudo-graudo.jpg",
      alt: "Espelho Miúdo e Graúdo",
    },
    descricao: [
      "Em madeira maciça, os espelhos Miúdo e Graúdo brincam com o contraste das formas clássicas e traços limpos. Transformando um objeto do cotidiano em uma escultura de parede.",
      "Uma peça pensada para refletir os espaços, e quem os vive.",
    ],
    galeria: [
      {
        tipo: "foto",
        src: "/assets/img/espelho-miudo-graudo/hero.jpg",
        alt: "Espelho Miúdo e Graúdo, vista completa da peça",
        recorte: "50% 40%",
      },
      {
        tipo: "foto",
        src: "/assets/img/espelho-miudo-graudo/detalhe.jpg",
        alt: "Espelho Miúdo e Graúdo, detalhe do acabamento em madeira",
        recorte: "50% 50%",
      },
      {
        tipo: "foto",
        src: "/assets/img/espelho-miudo-graudo/ambiente.jpg",
        alt: "Espelho Miúdo e Graúdo em ambiente",
        recorte: "50% 40%",
      },
      {
        tipo: "foto",
        src: "/assets/img/espelho-miudo-graudo/sombra.jpg",
        alt: "Espelho Miúdo apoiado sobre superfície clara, com sombras de folhas",
        recorte: "50% 45%",
      },
      {
        tipo: "video",
        src: "/assets/video/espelho-miudo-graudo.mp4",
        poster: "/assets/img/espelho-miudo-graudo/video-poster.jpg",
        descricao: "Vídeo curto do Espelho Miúdo e Graúdo",
      },
    ],
    ficha: [
      {
        rotulo: "Miúdo",
        valores: ["Altura: 25cm", "Largura: 25cm", "Profundidade: 5cm"],
      },
      {
        rotulo: "Graúdo",
        valores: ["Altura: 60cm", "Largura: 60cm", "Profundidade: 5cm"],
      },
      { rotulo: "Material", valores: ["Madeira maciça freijó"] },
    ],
    proxima: "bandeja-elis",
    fotoDaProxima: {
      src: "/assets/img/pecas/bandeja-elis.jpg",
      alt: "Bandeja Elis",
      recorte: "50% 72%",
    },
    fundoDoCatalogo: "/assets/img/pecas/adorno-balanco-catalogo.jpg",
  },

  {
    slug: "adorno-balanco",
    artigo: "o",
    nome: "Adorno Balanço",
    titulo: "Adorno Balanço",
    capa: {
      src: "/assets/img/adorno-balanco/hero.jpg",
      alt: "Adorno Balanço sobre pedestal",
      recorte: "50% 71%",
    },
    cartao: {
      // Recorte próprio do catálogo: no Figma essa foto entra ampliada dentro
      // do quadro, não no enquadramento cheio das outras.
      src: "/assets/img/pecas/adorno-balanco-catalogo.jpg",
      alt: "Adorno Balanço",
    },
    descricao: [
      "Balanço nasceu da observação dos pequenos movimentos. Uma peça esculpida de forma artesanal, reflete o equilíbrio entre forma e matéria.",
      "Adorno, centro de mesa, fruteira ou porta trecos, Balanço é uma peça versátil que traz informação e curiosidade por explorar seu movimento e equilíbrio. Dependendo da forma como é apoiado, muda sua presença, sua função e a maneira como ocupa o espaço.",
      "Uma escultura para desacelerar o olhar.",
    ],
    galeria: [
      {
        tipo: "foto",
        src: "/assets/img/pecas/adorno-balanco-catalogo.jpg",
        alt: "Adorno Balanço sobre pedestal",
        recorte: "50% 42%",
      },
      {
        tipo: "foto",
        src: "/assets/img/adorno-balanco/contexto.jpg",
        alt: "Adorno Balanço, vista completa da peça",
        recorte: "60% 45%",
      },
      {
        tipo: "foto",
        src: "/assets/img/adorno-balanco/detalhe.jpg",
        alt: "Adorno Balanço, detalhe da madeira",
        recorte: "40% 45%",
      },
      {
        tipo: "foto",
        src: "/assets/img/adorno-balanco/pedestal.jpg",
        alt: "Adorno Balanço sobre pedestal, visto de frente",
        recorte: "50% 28%",
      },
      {
        tipo: "video",
        src: "/assets/video/adorno-balanco.mp4",
        poster: "/assets/img/adorno-balanco/video-poster.jpg",
        descricao: "Vídeo curto do Adorno Balanço",
      },
    ],
    ficha: [
      { rotulo: "Medidas", valores: ["Diâmetro: 25cm", "Altura: 15cm"] },
      { rotulo: "Material", valores: ["Madeira maciça freijó"] },
    ],
    proxima: "mesa-onda",
    fotoDaProxima: {
      src: "/assets/img/mesa-onda/detalhe-02.jpg",
      alt: "Mesa Onda",
      recorte: "50% 35%",
    },
    fundoDoCatalogo: "/assets/img/pecas/banquinho-elis.jpg",
  },
];

export function acharPeca(slug: string): Peca | undefined {
  return pecas.find((p) => p.slug === slug);
}
