// Galeria da peça: um quadro fixo por vez, as setas deslizam para o seguinte ou
// anterior, sem miniaturas. O quadro pode ser foto ou vídeo, e os dois abrem em
// tela cheia do mesmo jeito. Três estágios de clique: 1) abre em tela cheia;
// 2) clique no que está aberto liga a lupa, que passa a seguir o mouse;
// 3) clique de novo desliga a lupa.

interface Quadro {
  video: HTMLVideoElement | null;
  videoSrc: string | null;
  poster: string | null;
  src: string | null;
  alt: string;
}

export function ligarGaleria(): () => void {
  const soltar: (() => void)[] = [];
  const menosMovimento =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cortina = document.querySelector<HTMLElement>("[data-lightbox]");
  const palco = cortina
    ? cortina.querySelector<HTMLElement>("[data-lightbox-viewport]")
    : null;
  const foto = cortina
    ? cortina.querySelector<HTMLImageElement>("[data-lightbox-img]")
    : null;
  const filme = cortina
    ? cortina.querySelector<HTMLVideoElement>("[data-lightbox-video]")
    : null;
  const fechar = cortina
    ? cortina.querySelector<HTMLElement>("[data-lightbox-close]")
    : null;
  const anterior = cortina
    ? cortina.querySelector<HTMLElement>("[data-lightbox-prev]")
    : null;
  const proxima = cortina
    ? cortina.querySelector<HTMLElement>("[data-lightbox-next]")
    : null;

  let quadrosAtivos: Quadro[] | null = null;
  let indiceAtivo = 0;
  let avisarCarrossel: ((i: number) => void) | null = null;

  // Qual dos dois está em cena: é nele que a lupa age.
  function alvoAtual(): HTMLElement {
    if (filme && !filme.hidden) return filme;
    return foto as HTMLElement;
  }

  function abrirCortina(
    quadros: Quadro[],
    indice: number,
    aoTrocar: (i: number) => void,
  ) {
    if (!cortina || !foto) return;
    quadrosAtivos = quadros;
    indiceAtivo = indice;
    avisarCarrossel = aoTrocar;
    // Nada continua tocando atrás da cortina.
    document
      .querySelectorAll<HTMLVideoElement>("[data-slider-track] video")
      .forEach((v) => v.pause());
    desenharCortina();
    cortina.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function fecharCortina() {
    if (!cortina || !foto) return;
    cortina.hidden = true;
    foto.classList.remove("is-zooming");
    if (filme) {
      filme.pause();
      filme.classList.remove("is-zooming");
    }
    document.body.style.overflow = "";
    const voltar = avisarCarrossel;
    const ondeParou = indiceAtivo;
    quadrosAtivos = null;
    avisarCarrossel = null;
    // Devolve o comando pro carrossel, que retoma o vídeo se ele for o quadro
    // em que a pessoa parou.
    if (voltar) voltar(ondeParou);
  }

  function desenharCortina() {
    if (!quadrosAtivos || !foto) return;
    const quadro = quadrosAtivos[indiceAtivo];
    foto.classList.remove("is-zooming");
    if (filme) filme.classList.remove("is-zooming");

    if (quadro.videoSrc && filme) {
      foto.hidden = true;
      filme.hidden = false;
      if (filme.getAttribute("src") !== quadro.videoSrc) {
        filme.setAttribute("src", quadro.videoSrc);
      }
      if (quadro.poster) filme.setAttribute("poster", quadro.poster);
      if (menosMovimento) {
        filme.controls = true;
      } else {
        const tocando = filme.play();
        if (tocando && tocando.catch) tocando.catch(() => {});
      }
    } else {
      if (filme) {
        filme.pause();
        filme.hidden = true;
      }
      foto.hidden = false;
      if (quadro.src) foto.src = quadro.src;
      foto.alt = quadro.alt;
    }

    if (avisarCarrossel) avisarCarrossel(indiceAtivo);
  }

  function andarCortina(passo: number) {
    if (!quadrosAtivos) return;
    indiceAtivo =
      (indiceAtivo + passo + quadrosAtivos.length) % quadrosAtivos.length;
    desenharCortina();
  }

  function ouvir(
    alvo: EventTarget | null,
    evento: string,
    mao: EventListenerOrEventListenerObject,
    opcoes?: AddEventListenerOptions,
  ) {
    if (!alvo) return;
    alvo.addEventListener(evento, mao, opcoes);
    soltar.push(() => alvo.removeEventListener(evento, mao, opcoes));
  }

  ouvir(fechar, "click", fecharCortina);
  ouvir(anterior, "click", () => andarCortina(-1));
  ouvir(proxima, "click", () => andarCortina(1));
  ouvir(cortina, "click", (evento) => {
    if (evento.target === cortina) fecharCortina();
  });

  function moverLupa(evento: MouseEvent) {
    const alvo = alvoAtual();
    const rect = alvo.getBoundingClientRect();
    let x = ((evento.clientX - rect.left) / rect.width) * 100;
    let y = ((evento.clientY - rect.top) / rect.height) * 100;
    x = Math.min(100, Math.max(0, x));
    y = Math.min(100, Math.max(0, y));
    alvo.style.transformOrigin = `${x}% ${y}%`;
  }

  if (palco && foto) {
    ouvir(palco, "click", (evento) => {
      evento.stopPropagation();
      const alvo = alvoAtual();
      if (alvo.classList.contains("is-zooming")) {
        alvo.classList.remove("is-zooming");
      } else {
        moverLupa(evento as MouseEvent);
        alvo.classList.add("is-zooming");
      }
    });

    ouvir(palco, "mousemove", (evento) => {
      if (alvoAtual().classList.contains("is-zooming")) {
        moverLupa(evento as MouseEvent);
      }
    });
  }

  ouvir(document, "keydown", (evento) => {
    if (!cortina || cortina.hidden) return;
    const tecla = (evento as KeyboardEvent).key;
    if (tecla === "Escape") fecharCortina();
    if (tecla === "ArrowRight") andarCortina(1);
    if (tecla === "ArrowLeft") andarCortina(-1);
  });

  // O vídeo é sempre o último quadro. Toca sozinho, mudo e em loop, só quando é
  // o quadro visível, e para quando sai de vista: sem isso, três peças abertas
  // em abas deixariam três vídeos rodando à toa.
  function montarCarrossel(raiz: HTMLElement) {
    const trilho = raiz.querySelector<HTMLElement>("[data-slider-track]");
    const quadroEls = trilho
      ? (Array.prototype.slice.call(trilho.children) as HTMLElement[])
      : [];
    const btnAnterior = raiz.querySelector("[data-slider-prev]");
    const btnProxima = raiz.querySelector("[data-slider-next]");

    if (!trilho || quadroEls.length === 0) return;

    // `data-zoom` é a foto inteira, sem o corte que o quadro da página impõe.
    // Quando existe, é ela que abre em tela cheia: o recorte serve à
    // diagramação, e ampliar é justamente o momento de ver a foto como ela foi
    // tirada.
    const quadros: Quadro[] = quadroEls.map((el) => {
      const video = el.querySelector("video");
      const img = el.querySelector("img");
      return {
        video,
        videoSrc: video ? video.getAttribute("src") : null,
        poster: video ? video.getAttribute("poster") : null,
        src: img ? img.getAttribute("data-zoom") || img.getAttribute("src") : null,
        alt: img
          ? img.getAttribute("alt") || ""
          : video
            ? video.getAttribute("aria-label") || ""
            : "",
      };
    });

    // Quem pediu menos movimento no sistema não recebe vídeo tocando sozinho:
    // ganha os controles e decide se quer ver.
    if (menosMovimento) {
      quadros.forEach((q) => {
        if (q.video) q.video.controls = true;
      });
    }

    let indice = 0;

    function desenhar() {
      trilho!.style.transform = `translateX(-${indice * 100}%)`;
      const cortinaAberta = cortina && !cortina.hidden;
      quadros.forEach((quadro, i) => {
        if (!quadro.video) return;
        if (i === indice && !menosMovimento && !cortinaAberta) {
          const tocando = quadro.video.play();
          // Navegador pode recusar o autoplay; recusa não é erro que interesse.
          if (tocando && tocando.catch) tocando.catch(() => {});
        } else {
          quadro.video.pause();
        }
      });
    }

    function andar(passo: number) {
      indice = (indice + passo + quadros.length) % quadros.length;
      desenhar();
    }

    ouvir(btnProxima, "click", () => andar(1));
    ouvir(btnAnterior, "click", () => andar(-1));
    ouvir(trilho, "click", () => {
      abrirCortina(quadros, indice, (novoIndice) => {
        indice = novoIndice;
        desenhar();
      });
    });

    desenhar();
    soltar.push(() => {
      quadros.forEach((q) => {
        if (q.video) q.video.pause();
      });
    });
  }

  document
    .querySelectorAll<HTMLElement>("[data-slider]")
    .forEach(montarCarrossel);

  return () => {
    soltar.forEach((f) => f());
    document.body.style.overflow = "";
    if (cortina) cortina.hidden = true;
  };
}
