import { defineConfig, type TinaField } from "tinacms";

// Configuração do painel de edição do Studio Sôa (TinaCMS).
//
// O que está aqui hoje é o primeiro trecho do plano (`2_Estrategia/Plano-Integracao-Tina.md`):
// as peças e a ordem do catálogo. Exposições, páginas únicas e dados do site
// entram nos próximos trechos, na mesma lógica: um arquivo JSON em `content/`
// por item, e as telas lendo esse arquivo em tempo de build (modo simples, sem
// edição visual).
//
// O painel abre em `/admin/index.html`. Em desenvolvimento ele roda em modo
// local: lê e grava os arquivos de `content/` direto no disco, sem conta
// nenhuma. Para valer no site publicado, falta a Fase 0 do plano: criar o
// projeto na TinaCloud e pôr o `NEXT_PUBLIC_TINA_CLIENT_ID` e o `TINA_TOKEN`
// nas variáveis de ambiente da Netlify. Ver `LEIA-ME.md`.

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.HEAD || "main";

/** "Banquinho Elis" vira "banquinho-elis": o nome do arquivo e o endereço da peça. */
function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Os campos de uma foto, iguais em todo lugar do site onde uma foto aparece.
 * Espelham o tipo `Foto` de `src/tipos/conteudo.ts` com os mesmos nomes, de
 * propósito: assim o que o painel grava entra nas telas sem tradução.
 */
function camposDeFoto(): TinaField[] {
  return [
    { type: "image", name: "src", label: "Foto", required: true },
    {
      type: "string",
      name: "alt",
      label: "Descrição da foto",
      description:
        "Lida por leitor de tela e mostrada se a foto não carregar. Descreva o que se vê.",
    },
    {
      type: "string",
      name: "recorte",
      label: "Parte da foto que aparece",
      description:
        "A foto é cortada para caber no quadro. Aqui você diz qual parte fica: 50% 50% é o centro, 50% 0% é o topo, 50% 100% é a base. Se trocar a foto, confira no site como ficou.",
    },
    {
      type: "image",
      name: "zoom",
      label: "Foto inteira, para o zoom",
      description: "Versão sem corte, a que abre quando a pessoa amplia. Opcional.",
      // Escondido em 10/11/2026: nenhuma foto do site usa, e quem edita não precisa
      // dele. O campo continua no esquema para o dado não se perder se alguém usar.
      ui: { component: "hidden" },
    },
    {
      type: "object",
      name: "celular",
      label: "Foto alternativa para celular",
      description: "Só se o enquadramento do computador não funcionar no celular.",
      // Escondido pelo mesmo motivo do `zoom`: nenhuma foto usa.
      ui: { component: "hidden" },
      fields: [
        { type: "image", name: "src", label: "Foto" },
        {
          type: "number",
          name: "ate",
          label: "Vale até esta largura (px)",
          description: "Vazio usa 600.",
        },
      ],
    },
  ];
}

/**
 * Os campos de uma foto de exposição. Parecidos com os das peças, sem a foto de
 * celular (nenhuma mostra usa). A "foto inteira" fica visível: todas as fotos das
 * quatro mostras têm uma, e é ela que abre quando a pessoa clica para ampliar.
 */
