import Link from "next/link";

import PaginaV2 from "./PaginaV2";

// A página 404 do site. Existe em dois lugares, e os dois usam este arquivo para
// ficarem iguais:
//
// - `app/global-not-found.tsx`: endereço que não existe em lugar nenhum, como
//   `/xyz`. Antes caía na tela padrão do Next, sem cabeçalho e sem marca.
// - `app/(frontend)/not-found.tsx`: `notFound()` chamado numa página, como uma
//   peça que não existe.
//
// É preliminar de propósito: só texto e dois caminhos de volta. Se a Luiza
// quiser uma ilustração ou outro texto, é aqui.
export default function NaoEncontrada() {
  return (
    <PaginaV2 modificador="page--nao-encontrada">
      <section className="nao-encontrada wrap">
        <p className="nao-encontrada__numero" aria-hidden="true">
          404
        </p>
        <h1 className="nao-encontrada__titulo">Essa página não existe</h1>
        <p className="nao-encontrada__lead">
          O endereço pode ter mudado ou ter sido digitado errado. O caminho de
          volta está no menu, ou direto nas peças.
        </p>
        <div className="nao-encontrada__acoes">
          <Link className="btn btn--solid" href="/pecas">
            <span>Ver as peças</span>
            <span className="btn__arrow">→</span>
          </Link>
          <Link className="btn btn--outline" href="/">
            <span>Voltar ao início</span>
            <span className="btn__arrow">→</span>
          </Link>
        </div>
      </section>
    </PaginaV2>
  );
}
