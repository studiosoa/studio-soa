import type { Exposicao } from "@/tipos/conteudo";
import { normalizarFoto, type FotoDoCms } from "./normalizar-peca";

// O que o Tina grava em `content/exposicoes/<chave>.json` e o que a página de
// Exposições espera (`Exposicao`). Mesma ideia de `normalizar-peca.ts`: campo
// vazio no painel chega como string vazia ou `null`, e aqui vira ausente.

type Vazio = null | undefined | "";
const vazio = (v: unknown): v is Vazio => v === undefined || v === null || v === "";

export interface ExposicaoDoCms {
  nome: string;
  ano?: string | null;
  // Guardados no arquivo e escondidos no painel: a página de Exposições não
  // mostra o texto nem a cidade desde a revisão de 27/10, mas apagar o texto
  // seria perder trabalho que volta a valer se a página mudar.
  local?: string | null;
  descricao?: (string | null)[] | null;
  fotos?: (Omit<FotoDoCms, "src"> & { src?: string | null })[] | null;
}

/**
 * Uma mostra só entra no site com nome e ao menos uma foto. O painel deixa salvar
 * sem elas, e um quadrado sem foto quebraria a galeria. Sem isso a mostra fica de
 * rascunho e entra sozinha no build seguinte ao salvar a primeira foto.
 */
export function exposicaoPublicavel(d: ExposicaoDoCms): boolean {
  return !vazio(d.nome) && (d.fotos ?? []).some((f) => !vazio(f.src));
}

/** A `chave` vem do nome do arquivo, como o `slug` das peças. */
export function normalizarExposicao(chave: string, d: ExposicaoDoCms): Exposicao {
  const expo: Exposicao = {
    chave,
    nome: d.nome,
    local: d.local ?? "",
    descricao: (d.descricao ?? []).filter((t): t is string => !vazio(t)),
    fotos: (d.fotos ?? [])
      .filter((f): f is typeof f & { src: string } => !vazio(f.src))
      .map(normalizarFoto),
  };
  if (!vazio(d.ano)) expo.ano = d.ano;
  return expo;
}
