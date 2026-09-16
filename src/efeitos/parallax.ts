// Parallax dentro do recorte da foto: a moldura fica parada e a imagem desliza
// por dentro dela conforme a seção atravessa a tela.
//
// Anima `object-position` em vez de `transform`. Com transform seria preciso uma
// imagem maior que a moldura mais `overflow: hidden`, e sempre há risco de a
// borda aparecer. Aqui o recorte já é o mecanismo, então nada vaza.
//
// O valor é escrito a cada frame do scroll, sem transição de CSS, para a foto
// ficar colada na rolagem em vez de correr atrás dela.
//
// Uso: data-parallax="up" ou data-parallax="down" na <img>. Duas fotos lado a
// lado recebem direções opostas e deslizam uma contra a outra.

export function ligarParallax(): () => void {
  const menosMovimento =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const imgs = document.querySelectorAll<HTMLImageElement>("img[data-parallax]");
  if (!imgs.length || menosMovimento) return () => {};

  // Quantos pontos percentuais a foto anda para cada lado do enquadramento
  // original. 8 dá movimento perceptível sem descolar do recorte escolhido.
  const ALCANCE = 8;

  const itens: {
    el: HTMLImageElement;
    x: string;
    centro: number;
    dir: number;
  }[] = [];

  imgs.forEach((img) => {
    // O enquadramento já ajustado à mão vira o CENTRO da deriva: no meio da
    // tela a foto aparece exatamente como foi enquadrada, e o movimento
    // acontece em torno disso.
    const base = window.getComputedStyle(img).objectPosition.split(" ");
    const x = base[0] || "50%";
    let y = parseFloat(base[1]);
    if (isNaN(y)) y = 50;

    itens.push({
      el: img,
      x,
      centro: y,
      dir: img.getAttribute("data-parallax") === "down" ? -1 : 1,
    });
  });

  let agendado = false;

  const atualizar = () => {
    const vh = window.innerHeight;

    itens.forEach((item) => {
      const rect = item.el.getBoundingClientRect();

      // Fora da tela não precisa recalcular.
      if (rect.bottom < 0 || rect.top > vh) return;

      // 0 quando a foto entra por baixo, 1 quando sai por cima, 0,5 no meio.
      let progresso = (vh - rect.top) / (vh + rect.height);
      progresso = Math.min(Math.max(progresso, 0), 1);

      const y = item.centro + item.dir * ALCANCE * (1 - 2 * progresso);
      item.el.style.objectPosition = `${item.x} ${y.toFixed(2)}%`;
    });

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
  window.addEventListener("resize", atualizar, { passive: true });

  return () => {
    window.removeEventListener("scroll", aoRolar);
    window.removeEventListener("resize", atualizar);
  };
}
