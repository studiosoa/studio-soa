import type { ReactNode } from "react";
import CabecalhoV2 from "./CabecalhoV2";
import RodapeV2 from "./RodapeV2";
import Lightbox from "../Lightbox";

// Mesmo invólucro do `Pagina.tsx`, com o cabeçalho e o rodapé da V2.
//
// `page--v2` existe para o CSS alcançar o que é só desta versão sem tocar nas
// páginas antigas, que continuam no ar para comparação.
//
// `page--sobreposto` entra só onde o topo é uma foto sangrando, hoje a home:
// ela puxa o miolo para cima para a foto passar por baixo do cabeçalho. Nas
// outras páginas nada é preciso, porque o cabeçalho ocupa lugar no fluxo e o
// conteúdo já nasce embaixo dele.
export default function PaginaV2({
  children,
  modificador,
  classeDoMiolo,
  comLightbox = false,
  cabecalhoSobreposto = false,
}: {
  children: ReactNode;
  modificador?: string;
  classeDoMiolo?: string;
  comLightbox?: boolean;
  cabecalhoSobreposto?: boolean;
}) {
  return (
    <div
      className={`page page--v2${
        cabecalhoSobreposto ? " page--sobreposto" : ""
      }${modificador ? ` ${modificador}` : ""}`}
    >
      <CabecalhoV2 sobreposto={cabecalhoSobreposto} />
      <main className={classeDoMiolo}>{children}</main>
      <RodapeV2 />
      {comLightbox ? <Lightbox /> : null}
    </div>
  );
}
