# Miau Application Components Specification

## 1. Objetivo

A camada Application Components contém componentes específicos
da aplicação construída com Miau.

Local:

src/app/components/

---

## 2. Relação com o Core

Os componentes da aplicação utilizam o componente base fornecido
pelo Miau Core.

Arquitetura:

Application Component
        ↓
Core Component
        ↓
DOM

---

## 3. Responsabilidades

Application Components são responsáveis por:

- Representar partes visuais da aplicação.
- Utilizar o Core Component.
- Construir sua própria estrutura HTML.
- Utilizar os mecanismos fornecidos pelo Core.

---

## 4. Estrutura

Os componentes ficarão diretamente em:

src/app/components/

Exemplo:

src/app/components/Header.ts
src/app/components/Button.ts
src/app/components/Card.ts

---

## 5. Regras

Os componentes da aplicação:

- Podem utilizar Component.
- Podem utilizar DOM.
- Podem utilizar Events.
- Podem utilizar State.
- Não devem implementar funcionalidades pertencentes ao Core.
- Não devem acessar diretamente o banco de dados.
- Não devem conter lógica de roteamento.
- Não devem conhecer detalhes específicos do backend.

---

## 6. Componentes

Um componente deve estender:

Component

Exemplo:

class Header extends Component {
    protected render(): HTMLElement {
        ...
    }
}

---

## 7. Renderização

A renderização deverá produzir elementos HTML utilizando
as APIs disponíveis pelo Miau.

Não será utilizado:

- JSX
- Virtual DOM
- Template Engine
- HTML Injection
- Sistema próprio de templates

---

## 8. Estado

Quando necessário, um componente poderá utilizar State.

Exemplo:

State
  ↓
Component
  ↓
DOM

A integração automática entre State e Component não faz parte
desta primeira versão.

---

## 9. Eventos

Componentes podem utilizar Events para interação com o usuário.

Exemplo:

Button
  ↓
Events
  ↓
Handler

---

## 10. HTTP

Componentes não devem realizar chamadas HTTP diretamente.

Quando uma operação HTTP for necessária, a aplicação deverá
utilizar Services.

Arquitetura:

Component
    ↓
Service
    ↓
HTTP
    ↓
Backend

---

## 11. Router

Componentes não devem implementar navegação diretamente.

A navegação deverá utilizar o Router.

---

## 12. Objetivo arquitetural

A camada Application deve utilizar os mecanismos fornecidos
pelo Core sem duplicar suas responsabilidades.

Core:

Fornece mecanismos.

Application:

Utiliza mecanismos para construir a aplicação.

---

## 13. Critérios de conclusão

A camada Components será considerada iniciada quando:

- [ ] Primeiro componente implementado.
- [ ] Componente utilizar Core Component.
- [ ] Renderização funcionar.
- [ ] Componente funcionar no navegador.
- [ ] TypeScript compilar sem erros.