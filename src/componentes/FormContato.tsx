"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/conteudo/site";

// Formulário de contato. O envio monta um e-mail já preenchido e entrega ao
// programa de e-mail da pessoa. Some o passo de copiar endereço e escrever do
// zero, que é o atrito real, mas exige que ela tenha um cliente configurado.
//
// DUVIDAS #5: com o Next existe servidor, então dá para trocar isto por um
// Server Action que envia de verdade, sem sair do site. Fica para quando o
// Pedro decidir o serviço de envio.
export default function FormContato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const assunto = "Dúvida pelo site" + (nome ? `, de ${nome}` : "");
    const corpo = `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`;

    window.location.href =
      `mailto:${site.contato.email}` +
      `?subject=${encodeURIComponent(assunto)}` +
      `&body=${encodeURIComponent(corpo)}`;
  }

  return (
    <form className="form" onSubmit={enviar}>
      <div className="form__campo">
        <label className="form__rotulo" htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="Como você se chama"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="form__campo">
        <label className="form__rotulo" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="para o estúdio te responder"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form__campo">
        <label className="form__rotulo" htmlFor="mensagem">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          placeholder="O que você quer saber"
          required
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
      </div>

      <button className="btn btn--solid" type="submit">
        <span>Enviar mensagem</span>
        <span className="btn__arrow">→</span>
      </button>

      <p className="form__nota">
        Ao enviar, a mensagem abre já preenchida no seu programa de e-mail.
      </p>
    </form>
  );
}
