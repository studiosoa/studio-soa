import { site } from "@/conteudo/site";

export default function Rodape() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner wrap">
        <span className="site-footer__place">{site.rodape.lugar}</span>
        <ul className="site-footer__links">
          {site.rodape.links.map((link) => {
            const externo = link.href.startsWith("http");
            return (
              <li key={link.rotulo}>
                <a
                  href={link.href}
                  {...(externo
                    ? { target: "_blank", rel: "noopener" }
                    : link.href === "#"
                      ? { target: "_blank", rel: "noopener" }
                      : {})}
                >
                  <svg className="ico" aria-hidden="true">
                    <use href={`/assets/icons.svg#${link.icone}`} />
                  </svg>
                  <span>{link.rotulo}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
