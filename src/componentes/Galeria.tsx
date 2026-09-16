import { recorteDe } from "./Imagem";
import type { QuadroDeGaleria } from "@/tipos/conteudo";

// A galeria: um quadro por vez, as setas deslizam o trilho. Quem manda no
// comportamento é `efeitos/galeria.ts`, que acha este bloco pelos `data-`.
//
// O vídeo, quando existe, é sempre o último quadro. Quem garante isso é a ordem
// do array no conteúdo, não este componente.
export default function Galeria({
  quadros,
  className = "product__main-image",
}: {
  quadros: QuadroDeGaleria[];
  className?: string;
}) {
  return (
    <div className={className} data-slider>
      <div className="slider__track" data-slider-track>
        {quadros.map((quadro, i) =>
          quadro.tipo === "video" ? (
            <div className="slider__slide slider__slide--video" key={i}>
              <video
                src={quadro.src}
                poster={quadro.poster}
                muted
                loop
                playsInline
                preload="none"
                aria-label={quadro.descricao}
              />
            </div>
          ) : (
            <div className="slider__slide" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={quadro.src}
                alt={quadro.alt}
                style={recorteDe(quadro)}
                {...(quadro.zoom ? { "data-zoom": quadro.zoom } : {})}
              />
            </div>
          ),
        )}
      </div>
      <button
        className="gallery__arrow gallery__arrow--prev"
        type="button"
        data-slider-prev
        aria-label="Imagem anterior"
      >
        ‹
      </button>
      <button
        className="gallery__arrow gallery__arrow--next"
        type="button"
        data-slider-next
        aria-label="Próxima imagem"
      >
        ›
      </button>
    </div>
  );
}
