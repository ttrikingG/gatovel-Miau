# Miau Application Layouts Specification

## 1. Objetivo

A camada Layouts fornece estruturas visuais compartilhadas
entre páginas de uma aplicação Miau.

Local:

src/app/layouts/

---

## 2. Responsabilidade

Um Layout define a estrutura geral de uma página.

Exemplo:

Layout
├── Header
├── Content
└── Footer

O conteúdo específico da página será inserido no Content.

---

## 3. Relação arquitetural

Router
 ↓
Layout
 ↓
Page
 ↓
Component
 ↓
DOM

---

## 4. Relação com Component

Todo Layout deverá utilizar o Component do Miau Core.

Um Layout é um Component especializado em estruturar
o conteúdo de uma aplicação.

---

## 5. Conteúdo

O Layout deverá receber um elemento HTMLElement como conteúdo.

Exemplo:

const layout = new AppLayout();

layout.mount(document.body);

layout.setContent(pageElement);

---

## 6. AppLayout

A primeira implementação fornecerá:

src/app/layouts/AppLayout.ts

Estrutura:

AppLayout
├── Header
└── Main

O Header será fornecido pelo Application Components.

---

## 7. Responsabilidades do Layout

O Layout pode:

- Organizar componentes.
- Definir estrutura visual.
- Inserir páginas.
- Utilizar Components.

O Layout não deve:

- Implementar roteamento.
- Realizar requisições HTTP.
- Acessar banco de dados.
- Implementar autenticação.
- Implementar regras de negócio.

---

## 8. Page

A Page representa o conteúdo específico.

Exemplo:

AppLayout
├── Header
└── Home

O Layout não deve conhecer a lógica interna da Home.

---

## 9. Primeira versão

A primeira versão terá somente:

AppLayout

Estrutura:

<header>
    ...
</header>

<main>
    ...
</main>

---

## 10. Critérios de conclusão

- [ ] AppLayout implementado.
- [ ] Utiliza Component.
- [ ] Utiliza Header.
- [ ] Permite inserir conteúdo.
- [ ] TypeScript compila.
- [ ] Funciona no navegador.