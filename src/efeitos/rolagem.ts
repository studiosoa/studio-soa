// Animações de rolagem: zoom + dissolver no topo da página, surgimento em
// movimento dos blocos marcados, e entrada lateral amarrada ao scroll.
//
// A lógica é a mesma do site estático, calibrada medindo tela real. O que mudou
// foi só o invólucro: em vez de um IIFE que roda no load, é uma função que o
// React chama depois de montar e desfaz quando a rota troca.

export function ligarRolagem(): () => void {
  const desfazer: (() => void)[] = [];
  const menosMovimento =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // O topo da home e o da Sobre usam o mesmo efeito do topo das peças: a foto
  // cresce de leve conforme a página desce, presa à rolagem.
  const topo = document.querySelector<HTMLElement>(
    ".hero, .sobre-hero, .home-hero",
  );
  const topoImg = topo
    ? topo.querySelector<HTMLElement>(
        ".hero__img, .sobre-hero__img, .home-hero__img",
      )
    : null;

  if (topo && topoImg) {
    if (menosMovimento) {
      topo.classList.add("is-revealed");
    } else {
      const LIMIAR = 48;
      let agendado = false;

      const atualizar = () => {
        const y = window.scrollY || window.pageYOffset;
        const distancia = topo.offsetHeight || 600;
        const progresso = Math.min(Math.max(y / distancia, 0), 1);
        topoImg.style.transform = `scale(${1 + progresso * 0.12})`;
        topo.classList.toggle("is-revealed", y > LIMIAR);
        agendado = false;
      };

      const aoRolar = () => {
        if (!agendado) {
          window.requestAnimationFrame(atualizar);
          agendado = true;
        }
      };

      atualizar();
      window.addEventListener("scroll", aoRolar, { passive: true });
      desfazer.push(() => {
        window.removeEventListener("scroll", aoRolar);
        topoImg.style.transform = "";
      });
    }
  }

  const reveladores =
    document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (reveladores.length) {
    if (menosMovimento || !("IntersectionObserver" in window)) {
      reveladores.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              entrada.target.classList.add("is-visible");
              observador.unobserve(entrada.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "-25% 0px -25% 0px" },
      );

      // Elemento que já está na tela ao carregar a página não tem rolagem
      // nenhuma pra "revelar". A faixa de -25%/-25% existe pra dar uma folga
      // antes do gatilho em conteúdo mais abaixo, mas um título colado perto
      // do topo pode nascer acima dela, e rolar pra baixo só afasta o
      // elemento da faixa, nunca aproxima: ele fica preso em opacidade zero
      // pra sempre. Bug real de 23/09, achado num título de celular que
      // sumiu depois do cabeçalho móvel ter ficado mais baixo (121px para
      // 78px) e empurrado o conteúdo pra cima o bastante pra cair fora da
      // faixa já no primeiro quadro.
      reveladores.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("is-visible");
        } else {
          observador.observe(el);
        }
      });
      desfazer.push(() => observador.disconnect());
    }
  }

  // Entrada lateral amarrada à rolagem: a posição da foto é função de quanto a
  // pessoa já rolou, recalculada a cada quadro. Não é um gatilho que toca a
  // animação inteira de uma vez, esse jeito faz as três aparecerem juntas e
  // fica estranho.
  //
  // Sem transição de CSS de propósito: o movimento tem que ficar colado no
  // scroll, e uma transição faria a foto correr atrás do dedo.
  //
  // Quem se move é a foto, não o invólucro. O invólucro fica parado segurando o
  // lugar no layout, porque ele é a referência de posição para a conta.
  const deslizantes =
    document.querySelectorAll<HTMLElement>("[data-desliza]");
  if (deslizantes.length && !menosMovimento) {
    const itens: { caixa: HTMLElement; foto: HTMLElement; sinal: number }[] = [];

    deslizantes.forEach((el) => {
      const foto = el.firstElementChild as HTMLElement | null;
      if (!foto) return;
      el.classList.add("is-ativo");
      itens.push({
        caixa: el,
        foto,
        sinal: el.getAttribute("data-desliza") === "direita" ? 1 : -1,
      });
    });

    const DESLOCAMENTO = 120; // em % da largura da foto, o mesmo do CSS

    const mover = () => {
      const vh = window.innerHeight;
      itens.forEach((item) => {
        const r = item.caixa.getBoundingClientRect();
        // fora da tela com folga: não gasta conta
        if (r.bottom < -300 || r.top > vh + 300) return;

        // 0 quando o topo do quadro entra por baixo, 1 quando ele chega a 30%
        // da altura da tela. Nesse intervalo a foto percorre todo o caminho.
        const bruto = (vh - r.top) / (vh * 0.7);
        const p = Math.min(Math.max(bruto, 0), 1);
        // desacelera na chegada, para não bater seco no lugar
        const suave = 1 - Math.pow(1 - p, 3);

        item.foto.style.transform = `translateX(${(
          item.sinal *
          DESLOCAMENTO *
          (1 - suave)
        ).toFixed(2)}%)`;
      });
    };

    let pendente = false;
    const aoRolar = () => {
      if (!pendente) {
        window.requestAnimationFrame(() => {
          mover();
          pendente = false;
        });
        pendente = true;
      }
    };

    mover();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });
    desfazer.push(() => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    });
  }

  return () => desfazer.forEach((f) => f());
}
