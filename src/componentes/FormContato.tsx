"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site, linkDeWhatsapp } from "@/conteudo/site";

// Formulário de contato. Envia de verdade, sem sair da página: a mensagem vai
// para a Netlify, que guarda uma cópia no painel dela e manda um e-mail de
// aviso. DUVIDAS #5 tem a comparação com os outros caminhos.
//
// A Netlify só conhece formulário que existe como HTML no deploy, e este só
// existe depois do JavaScript. Por isso há um esqueleto em
// `public/__forms.html`, e é para ele que o envio vai. Os nomes dos campos
// daqui precisam ser os mesmos de lá, e o `form-name` também. Campo novo aqui
// exige campo novo lá.

const ARQUIVO_DO_FORMULARIO = "/__forms.html";
const NOME_DO_FORMULARIO = "contato";
const LIMITE_DE_ESPERA_MS = 15000;

type Estado = "parado" | "enviando" | "enviado" | "erro";

export default function FormContato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [estado, setEstado] = useState<Estado>("parado");
  const confirmacao = useRef<HTMLDivElement>(null);

  // Depois de enviar, o foco vai para a confirmação: quem usa leitor de tela
  // ou teclado fica sabendo que deu certo, em vez de ficar num formulário que
  // sumiu.
  useEffect(() => {
    if (estado === "enviado") confirmacao.current?.focus();
  }, [estado]);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;

    // Campo que a pessoa não vê. Robô de spam preenche tudo o que acha; gente,
    // não. Preenchido, fingimos que deu certo e não enviamos nada.
    const armadilha = new FormData(e.currentTarget).get("campo-extra");
    if (armadilha) {
      setEstado("enviado");
      return;
    }

    setEstado("enviando");
    const espera = new AbortController();
    const relogio = setTimeout(() => espera.abort(), LIMITE_DE_ESPERA_MS);
    try {
      const resposta = await fetch(ARQUIVO_DO_FORMULARIO, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": NOME_DO_FORMULARIO,
          subject: "Mensagem pelo site do Studio Sôa",
          nome,
          email,
          mensagem,
        }).toString(),
        signal: espera.signal,
      });
      if (!resposta.ok) throw new Error(`Resposta ${resposta.status}`);
      setNome("");
      setEmail("");
      setMensagem("");
      setEstado("enviado");
    } catch {
      // Os campos continuam preenchidos: quem digitou uma mensagem longa não
      // perde o texto por causa de uma falha de rede.
      setEstado("erro");
    } finally {
      clearTimeout(relogio);
    }
  }

  // O `<form>` é sempre o mesmo elemento, e só o que há dentro dele muda. Se a
  // confirmação fosse outro elemento, a animação de entrada da página (que dá
  // 0,66 s de atraso ao formulário) tocaria de novo e a confirmação demoraria
  // a aparecer.
  return (
    <form className="form" onSubmit={enviar}>
      {estado === "enviado" ? (
        <div
          className="form__confirmacao"
          ref={confirmacao}
          tabIndex={-1}
          role="status"
        >
          <p className="form__resposta">Mensagem enviada.</p>
          <p className="form__nota">Recebemos sua mensagem e respondemos por e-mail.</p>
          <button
            className="btn btn--solid"
            type="button"
            onClick={() => setEstado("parado")}
          >
            <span>Enviar outra mensagem</span>
            <span className="btn__arrow">→</span>
          </button>
        </div>
      ) : (
        <>
          <div className="form__campo">
            <label className="form__rotulo" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Como você se chama"
              autoComplete="name"
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
              placeholder="Onde podemos te encontrar"
              autoComplete="email"
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

          {/* A armadilha de spam. Fora da tela, fora da ordem do teclado e
              escondida de leitor de tela. O nome é o mesmo de
              `public/__forms.html`. */}
          <div className="form__extra" aria-hidden="true">
            <label>
              Não preencha este campo
              <input
                name="campo-extra"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <button
            className="btn btn--solid"
            type="submit"
            disabled={estado === "enviando"}
          >
            <span>{estado === "enviando" ? "Enviando" : "Enviar mensagem"}</span>
            <span className="btn__arrow">→</span>
          </button>

          {estado === "erro" ? (
            <p className="form__erro" role="alert">
              Não conseguimos enviar agora. Tente de novo, ou escreva para{" "}
              <a href={`mailto:${site.contato.email}`}>{site.contato.email}</a>{" "}
              ou chame no{" "}
              <a
                href={linkDeWhatsapp(
                  "Olá! Vim pelo site do Studio Sôa e tentei falar pelo formulário.",
                )}
                target="_blank"
                rel="noopener"
              >
                WhatsApp
              </a>
              .
            </p>
          ) : (
            <p className="form__nota">
              Usamos seu nome e e-mail só para responder a esta mensagem.
            </p>
          )}
        </>
      )}
    </form>
  );
}
