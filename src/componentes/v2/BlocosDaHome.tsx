"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Imagem from "../Imagem";
import { blocosDaHomeV2, fotosDoBlocoDePecas } from "@/conteudo/v2";
import type { Foto } from "@/tipos/conteudo";

// Os três blocos que fecham a home da V2, no lugar da faixa única do catálogo.
//
// A `FaixaCatalogo` continuou intocada de propósito: ela ainda fecha a página de
// Exposições, que é a única que a mantém depois da review. Mexer nela para
// atender a home quebraria a outra.
//
// O bloco "Peças" sorteia a foto a cada visita (pedido do Pedro em 23/09,
// depois de cansar da Mesa Onda fixa ali). O sorteio só pode acontecer depois
// que a página já montou no navegador: se `Math.random()` corresse durante a
// respostagem do servidor, o HTML enviado teria uma foto e o React, ao
// hidratar no navegador, sortearia outra, e as duas precisam bater ou o React
// acusa erro de hidratação. Por isso o componente nasce com a primeira foto
// da lista (igual nos dois lados) e só troca depois, num `useEffect`, que
// roda uma vez só no cliente.
export default function BlocosDaHome() {
  const [fotoPecas, setFotoPecas] = useState<Foto>(fotosDoBlocoDePecas[0]);

  useEffect(() => {
    const indice = Math.floor(Math.random() * fotosDoBlocoDePecas.length);
    setFotoPecas(fotosDoBlocoDePecas[indice]);
  }, []);

  return (
    <nav className="blocos-nav" aria-label="Seções do site">
      {blocosDaHomeV2.map((bloco) => (
        <Link className="blocos-nav__item" href={bloco.href} key={bloco.href}>
          <Imagem foto={bloco.rotulo === "Peças" ? fotoPecas : bloco.foto} />
          <span className="blocos-nav__rotulo">{bloco.rotulo}</span>
        </Link>
      ))}
    </nav>
  );
}
