// Troca de exposição: passar o mouse (ou tocar, ou dar foco pelo teclado) num
// nome da esquerda acende aquele nome e troca o painel da direita.
//
// A foto e o texto trocam em ritmos diferentes de propósito. A foto faz um
// esmaecer de uma sobre a outra, que é lento o bastante pra ler como troca de
// cena. O texto sai pela esquerda e o novo entra logo atrás, rápido, porque
// texto parado no meio da animação é o que dá sensação de travado.

export function ligarExposicoes(): () => void {
  const secao = document.querySelector<HTMLElement>("[data-expo-secao]");
  if (!secao) return () => {};

  const soltar: (() => void)[] = [];
  const relogios: number[] = [];
  const menosMovimento =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nomes = Array.from(secao.querySelectorAll<HTMLElement>("[data-expo]"));
  const quadros = Array.from(
    secao.querySelectorAll<HTMLElement>("[data-painel]"),
  );
  const textos = Array.from(secao.querySelectorAll<HTMLElement>("[data-texto]"));
  if (!nomes.length) return () => {};

  const SAIDA = 170; // ms até o texto antigo terminar de sair
  const ENTRADA = 220; // ms da entrada do novo

  const primeiro = secao.querySelector<HTMLElement>("[data-expo].is-ativo");
  let atual = primeiro
    ? primeiro.getAttribute("data-expo")
    : nomes[0].getAttribute("data-expo");

  // Cada pedido ganha um número. Se a pessoa varrer a lista com o mouse, só o
  // último chega ao fim: os anteriores morrem na conferência lá embaixo, em vez
  // de virarem uma fila de trocas que continua rodando depois do mouse parar.
  let pedido = 0;

  function porChave(
    lista: HTMLElement[],
    atributo: string,
    chave: string,
  ): HTMLElement | null {
    for (const el of lista) {
      if (el.getAttribute(atributo) === chave) return el;
    }
    return null;
  }

  function trocar(chave: string | null) {
    if (!chave || chave === atual) return;
    const meu = ++pedido;
    atual = chave;

    nomes.forEach((n) => {
      n.classList.toggle("is-ativo", n.getAttribute("data-expo") === chave);
    });

    quadros.forEach((q) => {
      q.classList.toggle("is-ativo", q.getAttribute("data-painel") === chave);
    });

    const entrando = porChave(textos, "data-texto", chave);
    if (!entrando) return;

    if (menosMovimento) {
      textos.forEach((t) => {
        t.classList.remove("esta-saindo", "esta-entrando");
        t.classList.toggle("is-ativo", t === entrando);
      });
      return;
    }

    const saindo = secao!.querySelector<HTMLElement>(".expo__texto.is-ativo");
    if (saindo && saindo !== entrando) saindo.classList.add("esta-saindo");

    relogios.push(
      window.setTimeout(() => {
        if (meu !== pedido) return;
        // Limpa todo mundo antes de montar o estado novo: assim uma troca
        // interrompida no meio não deixa classe velha pendurada em ninguém.
        textos.forEach((t) => {
          t.classList.remove("is-ativo", "esta-saindo", "esta-entrando");
        });
        entrando.classList.add("is-ativo", "esta-entrando");

        relogios.push(
          window.setTimeout(() => {
            if (meu !== pedido) return;
            entrando.classList.remove("esta-entrando");
          }, ENTRADA + 40),
        );
      }, SAIDA),
    );
  }

  nomes.forEach((n) => {
    const chave = n.getAttribute("data-expo");
    const acender = () => trocar(chave);
    n.addEventListener("mouseenter", acender);
    n.addEventListener("focus", acender);
    n.addEventListener("click", acender);
    soltar.push(() => {
      n.removeEventListener("mouseenter", acender);
      n.removeEventListener("focus", acender);
      n.removeEventListener("click", acender);
    });
  });

  return () => {
    soltar.forEach((f) => f());
    relogios.forEach((r) => window.clearTimeout(r));
  };
}
