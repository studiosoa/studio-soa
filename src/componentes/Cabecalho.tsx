import Link from "next/link";
import { site } from "@/conteudo/site";

// O cabeçalho é igual em toda página, com duas variações.
//
// `sobreposto` é a da home e da Sobre: lá o cabeçalho não ocupa espaço, ele
// flutua por cima da foto do topo, que começa colada no alto da janela. Sem
// essa classe a foto desce e nasce uma faixa creme onde não deveria haver.
//
// A outra é a de Exposições, onde o fundo é marrom e a logo vira branca. Essa o
// CSS resolve sozinho por `.page--exposicoes`, sem precisar de prop.
export default function Cabecalho({
  sobreposto = false,
}: {
  sobreposto?: boolean;
}) {
  return (
    <header
      className={`site-header${sobreposto ? " site-header--over" : ""}`}
    >
      <div className="site-header__brand wrap">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="site-header__logo"
            src="/assets/img/logo-horizontal.png"
            alt="Studio Sôa"
          />
        </Link>
      </div>
      <nav className="site-nav">
        <ul className="site-nav__list wrap">
          {site.menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.rotulo}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
