import Link from "next/link";

// O cartão de seta que aparece no fim do catálogo e no rodapé das peças.
// Às vezes tem foto de fundo, às vezes é só o creme com o texto.
export default function CartaoChamada({
  href,
  texto,
  fundo,
  className = "",
  reveal = false,
}: {
  href: string;
  texto: string;
  fundo?: string;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <Link
      className={`${className} cta-card`.trim()}
      href={href}
      {...(reveal ? { "data-reveal": true } : {})}
    >
      {fundo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="cta-card__bg" src={fundo} alt="" aria-hidden="true" />
      ) : null}
      <p className="cta-card__text">{texto}</p>
      <span className="cta-card__arrow">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="34"
            height="34"
            rx="17"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M14.849 12.4206L20.8576 17.5709L14.849 23.5795"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
