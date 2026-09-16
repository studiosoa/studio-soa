"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { ligarRolagem } from "@/efeitos/rolagem";
import { ligarParallax } from "@/efeitos/parallax";
import { ligarAcabamentos } from "@/efeitos/acabamentos";
import { ligarGaleria } from "@/efeitos/galeria";
import { ligarExposicoes } from "@/efeitos/exposicoes";

// Liga os efeitos da página depois que ela monta, e desliga quando a rota troca.
//
// No site estático cada script rodava uma vez, no carregamento, porque cada
// clique no menu era um carregamento novo. No Next a navegação troca o DOM sem
// recarregar, então quem não desliga deixa ouvinte apontando para elemento que
// não existe mais. Daí cada efeito devolver a própria limpeza.
//
// A lista é a mesma para todas as páginas de propósito: cada efeito começa
// procurando o que precisa e sai calado se não achar. Sai mais barato que
// manter uma tabela de qual página usa qual.
export default function Efeitos() {
  const rota = usePathname();

  useEffect(() => {
    const desligar = [
      ligarRolagem(),
      ligarParallax(),
      ligarAcabamentos(),
      ligarGaleria(),
      ligarExposicoes(),
    ];
    return () => desligar.forEach((f) => f());
  }, [rota]);

  return null;
}
