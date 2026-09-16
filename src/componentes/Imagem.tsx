import type { CSSProperties } from "react";
import type { Foto } from "@/tipos/conteudo";

// Por que `<img>` e não `next/image`.
//
// O CSS deste site foi calibrado medindo tela real: cada foto tem um
// `object-position` escolhido a olho, e várias seções dependem de a imagem ser
// filha direta do bloco (`.hero > img`, `.looping > img`, `.slider__slide > img`).
// O `next/image` embrulha a imagem num <span> e escreve `position` e `inset`
// por conta própria, o que quebraria esse ajuste fino em silêncio.
//
// Quando o Payload assumir a mídia, ele já entrega as fotos redimensionadas, que
// é a parte do `next/image` que faria falta aqui.

/** Converte o recorte do conteúdo no estilo que o CSS espera. */
export function recorteDe(foto: Pick<Foto, "recorte">): CSSProperties | undefined {
  return foto.recorte ? { objectPosition: foto.recorte } : undefined;
}

interface Props {
  foto: Foto;
  className?: string;
  /** Marca a foto para o parallax de rolagem: "up" ou "down". */
  parallax?: "up" | "down";
  ariaHidden?: boolean;
}

export default function Imagem({ foto, className, parallax, ariaHidden }: Props) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      className={className}
      src={foto.src}
      alt={foto.alt}
      style={recorteDe(foto)}
      {...(parallax ? { "data-parallax": parallax } : {})}
      {...(foto.zoom ? { "data-zoom": foto.zoom } : {})}
      {...(ariaHidden ? { "aria-hidden": true } : {})}
    />
  );
}
