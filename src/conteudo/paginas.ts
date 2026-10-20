import type { Foto } from "@/tipos/conteudo";

// As páginas que existem uma vez só. No Payload cada uma destas constantes vira
// um global (`home`, `sobre`, `ondeEncontrar`, `contato`), porque são telas
// únicas com campos próprios, não itens de uma lista.

export const home = {
  // No celular entra o arquivo ORIGINAL, sem os 400px de parede que foram
  // colados no topo do `hero.jpg`. Aquela parede existe só para afastar a
  // cabeça dela do menu sobreposto, e em tela estreita o menu deixa de
  // sobrepor: ali a parede vira espaço morto e ainda encolhe a Luiza, porque
  // o `cover` passa a caber pela altura inteira do arquivo.
  capa: {
    src: "/assets/img/home/hero.jpg",
    alt: "Luiza Pessôa sentada ao lado da Mesa Onda",
    celular: { src: "/assets/img/home/hero-original-1499.jpg" },
  } as Foto,

  // A faixa de peças logo abaixo do topo. É seleção editorial, não o catálogo
  // inteiro, por isso mora aqui e não sai de `pecas.ts`.
  vitrine: {
    esquerda: {
      peca: "banquinho-elis",
      foto: {
        src: "/assets/img/banquinho-elis/hero.jpg",
        alt: "Banquinho Elis",
      } as Foto,
      nome: "Banquinho Elis",
    },
    chamada: { rotulo: "Descubra mais", href: "/pecas" },
    direita: [
      {
        peca: "mesa-onda",
        foto: {
          src: "/assets/img/mesa-onda/hero.jpg",
          alt: "Mesa Onda",
        } as Foto,
        nome: "Mesa Onda",
      },
      {
        peca: "bandeja-elis",
        foto: {
          src: "/assets/img/pecas/bandeja-elis.jpg",
          alt: "Bandeja Elis",
          recorte: "50% 76%",
        } as Foto,
        nome: "Bandeja Elis",
      },
    ],
  },

  designer: {
    foto: {
      src: "/assets/img/home/designer.jpg",
      alt: "Luiza Pessôa ao lado do Banquinho Elis",
    } as Foto,
    sobrancelha: "A designer por trás do estúdio",
    titulo: "Luiza Pessôa, arquiteta e criadora.",
    // DUVIDAS #7: o travessão duplo veio assim do texto original da Luiza.
    resumo:
      "Luiza Pessôa, meio gaúcha, meio capixaba, cresceu apaixonada pelo mundo das artes.",
    chamada: { rotulo: "Saiba mais sobre a arquiteta", href: "/sobre" },
  },

  manifesto: {
    rotulo: "Manifesto",
    abertura:
      "o studio sôa acredita que os espaços em que vivemos são muito mais do que apenas espaços — eles são feitos de histórias e memórias.",
    fechamento: [
      "queremos estar presentes nas histórias que ainda serão criadas, tornando cada espaço ainda mais autêntico e significativo.",
      "nossas peças fazem parte dos momentos do dia a dia, das pequenas rotinas e das grandes lembranças.",
    ],
    citacao: [
      "cada objeto, peça e mobiliário ajuda a construir esse cenário, refletindo quem vive ali.",
      "acreditamos no design que vai além da estética, que é vivido, sentido e compartilhado.",
    ],
    fotoAlta: {
      src: "/assets/img/adorno-balanco/detalhe.jpg",
      alt: "Detalhe da madeira do Adorno Balanço",
    } as Foto,
    fotoLarga: {
      src: "/assets/img/espelho-miudo-graudo/detalhe.jpg",
      alt: "Detalhe da base curva em madeira maciça",
      recorte: "50% 45%",
    } as Foto,
    // Recorte próprio da home: o Figma amplia essa foto dentro do quadro em vez
    // de usar o enquadramento cheio.
    fotoDaMao: {
      src: "/assets/img/home/manifesto-mao.jpg",
      alt: "Mãos apoiando a Bandeja Elis",
    } as Foto,
  },
};

