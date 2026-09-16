"use client";

import { useEffect, useRef } from "react";
import { site } from "@/conteudo/site";
import "leaflet/dist/leaflet.css";

// Mapa da loja com Leaflet e telas do OpenStreetMap.
//
// A biblioteca agora vem do npm em vez da cópia em `assets/vendor/`: com um
// empacotador no meio, ela entra no pacote do site e continua sem depender de
// CDN, que era o motivo de ter sido baixada à mão. As telas, essas, seguem
// vindo do servidor do OSM, e não há como ser diferente sem hospedar azulejo.
//
// DUVIDAS #11: a loja não está cadastrada no OpenStreetMap, então o alfinete
// marca o trecho da Avenida Rio Branco no quarteirão do CEP. Cai no quarteirão
// certo, não na porta. O botão "Abrir no mapa" leva ao endereço exato.
export default function Mapa() {
  const tela = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tela.current) return;

    let mapa: import("leaflet").Map | null = null;
    let vivo = true;

    // Import dinâmico porque o Leaflet toca em `window` ao ser avaliado, e no
    // servidor não existe window.
    import("leaflet").then((L) => {
      if (!vivo || !tela.current) return;

      mapa = L.map(tela.current, {
        center: site.loja.coordenada,
        zoom: 17,
        // A roda do mouse rolaria o mapa em vez da página, que é a armadilha
        // clássica de mapa embutido. Só liga depois que a pessoa clica nele.
        scrollWheelZoom: false,
        // No celular, arrastar com um dedo tem que rolar a página, não passear
        // pelo mapa. Os botões de + e - continuam ali pra quem quiser explorar.
        dragging: !L.Browser.mobile,
        attributionControl: true,
      });

      mapa.on("click", () => {
        mapa?.scrollWheelZoom.enable();
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      }).addTo(mapa);

      // Alfinete desenhado em CSS, no marrom e no dourado do site: o padrão do
      // Leaflet é um pino azul que briga com tudo aqui.
      const alfinete = L.divIcon({
        className: "onde__alfinete",
        html: '<span class="onde__alfinete-halo"></span><span class="onde__alfinete-ponto"></span>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker(site.loja.coordenada, {
        icon: alfinete,
        keyboard: false,
        alt: site.loja.nome,
      }).addTo(mapa);

      // A caixa entra na tela com uma animação de translado. Recalcular o
      // tamanho depois que ela assenta evita o mapa achar que mede outra coisa.
      window.setTimeout(() => mapa?.invalidateSize(), 400);
    });

    return () => {
      vivo = false;
      mapa?.remove();
    };
  }, []);

  return (
    <div className="onde__mapa">
      <div
        className="onde__mapa-tela"
        ref={tela}
        role="img"
        aria-label="Mapa da Avenida Rio Branco, na Praia do Canto, em Vitória, com a loja marcada"
      />
    </div>
  );
}
