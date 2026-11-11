// GERADO por scripts/indexar-conteudo.mjs. Não edite à mão: a próxima
// execução apaga a mudança. Para entrar um item, ponha o JSON dele em
// content/exposicoes/ (o painel do Tina já faz isso) e rode `npm run indexar`.

import type { ExposicaoDoCms } from "../normalizar-exposicao";

import p0 from "../../../../content/exposicoes/bab.json";
import p1 from "../../../../content/exposicoes/casacor.json";
import p2 from "../../../../content/exposicoes/club-casa.json";
import p3 from "../../../../content/exposicoes/design-week.json";

export const arquivosDeExposicoes: { chave: string; dados: ExposicaoDoCms }[] = [
  { chave: "bab", dados: p0 as ExposicaoDoCms },
  { chave: "casacor", dados: p1 as ExposicaoDoCms },
  { chave: "club-casa", dados: p2 as ExposicaoDoCms },
  { chave: "design-week", dados: p3 as ExposicaoDoCms },
];
