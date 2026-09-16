import Link from "next/link";
import Pagina from "@/componentes/Pagina";

export default function NaoEncontrada() {
  return (
    <Pagina>
      <section className="description">
        <div className="description__inner wrap">
          <h1>Essa página não existe</h1>
          <p>
            O endereço pode ter mudado. O caminho de volta está no menu, ou{" "}
            <Link href="/pecas">direto no catálogo</Link>.
          </p>
        </div>
      </section>
    </Pagina>
  );
}