function camposDeFotoDeExposicao(): TinaField[] {
  return [
    { type: "image", name: "src", label: "Foto", required: true },
    {
      type: "string",
      name: "alt",
      label: "Descrição da foto",
      description:
        "Lida por leitor de tela e mostrada se a foto não carregar. Descreva o que se vê.",
    },
    {
      type: "string",
      name: "recorte",
      label: "Parte da foto que aparece",
      description:
        "O quadro é cortado para caber na página. Aqui você diz qual parte da foto fica: o primeiro número é o lado (0% esquerda, 50% meio, 100% direita) e o segundo é a altura (0% topo, 50% meio, 100% base). Vazio usa o centro.",
    },
    {
      type: "image",
      name: "zoom",
      label: "Foto inteira, para ampliar",
      description:
        "Opcional. É a foto que abre em tela cheia quando a pessoa clica. Se trocar a foto de cima, troque esta também ou apague, senão ao ampliar aparece a foto antiga.",
    },
  ];
}

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    // O painel é um site pronto que a Tina gera e põe em `public/admin`.
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      // Raiz `assets` e não `assets/img`, porque os vídeos moram em
      // `assets/video`, e o seletor de arquivo precisa enxergar os dois.
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "peca",
        label: "Peças",
        path: "content/pecas",
        format: "json",
        ui: {
          // O nome do arquivo é o endereço da página (`/pecas/<nome>`), então
          // numa peça nova ele sai do nome dela, sem ninguém digitar duas vezes.
          filename: {
            slugify: (valores) => slugify(valores?.nome || ""),
          },
          // Sem apagar pelo painel: um clique errado tira a peça do site. Criar e
          // editar ficam livres. Para apagar de verdade, pelo Git.
          allowedActions: { delete: false },
          // Sem `router` de propósito: ele liga a edição visual, em que o painel
          // abre a página ao lado do formulário, e as telas ainda não usam o gancho
          // `useTina` que isso exige. Com ele o formulário não aparece. Ver
          // "Fase 4" do plano: a edição visual é um passo posterior e opcional.
        },
        fields: [
          {
            type: "string",
            name: "nome",
            label: "Nome da peça",
            description:
              "É o título grande da página da peça, o nome no catálogo, a aba do navegador e o texto das mensagens de WhatsApp e e-mail.",
            required: true,
          },
          {
            type: "string",
            name: "artigo",
            label: "Artigo do nome",
            description:
              'Para os botões escreverem "sobre a Mesa Onda" ou "sobre o Banquinho Elis".',
            options: [
              { value: "a", label: "a (a Mesa Onda)" },
              { value: "o", label: "o (o Banquinho Elis)" },
            ],
            required: true,
          },
          {
            type: "object",
            name: "capa",
            label: "Foto do topo da página",
            description:
              "Sem esta foto e sem a do catálogo, a peça fica como rascunho e não aparece no site. O painel deixa salvar, mas a peça só entra no ar com as duas.",
            fields: camposDeFoto(),
          },
          {
            type: "object",
            name: "cartao",
            label: "Foto no catálogo",
            description:
              "A que aparece no quadrado da peça na página Peças. Sem ela e sem a foto do topo, a peça fica como rascunho e não aparece no site.",
            fields: camposDeFoto(),
          },
          {
            type: "object",
            name: "fotoDeAtalho",
            label: "Foto no atalho 'próxima peça'",
            description:
              "A que aparece quando esta peça é a seguinte no fim da página de outra. Vazio usa a foto do catálogo.",
            // Escondido em 10/11/2026: é detalhe de direção de arte que a Luiza não
            // precisa mexer. Os valores que já existem ficam guardados no arquivo.
            ui: { component: "hidden" },
            fields: camposDeFoto(),
          },
          {
            type: "object",
            name: "descricao",
            label: "Texto de apresentação",
            description: "Um parágrafo por item.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: String(item?.texto || "Parágrafo").slice(0, 60),
              }),
            },
            fields: [
              {
                type: "string",
                name: "texto",
                label: "Parágrafo",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "galeria",
            label: "Galeria",
            description:
              "Arraste os itens para mudar a ordem. A primeira foto é a que abre.",
            list: true,
            templates: [
              {
                name: "foto",
                label: "Foto",
                // O rótulo de cada item da lista é a descrição da foto, para dar
                // para achar uma entre sete sem abrir uma por uma.
                ui: {
                  itemProps: (item) => ({
                    label: String(item?.alt || item?.src || "Foto").slice(0, 60),
                  }),
                },
                fields: camposDeFoto(),
              },
              {
                name: "video",
                label: "Vídeo",
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Arquivo do vídeo (.mp4)",
                    required: true,
                  },
                  {
                    type: "image",
                    name: "poster",
                    label: "Foto de capa do vídeo",
                    description: "Aparece antes de a pessoa apertar play.",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "descricao",
                    label: "Descrição do vídeo",
                    description: "Lida por leitor de tela.",
                  },
                ],
              },
            ],
          },
          {
            type: "boolean",
            name: "videoPrimeiro",
            label: "Mostrar o vídeo antes das fotos",
            description:
              "Ligado, o vídeo abre a galeria. Desligado, ele vem por último.",
          },
          {
            type: "object",
            name: "ficha",
            label: "Ficha técnica",
            list: true,
            ui: { itemProps: (item) => ({ label: String(item?.rotulo || "Linha") }) },
            fields: [
              {
                type: "string",
                name: "rotulo",
                label: "Título da linha",
                description: "Por exemplo: Medidas, Material.",
              },
              { type: "string", name: "valores", label: "Valores", list: true },
            ],
          },
          {
            type: "object",
            name: "acabamentos",
            label: "Acabamentos (só da Mesa Onda)",
            description: "Só a Mesa Onda tem. Deixe vazio nas outras peças.",
            list: true,
            ui: { itemProps: (item) => ({ label: String(item?.rotulo || "Bloco") }) },
            fields: [
              { type: "string", name: "rotulo", label: "Título do bloco" },
              {
                type: "object",
                name: "itens",
                label: "Acabamentos",
                list: true,
                ui: { itemProps: (item) => ({ label: String(item?.nome || "Acabamento") }) },
                fields: [
                  { type: "string", name: "nome", label: "Nome" },
                  {
                    type: "string",
                    name: "cor",
                    label: "Cor",
                    description: "Hexadecimal, como #d9c9b3. Para os acabamentos de uma cor só.",
                  },
                  {
                    type: "image",
                    name: "textura",
                    label: "Foto da textura",
                    description: "Para madeira e ouro. Se tiver foto, ela vale mais que a cor.",
                  },
                ],
              },
            ],
          },
          {
            type: "string",
            name: "whatsapp",
            label: "WhatsApp só desta peça",
            description:
              "Com código do país e DDD, sem símbolos: 5527999999999. Vazio usa o do estúdio.",
            // Escondidos em 10/11/2026: são ajustes raros, e trocar um número aqui
            // muda para onde vão as mensagens dos clientes. Valores já gravados ficam.
            ui: { component: "hidden" },
          },
          {
            type: "string",
            name: "bloco3d",
            label: "Link do bloco 3D só desta peça",
            description: "Vazio usa a pasta compartilhada do estúdio.",
            ui: { component: "hidden" },
          },
        ],
      },

      {
        name: "catalogo",
        label: "Ordem do catálogo",
        path: "content",
        format: "json",
        // Um arquivo só, `content/catalogo.json`. Não dá para criar outro nem apagar este.
        match: { include: "catalogo" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "pecas",
            label: "Peças, na ordem do catálogo",
            description:
              "Arraste para mudar a ordem. Uma peça que não estiver na lista aparece no fim.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label:
                  String(item?.peca || "Peça")
                    .split("/")
                    .pop()
                    ?.replace(/\.json$/, "") ?? "Peça",
              }),
            },
            fields: [
              {
                type: "reference",
                name: "peca",
                label: "Peça",
                collections: ["peca"],
              },
            ],
          },
        ],
      },

      {
        name: "exposicao",
        label: "Exposições",
        path: "content/exposicoes",
        format: "json",
        ui: {
          // O nome do arquivo é a chave da mostra, só para o painel organizar. A
          // página não mostra endereço de exposição.
          filename: {
            slugify: (valores) => slugify(valores?.nome || ""),
          },
          // Mesma razão das peças: um clique errado tira a mostra do site. Para
          // apagar de verdade, pelo Git. Isto também tira o Rename do menu ⋮.
          allowedActions: { delete: false },
        },
        fields: [
          {
            type: "string",
            name: "nome",
            label: "Nome da mostra",
            description:
              "O título que aparece embaixo do quadrado, na página Exposições. Sem nome e sem foto, a mostra fica como rascunho e não aparece no site.",
            required: true,
          },
          {
            type: "string",
            name: "ano",
            label: "Ano",
            description:
              "Quatro números, como 2026. Vazio não mostra nada embaixo do nome.",
          },
          {
            type: "object",
            name: "fotos",
            label: "Fotos",
            description:
              "Arraste os itens para mudar a ordem. A primeira foto é a que aparece no quadrado, e clicar nele abre todas em tela cheia.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: String(item?.alt || item?.src || "Foto").slice(0, 60),
              }),
            },
            fields: camposDeFotoDeExposicao(),
          },
          // Guardados no arquivo e escondidos: a página não mostra o texto nem a
          // cidade desde 27/10. Esconder preserva o valor; apagar o campo do
          // esquema perderia o texto no primeiro salvar.
          {
            type: "string",
            name: "local",
            label: "Cidade",
            ui: { component: "hidden" },
          },
          {
            type: "string",
            name: "descricao",
            label: "Texto da mostra",
            list: true,
            ui: { component: "hidden" },
          },
        ],
      },

      {
        name: "ordemExposicoes",
        label: "Ordem das exposições",
        path: "content",
        format: "json",
        // Um arquivo só, `content/ordem-exposicoes.json`, igual ao do catálogo.
        match: { include: "ordem-exposicoes" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "exposicoes",
            label: "Exposições, na ordem da página",
            description:
              "Arraste para mudar a ordem. Uma mostra que não estiver na lista aparece no fim.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label:
                  String(item?.exposicao || "Exposição")
                    .split("/")
                    .pop()
                    ?.replace(/\.json$/, "") ?? "Exposição",
              }),
            },
            fields: [
              {
                type: "reference",
                name: "exposicao",
                label: "Exposição",
                collections: ["exposicao"],
              },
            ],
          },
        ],
      },

      {
        name: "ondeEncontrar",
        label: "Onde encontrar",
        path: "content",
        format: "json",
        // Um arquivo só, `content/onde-encontrar.json`. Não dá para criar outro nem apagar este.
        match: { include: "onde-encontrar" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "atendimento",
            label: "Compra direta (faixa de cima da página)",
            fields: [
              { type: "string", name: "titulo", label: "Título" },
              {
                type: "string",
                name: "texto",
                label: "Texto",
                description: "Inclua os dias e os horários de atendimento.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "rotuloDoLink",
                label: "Texto do botão",
                description: "O botão leva ao WhatsApp do estúdio.",
              },
            ],
          },
          {
            type: "string",
            name: "rotuloDosPontos",
            label: "Frase acima dos pontos de venda",
            description: "Aparece acima da lista de lugares, na faixa de baixo.",
          },
          {
            type: "object",
            name: "pontos",
            label: "Pontos de venda",
            description:
              "Um bloco por lugar, lado a lado na página. Para incluir outro, use o botão de adicionar no fim da lista. Arraste para mudar a ordem. Sem nenhum ponto, a faixa de baixo some.",
            list: true,
            ui: {
              itemProps: (item) => ({ label: String(item?.nome || "Ponto de venda") }),
            },
            fields: [
              {
                type: "string",
                name: "nome",
                label: "Nome do lugar",
                description: "Sem nome, o ponto não aparece no site.",
                required: true,
              },
              {
                type: "string",
                name: "endereco",
                label: "Endereço",
                description:
                  "Uma linha por linha, como num envelope: rua e número, bairro, cidade, CEP. Aperte Enter para ir à linha de baixo.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "linkDoMapa",
                label: "Link do mapa",
                description:
                  "No Google Maps, ache o lugar, clique em Compartilhar e copie o link. Vazio esconde o botão Abrir no mapa.",
              },
            ],
          },
        ],
      },
    ],
  },
});
