// Zoom do acabamento: clique num quadradinho e ele cresce em cima de si mesmo,
// com a página escurecida e desfocada atrás. Ele NÃO vai para o centro da tela.
//
// Quase tudo mora no CSS. Este arquivo só liga e desliga as classes, e cuida de
// duas coisas que o CSS não resolve: criar a cortina como filha do <body> (de
// dentro do bloco ela se ancoraria no elemento transformado em vez da tela) e
// empurrar o disco para dentro da janela quando ele cresce perto da borda.

export function ligarAcabamentos(): () => void {
  const quadradinhos = document.querySelectorAll<HTMLElement>(".swatch");
  if (!quadradinhos.length) return () => {};

  const ESCALA = 4;
  const MARGEM = 20; // respiro mínimo até a borda da janela
  let cortina: HTMLElement | null = null;
  let aberto: HTMLElement | null = null;
  let rolagemAoAbrir = 0;

  // Uma cortina só, criada na primeira vez e reaproveitada. Criar e destruir a
  // cada clique empilhava duas enquanto a antiga ainda estava sumindo, e o
  // escurecimento dobrava por um instante.
  function garantirCortina(): HTMLElement {
    if (cortina) return cortina;
    cortina = document.createElement("div");
    cortina.className = "swatch-curtain";
    cortina.addEventListener("click", fechar);
    document.body.appendChild(cortina);
    cortina.getBoundingClientRect(); // força um quadro, senão a transição não roda
    return cortina;
  }

  // O disco cresce a partir do próprio centro. Se o resultado passar da borda
  // da janela, devolve o quanto ele precisa andar para caber, assim ele
  // continua crescendo onde está, só não fica cortado.
  function correcao(disco: HTMLElement) {
    const r = disco.getBoundingClientRect();
    const meia = (r.width * ESCALA - r.width) / 2;
    const esq = r.left - meia;
    const dir = r.right + meia;
    const topo = r.top - meia;
    const base = r.bottom + meia;

    let x = 0;
    let y = 0;
    if (esq < MARGEM) x = MARGEM - esq;
    else if (dir > window.innerWidth - MARGEM)
      x = window.innerWidth - MARGEM - dir;
    if (topo < MARGEM) y = MARGEM - topo;
    else if (base > window.innerHeight - MARGEM)
      y = window.innerHeight - MARGEM - base;

    return { x, y };
  }

  function fechar() {
    if (!aberto) return;
    const bloco = aberto.closest(".finish-block");
    const disco = aberto.querySelector<HTMLElement>(".swatch__color");
    aberto.classList.remove("is-zoomed");
    aberto.setAttribute("aria-expanded", "false");
    if (disco) disco.style.transform = "";
    if (bloco) bloco.classList.remove("is-zooming");
    aberto = null;
    if (cortina) cortina.classList.remove("is-visible");
  }

  function abrir(quadradinho: HTMLElement) {
    const bloco = quadradinho.closest(".finish-block");
    const disco = quadradinho.querySelector<HTMLElement>(".swatch__color");
    if (!bloco || !disco) return;

    garantirCortina().classList.add("is-visible");
    bloco.classList.add("is-zooming");
    quadradinho.classList.add("is-zoomed");
    quadradinho.setAttribute("aria-expanded", "true");
    aberto = quadradinho;
    rolagemAoAbrir = window.scrollY;

    const d = correcao(disco);
    disco.style.transform = `translate(${d.x}px, ${d.y}px) scale(${ESCALA})`;
  }

  const soltar: (() => void)[] = [];

  quadradinhos.forEach((quadradinho) => {
    quadradinho.setAttribute("aria-expanded", "false");
    const aoClicar = (e: Event) => {
      e.stopPropagation();
      const estavaAberto = aberto === quadradinho;
      fechar();
      if (!estavaAberto) abrir(quadradinho);
    };
    quadradinho.addEventListener("click", aoClicar);
    soltar.push(() => quadradinho.removeEventListener("click", aoClicar));
  });

  const aoTeclar = (e: KeyboardEvent) => {
    if (e.key === "Escape") fechar();
  };
  document.addEventListener("keydown", aoTeclar);

  // Rolar fecha, porque o disco ampliado tem a posição calculada uma vez só e
  // ficaria deslocado. A folga de 4px evita fechamento sozinho: dar foco a um
  // botão pode gerar um pulinho de rolagem no próprio clique.
  const aoRolar = () => {
    if (!aberto) return;
    if (Math.abs(window.scrollY - rolagemAoAbrir) > 4) fechar();
  };
  window.addEventListener("scroll", aoRolar, { passive: true });
  window.addEventListener("resize", fechar, { passive: true });

  return () => {
    soltar.forEach((f) => f());
    document.removeEventListener("keydown", aoTeclar);
    window.removeEventListener("scroll", aoRolar);
    window.removeEventListener("resize", fechar);
    fechar();
    if (cortina && cortina.parentNode) cortina.parentNode.removeChild(cortina);
    cortina = null;
  };
}
