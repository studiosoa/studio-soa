import type { Metadata } from "next";

import NaoEncontrada from "@/componentes/v2/NaoEncontrada";

// `notFound()` chamado dentro do site, como uma peça que não existe. O
// endereço que não existe em lugar nenhum cai em `app/global-not-found.tsx`.
export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NaoEncontradaDoSite() {
  return <NaoEncontrada />;
}
