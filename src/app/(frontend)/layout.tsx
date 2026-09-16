import type { Metadata } from "next";
import type { ReactNode } from "react";

import Efeitos from "@/componentes/Efeitos";
import "@/estilos/style-v2.css";

// Este é o layout raiz do site público. Ele mora dentro do grupo `(frontend)`
// porque o Payload traz o layout raiz dele em `(payload)`, e o Next só aceita
// dois `<html>` diferentes quando cada um está no seu grupo de rota.
//
// O grupo não aparece na URL: `(frontend)/sobre/page.tsx` continua sendo
// `/sobre`.

export const metadata: Metadata = {
  title: {
    default: "Studio Sôa",
    template: "%s — Studio Sôa",
  },
  description:
    "Estúdio brasileiro de design autoral fundado em 2025 por Luiza Pessôa, em Vitória.",
};

export default function LayoutDoSite({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      {/* `suppressHydrationWarning` aqui não esconde defeito nosso: ele vale só
          um nível, para os atributos do próprio <body>, e não alcança nada
          dentro da página. Existe porque extensão de navegador escreve no
          <body> antes do React hidratar (a ColorZilla põe
          `cz-shortcut-listen`, gerenciador de senha e tema escuro põem os
          deles), e aí o servidor manda um <body> limpo que nunca bate com o
          que o React encontra. É a recomendação do próprio React para
          elemento que terceiros mexem antes da hidratação. */}
      <body suppressHydrationWarning>
        {children}
        <Efeitos />
      </body>
    </html>
  );
}
