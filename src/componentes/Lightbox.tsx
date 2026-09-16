// A cortina de tela cheia. Fica escondida até alguém clicar numa galeria, e é
// o `efeitos/galeria.ts` que a preenche e a mostra.
//
// Só precisa existir nas páginas que têm galeria: as das peças e as Exposições.
export default function Lightbox() {
  return (
    <div className="lightbox" data-lightbox hidden>
      <button
        className="lightbox__close"
        type="button"
        data-lightbox-close
        aria-label="Fechar imagem ampliada"
      >
        ×
      </button>
      <button
        className="lightbox__arrow lightbox__arrow--prev"
        type="button"
        data-lightbox-prev
        aria-label="Imagem anterior"
      >
        ‹
      </button>
      <div className="lightbox__viewport" data-lightbox-viewport>
        {/* Sem `src` até alguém abrir a cortina, e não `src=""` como no site
            estático: string vazia faz o navegador pedir a própria página de
            novo. Quem preenche é o `efeitos/galeria.ts`, na abertura. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lightbox__img" data-lightbox-img alt="" />
        <video
          className="lightbox__video"
          data-lightbox-video
          muted
          loop
          playsInline
          hidden
        />
      </div>
      <button
        className="lightbox__arrow lightbox__arrow--next"
        type="button"
        data-lightbox-next
        aria-label="Próxima imagem"
      >
        ›
      </button>
    </div>
  );
}
