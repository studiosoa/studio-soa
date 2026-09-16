import type { Exposicao } from "@/tipos/conteudo";

// Coleção `exposicoes`. A ordem é a da lista da esquerda, e a primeira é a que
// abre a página.
//
// DUVIDAS #9: confirmar com a Luiza se falta alguma foto em cada mostra.
export const exposicoes: Exposicao[] = [
  {
    chave: "club-casa",
    nome: "Prêmio Club&Casa Autoral 6",
    local: "Pato Branco, PR",
    descricao: [
      "Prêmio nacional de Design promovido pelo Club&Casa. Mesa Onda foi ganhadora da etapa estadual e nacional. A partir da premiação, assinamos a peça, Mesa Onda, para Dopo Studio.",
    ],
    fotos: [
      {
        src: "/assets/img/exposicoes/club-casa-1.jpg",
        zoom: "/assets/img/exposicoes/zoom/club-casa-1.jpg",
        alt: "Luiza Pessôa com o troféu na festa de premiação do Club&Casa Design Espírito Santo",
      },
      {
        src: "/assets/img/exposicoes/club-casa-2.jpg",
        zoom: "/assets/img/exposicoes/zoom/club-casa-2.jpg",
        alt: "Luiza Pessôa no palco da premiação, anunciada como vencedora regional do Autoral 6",
      },
    ],
  },

  {
    chave: "design-week",
    nome: "Design Week São Paulo",
    local: "São Paulo, SP",
    descricao: [
      "A DW! Semana de Design é um festival urbano que tem o objetivo de promover a cultura do design e suas conexões com arquitetura, arte, urbanismo, sustentabilidade, inovação e outros temas da economia criativa.",
      "A Mesa Onda, participou expondo na BoomspDesign, um dos principais polos da Semana de Design em São Paulo, que acontece em um dos edifícios ícones da cidade, o Edifício Itália.",
    ],
    fotos: [
      {
        src: "/assets/img/exposicoes/design-week-1.jpg",
        zoom: "/assets/img/exposicoes/zoom/design-week-1.jpg",
        alt: "Mesa Onda exposta no polo BoomspDesign, com a sinalização da curadoria ao fundo",
      },
      {
        src: "/assets/img/exposicoes/design-week-2.jpg",
        zoom: "/assets/img/exposicoes/zoom/design-week-2.jpg",
        alt: "Vista do estande com a sinalização Club&Casa Design, dōpo e BoomspDesign",
      },
      {
        src: "/assets/img/exposicoes/design-week-3.jpg",
        zoom: "/assets/img/exposicoes/zoom/design-week-3.jpg",
        alt: "Mesa Onda sobre pedestal branco na exposição",
      },
    ],
  },

  {
    chave: "bab",
    // A quebra é fixa: em negrito o nome reflui sozinho e joga só "BAB" para a
    // segunda linha. Com o `\n` a divisão é sempre a mesma.
    nome: "Bienal da Arquitetura\nBrasileira BAB",
    local: "São Paulo, SP",
    descricao: [
      "Em São Paulo, Ibirapuera, no Pavilhão das Culturas – projeto do icônico Oscar Niemeyer, a BAB é um evento cultural que celebra a produção arquitetônica nacional, aproximando a arquitetura da vida real.",
      "Uma experiência imersiva e educativa, reunindo diferentes vozes, territórios e formas de habitar. Mesa Onda compôs o Pavilhão Espírito Santo, projeto da arquiteta capixaba Letícia Finamore.",
    ],
    fotos: [
      {
        src: "/assets/img/exposicoes/bab-1.jpg",
        zoom: "/assets/img/exposicoes/zoom/bab-1.jpg",
        alt: "Mesa Onda no Pavilhão Espírito Santo, ao lado do sofá curvo e da planta",
      },
      {
        src: "/assets/img/exposicoes/bab-2.jpg",
        zoom: "/assets/img/exposicoes/zoom/bab-2.jpg",
        alt: "Outro ângulo do Pavilhão Espírito Santo, com poltrona e bancos escuros",
      },
      {
        src: "/assets/img/exposicoes/bab-3.jpg",
        zoom: "/assets/img/exposicoes/zoom/bab-3.jpg",
        alt: "Mesa Onda em tom verde no ambiente do pavilhão, vista pela passagem",
      },
    ],
  },

  {
    chave: "casacor",
    nome: "Casacor ES",
    local: "Vitória, ES",
    descricao: [
      "CASACOR é a maior e mais completa mostra de arquitetura, design de interiores e paisagismo das Américas. Nesta edição, no edifício importante para a história da cidade, Hotel Porto/Canto do Sol, Espelho Miúdo compôs o espaço “Sala de TV de Volta”, projeto da arquiteta mineira Débora Bicalho.",
    ],
    fotos: [
      {
        src: "/assets/img/exposicoes/casacor-1.jpg",
        zoom: "/assets/img/exposicoes/zoom/casacor-1.jpg",
        alt: "Espelho Miúdo compondo a Sala de TV de Volta, na Casacor ES",
      },
      {
        src: "/assets/img/exposicoes/casacor-2.jpg",
        zoom: "/assets/img/exposicoes/zoom/casacor-2.jpg",
        alt: "Parede do ambiente da Casacor Espírito Santo com a marcação da mostra",
      },
    ],
  },
];