export const sobre = {
  // Sem foto de topo desde 16/09: era o mesmo arquivo da home, então a Sobre
  // abria repetindo a primeira tela do site. A página começa no verde.
  perfil: {
    foto: {
      src: "/assets/img/sobre/luiza-perfil.jpg",
      alt: "Retrato de Luiza Pessôa",
    } as Foto,
    nome: "Luiza Pessôa",
    // O negrito faz parte do texto, então os parágrafos guardam HTML. No Payload
    // este campo vira rich text, e o componente passa a render o que vier dele.
    //
    // Revisão de 14/10: a Luiza sublinhou de vermelho no documento o que fica em
    // negrito, "só" isso, então saíram os negritos de gaúcha, capixaba, "nasceu a
    // primeira peça de design" e 2025. E a segunda frase ganhou o texto dela:
    // explorou / criação / experimentação, no lugar de experimentou / criar /
    // explorar a escrita.
    paragrafos: [
      "meio gaúcha, meio capixaba, cresceu apaixonada pelo mundo das artes.",
      "Quando criança, desenhava pelas paredes de casa, e sempre de forma natural, <strong>explorou diferentes formas de expressão</strong>, criação de objetos, fantasias, experimentação da escrita, música, costura, fotografia… <strong>A arte sempre esteve presente independente de sua forma</strong>.",
      "“Durante a faculdade de arquitetura e urbanismo, me encantei com as <strong>reflexões sobre sociedade e espaço</strong> que o urbanismo apresenta, e também, de forma especial, pelo mundo de possibilidades que a arquitetura e o design proporcionam.”",
      "Com a oportunidade de participar de um concurso de design de mobiliário em 2024, nasceu a primeira peça de design, <strong>a MESA ONDA</strong> — logo surgiu o studio sôa em 2025, e desde então, as ideias e desenhos <strong>não param</strong> de acontecer.",
    ],
  },

  frase: {
    foto: {
      src: "/assets/img/espelho-miudo-graudo/detalhe.jpg",
      alt: "",
    } as Foto,
    texto:
      "os espaços em que vivemos são muito mais do que apenas espaços — eles são feitos de histórias e memórias.",
  },

  estudio: {
    titulo: "Sobre Studio",
    // Os parágrafos guardam HTML pelo mesmo motivo do perfil: o negrito é parte do
    // texto. Os cinco trechos são os que a Luiza sublinhou de vermelho na revisão
    // de 14/10 (nome dela, escultura/materialidade/cotidiano, observação,
    // mobiliário e objetos, artesanal).
    paragrafos: [
      "O Studio SÔA é um estúdio brasileiro de design autoral fundado em 2025, por <strong>Luiza Pessôa</strong>, arquiteta, designer e criadora.",
      "Movido pelo desejo de criar peças que vão além da função, o estúdio desenvolve mobiliário e objetos que unem <strong>escultura, materialidade e cotidiano</strong>. Cada projeto nasce da <strong>observação</strong> da vida, das memórias, da cultura brasileira e da relação afetiva que construímos com os espaços que habitamos.",
      "Com uma linguagem marcada por traços simples, mas significativa presença, o Studio SÔA desenvolve <strong>mobiliário e objetos</strong> que exploram contrastes entre leveza e solidez, movimento e permanência, buscando uma estética atemporal e profundamente conectada à brasilidade contemporânea.",
      "A produção é <strong>artesanal</strong>, visando sempre o melhor aproveitamento de matéria prima e o reaproveitamento de descartes da indústria.",
    ],
    // Os três quadros do GIF Looping_Peças da Luiza, trocando no mesmo tempo do
    // arquivo dela. O primeiro fica embaixo; os outros acendem por cima na vez
    // deles. Virou JPEG + CSS porque o GIF original tinha 3,4 MB.
    looping: [
      {
        src: "/assets/img/sobre/looping-1.jpg",
        alt: "Peças do Studio Sôa reunidas em um ambiente claro, com alguém passando ao fundo",
      },
      { src: "/assets/img/sobre/looping-2.jpg", alt: "" },
      { src: "/assets/img/sobre/looping-3.jpg", alt: "" },
    ] as Foto[],
  },
};

export const contato = {
  // O arquivo grande tem a Luiza à direita e o Banquinho no canto de baixo, uma
  // composição feita para quadro em pé. No celular o quadro é deitado, o `cover`
  // mostra a largura inteira e sobra parede vazia à esquerda dela. O recorte de
  // celular é a mesma foto centrada nela.
  foto: {
    src: "/assets/img/home/designer.jpg",
    alt: "Luiza Pessôa, do Studio Sôa",
    celular: { src: "/assets/img/contato/luiza-mobile.jpg", ate: 900 },
  } as Foto,
  rotulo: "Fale com o estúdio",
  titulo: "Ficou com alguma dúvida?",
  lead: "Sobre uma peça, a madeira, o prazo ou o jeito como o estúdio trabalha. Escreva por aqui e a Luiza responde. Para pedir uma peça, o botão fica na página dela.",
};

export const ondeEncontrar = {
  rotulo: "Onde encontrar",
  titulo: "As peças estão na Ozlo Home Brand",
  nota: "Para encomendar uma peça ou tirar dúvida direto com o estúdio,",
};

/** A faixa que fecha as páginas: nenhuma termina em beco sem saída. */
export const faixaDoCatalogo = {
  href: "/pecas",
  foto: {
    src: "/assets/img/home/faixa.jpg",
    alt: "Duas Mesas Onda em um ambiente com painel de madeira",
  } as Foto,
  rotulo: "Conheça o nosso catálogo",
};
