"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { menuV2 } from "@/conteudo/v2";

// Cabeçalho da V2.
//
// O desenho é o mesmo de sempre: a logo centralizada em cima, a barra de menu
// embaixo, as duas linhas finas separando.
//
// O que muda em relação ao antigo:
//
// 1. Os itens do menu, com Exposições antes de Onde encontrar e o botão
//    "Arquivos 3D" levando ao Drive.
// 2. Só a BARRA gruda no topo. A fileira da logo rola junto com a página e sai
//    de vista; a barra para quando encosta no alto e fica. Quem faz isso é o
//    `position: sticky` com `top` negativo no CSS: o cabeçalho inteiro sobe até
//    a altura da logo e trava ali, deixando só a barra à mostra.
// 3. O fundo é vidro: translúcido, com desfoque por trás, para a pessoa ver que
//    existe conteúdo passando embaixo sem conseguir ler.
// 4. O item da seção em que a pessoa está fica em negrito o tempo todo, não só
//    no hover, pedido do Pedro em 23/09: sem isso, é fácil se perder dentro de
//    uma seção com várias páginas (uma peça específica, por exemplo) sem
//    nenhuma pista de onde se está no menu.
// 5. Em celular, o menu deixou de ser a barra que rola de lado (pedido do
//    Pedro em 23/09, depois de ver a barra cortando "Onde encontrar" na
//    borda da tela). A barra some, entra um sanduíche à esquerda da logo, na
//    mesma fileira dela, e ele abre uma gaveta pela esquerda com o mesmo
//    menu na vertical. Acima de 1000px o sanduíche some e a barra de sempre
//    volta; quem decide isso é o CSS (`v2.css`), não este componente.
//
// Precisa de `usePathname`, por isso este componente é client. O resto do site
// continua renderizado no servidor; só o cabeçalho reidrata.
export default function CabecalhoV2({
  sobreposto = false,
}: {
  sobreposto?: boolean;
}) {
  const caminho = usePathname();
  const [gavetaAberta, setGavetaAberta] = useState(false);

  // Fecha a gaveta sempre que a rota muda, senão um clique num link dela
  // deixa a próxima página já com o menu aberto por cima.
  useEffect(() => {
    setGavetaAberta(false);
  }, [caminho]);

  // Esc fecha, e a rolagem da página trava enquanto a gaveta está aberta,
  // senão dá para arrastar o conteúdo por trás dela no toque.
  useEffect(() => {
    if (!gavetaAberta) return;

    const aoTeclar = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setGavetaAberta(false);
    };
    document.addEventListener("keydown", aoTeclar);

    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = overflowOriginal;
    };
  }, [gavetaAberta]);

  const itens = menuV2.map((item) => {
    // `data-texto` carrega o mesmo rótulo para o CSS desenhar uma cópia
    // invisível em negrito por baixo. É ela que reserva a largura, para
    // o item engordar no hover sem empurrar os vizinhos de lado. Ver
    // `.site-nav__list a` no v2.css.
    const conteudo = <span>{item.rotulo}</span>;

    // Item externo (Arquivos 3D) nunca fica "ativo": ele leva pra fora
    // do site, não existe página dele pra comparar com o caminho atual.
    // Os outros comparam com prefixo, não igualdade exata, porque
    // "Peças" precisa continuar marcado dentro de /v2/pecas/mesa-onda.
    const ativo =
      !item.externo &&
      (caminho === item.href || caminho?.startsWith(`${item.href}/`));

    const classe = [item.botao ? "site-nav__botao" : "", ativo ? "is-ativo" : ""]
      .filter(Boolean)
      .join(" ") || undefined;

    return { item, conteudo, ativo, classe };
  });

  return (
    <>
    <header
      className={`site-header site-header--fixo${
        sobreposto ? " site-header--over" : ""
      }`}
    >
      <div className="site-header__brand wrap">
        {/* Em celular o sanduíche mora na mesma fileira da logo, à esquerda
            dela (pedido do Pedro em 23/09, depois de ver o botão numa
            fileira própria embaixo, centralizado: "ficou feio"). Uma
            terceira célula vazia do lado direito equilibra o peso do botão,
            para a logo continuar óptica no centro da fileira. Em telas
            largas o CSS esconde o botão e a fileira volta a ser só a logo,
            que é quando esta terceira célula deixa de existir. */}
        <button
          type="button"
          className="site-header__sanduiche"
          aria-expanded={gavetaAberta}
          aria-controls="menu-gaveta-v2"
          aria-label={gavetaAberta ? "Fechar menu" : "Abrir menu"}
          onClick={() => setGavetaAberta((aberta) => !aberta)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <Link href="/v2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="site-header__logo"
            src="/assets/img/logo-horizontal.png"
            alt="Studio Sôa"
          />
        </Link>
      </div>

      <nav className="site-nav" aria-label="Principal">
        <ul className="site-nav__list wrap">
          {itens.map(({ item, conteudo, ativo, classe }) => (
            <li key={item.href}>
              {item.externo ? (
                <a
                  className={classe}
                  data-texto={item.rotulo}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                >
                  {conteudo}
                </a>
              ) : (
                <Link
                  className={classe}
                  data-texto={item.rotulo}
                  href={item.href}
                  aria-current={ativo ? "page" : undefined}
                >
                  {conteudo}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>

    {/* Fora do <header>: ele tem `backdrop-filter` para o efeito de vidro, e
        isso vira "containing block" para filhos `position: fixed` no Chrome,
        o mesmo jeito que `transform` faz. A gaveta encolhia para caber dentro
        da caixa do cabeçalho em vez de cobrir a tela inteira até este ajuste. */}
    <div
      className={`menu-gaveta${gavetaAberta ? " menu-gaveta--aberta" : ""}`}
      aria-hidden={!gavetaAberta}
      onClick={() => setGavetaAberta(false)}
    >
      <nav
        id="menu-gaveta-v2"
        className="menu-gaveta__painel"
        aria-label="Principal"
        onClick={(ev) => ev.stopPropagation()}
      >
        <ul className="menu-gaveta__list">
          {itens.map(({ item, ativo, classe }) => (
            <li key={item.href}>
              {item.externo ? (
                <a
                  className={classe}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                >
                  {item.rotulo}
                </a>
              ) : (
                <Link
                  className={classe}
                  href={item.href}
                  aria-current={ativo ? "page" : undefined}
                >
                  {item.rotulo}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </>
  );
}
