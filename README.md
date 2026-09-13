cat > README.md <<'EOF'
# 🐱 Miau

<p align="center">
    <strong>Small. Modular. Simple.</strong>
</p>

<p align="center">
    Um framework frontend pequeno, modular e simples para a Web.
</p>

<p align="center">
    <a href="./docs/get-started/installation.md">Get Started</a>
    &nbsp;·&nbsp;
    <a href="./docs/documentation/architecture.md">Documentation</a>
    &nbsp;·&nbsp;
    <a href="./docs/examples/counter.md">Examples</a>
</p>

---

## Miau

O **Miau** é um framework frontend desenvolvido com **TypeScript** e construído sobre APIs nativas da Web.

A proposta é oferecer uma base simples e modular para desenvolvimento de aplicações frontend, mantendo o controle próximo das tecnologias nativas do navegador.

O Miau não utiliza JSX, não possui arquivos `.miau` e não depende de uma linguagem ou compilador próprio.

---

## ✨ Características

- TypeScript
- APIs nativas da Web
- Arquitetura modular
- Manipulação do DOM
- Sistema de eventos
- Cliente HTTP
- Router
- Gerenciamento de estado
- Sistema de templates
- Componentes baseados em funções
- Sem JSX
- Sem arquivos `.miau`
- Independente de backend

---

# 📚 Documentação

## 🚀 Get Started

Comece aqui para aprender a utilizar o Miau.

### 1. [Installation](./docs/get-started/installation.md)

Instale o Miau e prepare o ambiente de desenvolvimento.

### 2. [Quick Start](./docs/get-started/quick-start.md)

Conheça os primeiros conceitos e crie uma aplicação simples.

### 3. [First Application](./docs/get-started/first-application.md)

Construa sua primeira aplicação utilizando o Miau.

---

## 📖 Documentation

Conheça a arquitetura e os principais módulos do framework.

### [Architecture](./docs/documentation/architecture.md)

Entenda como o Miau está organizado e como seus módulos se relacionam.

### [DOM](./docs/documentation/dom.md)

Criação, manipulação e consulta de elementos da Web.

### [Events](./docs/documentation/events.md)

Sistema de eventos do Miau.

### [HTTP](./docs/documentation/http.md)

Comunicação com APIs através de HTTP e JSON.

### [Router](./docs/documentation/router.md)

Navegação entre páginas utilizando o sistema de rotas do Miau.

### [State](./docs/documentation/state.md)

Gerenciamento simples de estado.

### [Template](./docs/documentation/template.md)

Interpolação de dados e utilização do sistema de templates.

---

## 🧪 Examples

Exemplos práticos utilizando os recursos do Miau.

### [Counter](./docs/examples/counter.md)

Exemplo de aplicação utilizando gerenciamento de estado.

### [HTTP](./docs/examples/http.md)

Exemplo de comunicação com uma API.

### [Components](./docs/examples/components.md)

Exemplo de criação e utilização de componentes.

---

# 🏗️ Arquitetura

```text
src/
├── nucleo/
│   ├── dom/
│   ├── events/
│   ├── http/
│   ├── router/
│   ├── state/
│   └── template/
│
└── app/
    ├── components/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── services/
    ├── state/
    └── styles/

O diretório nucleo contém as funcionalidades fundamentais do framework.

O diretório app representa a aplicação construída utilizando o Miau.

🌐 Backend

O Miau não acessa bancos de dados diretamente.

A comunicação com o backend acontece através de HTTP e JSON.

┌─────────────────┐
│      MIAU       │
│    Frontend     │
└────────┬────────┘
         │
      HTTP/JSON
         │
         ▼
┌─────────────────┐
│     Backend     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Database     │
└─────────────────┘

O backend pode ser desenvolvido utilizando qualquer tecnologia capaz de fornecer uma API HTTP/JSON.

🐾 Ecossistema

O Miau é um projeto independente, mas foi desenvolvido para trabalhar muito bem com o ecossistema Gatovel.

┌──────────────────────────┐
│         Gatovel          │
│          Backend         │
└────────────┬─────────────┘
             │
          HTTP/JSON
             │
             ▼
┌──────────────────────────┐
│           Miau           │
│          Frontend        │
└──────────────────────────┘

O Miau não depende do Gatovel e pode ser utilizado com qualquer backend HTTP/JSON.

📦 Instalação rápida
npm install miau

Para criar uma nova aplicação:

create-miau meu-projeto

Depois:

cd meu-projeto
npm install
npm run dev
🧭 Navegação
Get Started
Installation →
Quick Start →
First Application →
Documentation
Architecture →
DOM →
Events →
HTTP →
Router →
State →
Template →
Examples
Counter →
HTTP →
Components →
📄 License

MIT License.

<p align="center"> <strong>Miau</strong><br> Small. Modular. Simple. </p> EOF ```

Agora o README.md é a Home, e os links levam diretamente para as páginas de docs/.