// GERADO por scripts/indexar-conteudo.mjs. Não edite à mão: a próxima
// execução apaga a mudança. Para entrar uma peça, ponha o JSON dela em
// content/pecas/ (o painel do Tina já faz isso) e rode `npm run indexar`.

import type { PecaDoCms } from "../normalizar-peca";

import p0 from "../../../../content/pecas/adorno-balanco.json";
import p1 from "../../../../content/pecas/bandeja-elis.json";
import p2 from "../../../../content/pecas/banquinho-elis.json";
import p3 from "../../../../content/pecas/espelho-miudo-graudo.json";
import p4 from "../../../../content/pecas/mesa-onda.json";

export const arquivosDePecas: { slug: string; dados: PecaDoCms }[] = [
  { slug: "adorno-balanco", dados: p0 as PecaDoCms },
  { slug: "bandeja-elis", dados: p1 as PecaDoCms },
  { slug: "banquinho-elis", dados: p2 as PecaDoCms },
  { slug: "espelho-miudo-graudo", dados: p3 as PecaDoCms },
  { slug: "mesa-onda", dados: p4 as PecaDoCms },
];
