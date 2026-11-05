import type { Metadata } from "next";

import NaoEncontrada from "@/componentes/v2/NaoEncontrada";
import "@/estilos/style-v2.css";
import "@/estilos/v2.css";

// A 404 para endereço que não existe em lugar nenhum, como `/xyz`.
//
// Por que um arquivo à parte: o layout raiz do site mora em `(frontend)`, e o
// Next não tem um layout único de onde montar a 404 de um endereço que não
// casa com rota nenhuma. O `global-not-found` é o que a documentação do Next
// indica para esse caso. Ele não passa pelo layout, então devolve o documento
// inteiro e importa o CSS por conta própria. Precisa da opção
// `experimental.globalNotFound` em `next.config.ts`.
export const metadata: Metadata = {
  title: "Página não encontrada — Studio Sôa",
  robots: { index: false },
};

export default function PaginaNaoEncontradaGlobal() {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <NaoEncontrada />
      </body>
    </html>
  );
}
