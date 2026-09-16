import Link from "next/link";
import Imagem from "./Imagem";
import { faixaDoCatalogo } from "@/conteudo/paginas";

// A faixa que fecha as páginas. Página que termina sem próximo passo é beco sem
// saída, então a Sobre, as Exposições e a Onde encontrar terminam todas aqui.
//
// `semAnimacao` existe porque na Sobre o Pedro pediu que ela já estivesse lá ao
// sair da seção anterior, em vez de surgir.
export default function FaixaCatalogo({
  semAnimacao = false,
}: {
  semAnimacao?: boolean;
}) {
  return (
    <Link
      className={semAnimacao ? "faixa-catalogo" : "home-faixa"}
      href={faixaDoCatalogo.href}
      {...(semAnimacao ? {} : { "data-reveal": true })}
    >
      <Imagem foto={faixaDoCatalogo.foto} />
      <span className="photo-overlay">
        <span className="photo-overlay__name">{faixaDoCatalogo.rotulo}</span>
      </span>
    </Link>
  );
}
