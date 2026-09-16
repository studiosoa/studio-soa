import type { ReactNode } from "react";
import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
import Lightbox from "./Lightbox";

// O invólucro de toda página: a div `.page`, o cabeçalho, o miolo e o rodapé.
//
// O modificador existe porque duas páginas mudam a pele inteira a partir dele:
// `page--exposicoes` pinta tudo de marrom e inverte a logo, `page--onde` ajusta
// a diagramação do mapa. É o mesmo gancho do site estático.
export default function Pagina({
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
    <div className={`page${modificador ? ` ${modificador}` : ""}`}>
      <Cabecalho sobreposto={cabecalhoSobreposto} />
      <main className={classeDoMiolo}>{children}</main>
      <Rodape />
      {comLightbox ? <Lightbox /> : null}
    </div>
  );
}
