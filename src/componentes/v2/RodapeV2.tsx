import { rodapeV2, MENSAGEM_PADRAO } from "@/conteudo/v2";
import { linkDeWhatsapp } from "@/conteudo/site";

// Rodapé da V2, com as três mudanças da review de 20/09:
// "Brasil" no lugar de "Vitória ES", o WhatsApp entrando ao lado das redes, e
// os ícones perdendo o texto ao lado.
//
// Tirar o texto não é tirar a informação: o nome sai do desenho e vira
// `aria-label`, então quem enxerga vê só o símbolo e quem usa leitor de tela
// continua ouvindo "Instagram". Ícone sem nome nenhum é um link que se anuncia
// como "link", e aí a pessoa precisa clicar para descobrir onde vai dar.
//
// O crédito "site desenvolvido por" não está aqui porque o texto e o link ainda
// não vieram do Pedro. É a cláusula 5.5 do contrato, facultativa e agora
// combinada. Ver o relatório.
export default function RodapeV2() {
  return (
    <footer className="site-footer site-footer--v2">
      <div className="site-footer__inner wrap">
        <span className="site-footer__place">{rodapeV2.lugar}</span>

        <ul className="site-footer__links site-footer__links--icones">
          {rodapeV2.links.map((link) => {
            const href =
              link.href === "whatsapp"
                ? linkDeWhatsapp(MENSAGEM_PADRAO)
                : link.href;
            const externo = href.startsWith("http");

            return (
              <li key={link.rotulo}>
                <a
                  href={href}
                  aria-label={link.rotulo}
                  {...(externo ? { target: "_blank", rel: "noopener" } : {})}
                >
                  <svg className="ico" aria-hidden="true">
                    <use href={`/assets/icons.svg#${link.icone}`} />
                  </svg>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
