# Aqui entra o Payload

Esta pasta está vazia de propósito. Ela é o lugar exato onde o Payload 3 instala
o painel de administração e a API, e existir desde já é o que faz o site estar
"na estrutura necessária" que o Pedro pediu em 16/09/2026.

O Next só aceita dois `<html>` diferentes na mesma aplicação quando cada um mora
no seu grupo de rota. Por isso o site público está em `(frontend)/` com o layout
raiz dele, e o Payload vai trazer o layout raiz próprio para cá. Nenhum dos dois
nomes aparece na URL.

## O que já está pronto

- **O grupo `(frontend)`** com o layout raiz do site, então não vai ser preciso
  mover página nenhuma quando o CMS chegar.
- **O alias `@payload-config`** no `tsconfig.json`, apontando para
  `src/payload.config.ts`.
- **A camada de conteúdo** em `src/conteudo/`, que é o desenho das coleções
  futuras: `pecas` e `exposicoes` são coleções, `site`, `home`, `sobre`,
  `contato` e `ondeEncontrar` são globais.
- **Os tipos** em `src/tipos/conteudo.ts`, que são o contrato entre conteúdo e
  tela. Nenhum componente lê HTML solto, todos leem esse formato. É isso que faz
  a troca ser só na origem do dado.

## O que falta, quando for a hora

1. **Um banco.** O Payload precisa de MongoDB ou Postgres. Não há nenhum dos
   dois nesta máquina, e essa é a decisão de fora que trava o resto: hospedagem
   com banco muda o custo mensal do site, que hoje seria zero.
2. Instalar: `npm i payload @payloadcms/next @payloadcms/richtext-lexical` mais
   o adaptador do banco escolhido (`@payloadcms/db-mongodb` ou
   `@payloadcms/db-postgres`).
3. Criar `src/payload.config.ts` com as coleções desenhadas em `src/tipos/`.
4. Embrulhar o `next.config.ts` com `withPayload`.
5. Trocar cada `import { pecas } from "@/conteudo/pecas"` por uma consulta ao
   Payload. Os componentes não mudam: é esse o ponto de ter feito a camada.

## Versões conferidas em 16/09/2026

- Next **16.3.5**
- Payload **3.89.0**, que declara compatibilidade com `next >=16.2.6 <17`
- React **19.3.0**

O Payload 4 existe só como pré-lançamento interno. Ficar no 3.89 é o certo.
