import type {
  Acabamento,
  BlocoDeAcabamentos,
  Foto,
  Peca,
  QuadroDeGaleria,
} from "@/tipos/conteudo";

// O que o Tina grava em `content/pecas/<slug>.json` e o que as telas esperam
// (`Peca`) não são exatamente a mesma forma, e este arquivo é a ponte entre as
// duas. Existem três diferenças, todas por causa do painel:
//
// 1. Cada parágrafo da descrição é um item `{ texto }`, para ter uma caixa de
//    texto própria no painel. Uma lista de textos simples vira linhas de uma
//    linha só, ruins para escrever parágrafo.
// 2. Cada quadro da galeria diz o que é em `_template` ("foto" ou "vídeo"), que é
//    como a Tina distingue os modelos de uma lista. As telas leem `tipo`.
// 3. Campo vazio no painel pode chegar como string vazia ou `null`, e as telas
//    esperam ausência. Aqui vazio vira ausente.
//
// Tudo o mais passa direto. Quem lê o resultado não precisa saber que existe CMS.

type Vazio = null | undefined | "";

export interface FotoDoCms {
  src: string;
  alt?: string | null;
  recorte?: string | null;
  zoom?: string | null;
  celular?: { src?: string | null; ate?: number | null } | null;
}

export interface PecaDoCms {
  nome: string;
  titulo?: string | null;
  artigo: string;
  capa: FotoDoCms;
  cartao: FotoDoCms;
  descricao?: { texto?: string | null }[] | null;
  galeria?:
    | {
        _template: string;
        src: string;
        alt?: string | null;
        recorte?: string | null;
        zoom?: string | null;
        celular?: { src?: string | null; ate?: number | null } | null;
        poster?: string | null;
        descricao?: string | null;
      }[]
    | null;
  ficha?: { rotulo: string; valores?: (string | null)[] | null }[] | null;
  acabamentos?:
    | {
        rotulo: string;
        itens?:
          | { nome: string; cor?: string | null; textura?: string | null }[]
          | null;
      }[]
    | null;
  whatsapp?: string | null;
  bloco3d?: string | null;
  videoPrimeiro?: boolean | null;
  fotoDeAtalho?: FotoDoCms | null;
  proxima?: string | null;
  fotoDaProxima?: FotoDoCms | null;
  fundoDoCatalogo?: string | null;
}

const vazio = (v: unknown): v is Vazio => v === undefined || v === null || v === "";

function foto(f: FotoDoCms): Foto {
  const saida: Foto = { src: f.src, alt: f.alt ?? "" };
  if (!vazio(f.recorte)) saida.recorte = f.recorte;
  if (!vazio(f.zoom)) saida.zoom = f.zoom;
  if (f.celular && !vazio(f.celular.src)) {
    saida.celular = { src: f.celular.src };
    if (typeof f.celular.ate === "number") saida.celular.ate = f.celular.ate;
  }
  return saida;
}

function quadro(q: NonNullable<PecaDoCms["galeria"]>[number]): QuadroDeGaleria {
  if (q._template === "video") {
    return {
      tipo: "video",
      src: q.src,
      poster: q.poster ?? "",
      descricao: q.descricao ?? "",
    };
  }
  return { tipo: "foto", ...foto(q) };
}

function bloco(
  b: NonNullable<PecaDoCms["acabamentos"]>[number],
): BlocoDeAcabamentos {
  return {
    rotulo: b.rotulo,
    itens: (b.itens ?? []).map((i): Acabamento => {
      const item: Acabamento = { nome: i.nome };
      if (!vazio(i.cor)) item.cor = i.cor;
      if (!vazio(i.textura)) item.textura = i.textura;
      return item;
    }),
  };
}

/**
 * Transforma o JSON de uma peça (como o Tina grava) em `Peca`. O `slug` vem do
 * nome do arquivo, não de um campo: é o que faz uma peça nova criada no painel
 * ganhar o endereço certo sem ninguém digitar a mesma coisa duas vezes.
 */
export function normalizarPeca(slug: string, dados: PecaDoCms): Peca {
  const peca: Peca = {
    slug,
    nome: dados.nome,
    titulo: vazio(dados.titulo) ? dados.nome : dados.titulo,
    artigo: dados.artigo === "o" ? "o" : "a",
    capa: foto(dados.capa),
    cartao: foto(dados.cartao),
    descricao: (dados.descricao ?? [])
      .map((d) => d.texto)
      .filter((t): t is string => !vazio(t)),
    galeria: (dados.galeria ?? []).map(quadro),
    ficha: (dados.ficha ?? []).map((l) => ({
      rotulo: l.rotulo,
      valores: (l.valores ?? []).filter((v): v is string => !vazio(v)),
    })),
    // Herança da V1. A V2 não lê nenhum dos três, mas o tipo ainda os pede, e
    // uma peça criada no painel não tem como preenchê-los.
    proxima: dados.proxima ?? "",
    fotoDaProxima: foto(dados.fotoDaProxima ?? dados.cartao),
    fundoDoCatalogo: dados.fundoDoCatalogo ?? "",
  };

  if (dados.acabamentos && dados.acabamentos.length > 0) {
    peca.acabamentos = dados.acabamentos.map(bloco);
  }
  if (!vazio(dados.whatsapp)) peca.whatsapp = dados.whatsapp;
  if (!vazio(dados.bloco3d)) peca.bloco3d = dados.bloco3d;
  if (dados.videoPrimeiro) peca.videoPrimeiro = true;
  if (dados.fotoDeAtalho && !vazio(dados.fotoDeAtalho.src)) {
    peca.fotoDeAtalho = foto(dados.fotoDeAtalho);
  }
  return peca;
}
