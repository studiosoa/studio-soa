// O que o Tina grava em `content/onde-encontrar.json` e o que a página espera.
// Mesma ideia de `normalizar-peca.ts`: vazio chega como string vazia ou `null`, e
// aqui vira ausente. A diferença é o endereço, que no painel é uma caixa de texto
// (uma linha por linha, como num envelope) e na página é uma lista de linhas.

type Vazio = null | undefined | "";
const vazio = (v: unknown): v is Vazio => v === undefined || v === null || v === "";

export interface OndeEncontrarDoCms {
  atendimento?: {
    titulo?: string | null;
    texto?: string | null;
    rotuloDoLink?: string | null;
  } | null;
  rotuloDosPontos?: string | null;
  pontos?:
    | {
        nome?: string | null;
        endereco?: string | null;
        linkDoMapa?: string | null;
      }[]
    | null;
}

export interface PontoDeVenda {
  nome: string;
  linhasDoEndereco: string[];
  /** Vazio esconde o botão "Abrir no mapa". */
  linkDoMapa: string;
}

export interface OndeEncontrar {
  atendimento: { titulo: string; texto: string; rotuloDoLink: string };
  rotuloDosPontos: string;
  pontos: PontoDeVenda[];
}

export function normalizarOndeEncontrar(d: OndeEncontrarDoCms): OndeEncontrar {
  return {
    atendimento: {
      titulo: d.atendimento?.titulo ?? "",
      texto: d.atendimento?.texto ?? "",
      rotuloDoLink: d.atendimento?.rotuloDoLink ?? "",
    },
    rotuloDosPontos: d.rotuloDosPontos ?? "",
    // Ponto sem nome é linha em branco esquecida no painel: não vira bloco vazio no site.
    pontos: (d.pontos ?? [])
      .filter((p) => !vazio(p.nome))
      .map((p) => ({
        nome: p.nome as string,
        linhasDoEndereco: (p.endereco ?? "")
          .split(/\r?\n/)
          .map((linha) => linha.trim())
          .filter((linha) => linha !== ""),
        linkDoMapa: p.linkDoMapa?.trim() ?? "",
      })),
  };
}
