# MIAU

## Especificação Oficial — v1

### 1. Objetivo

Miau é um mini framework frontend desenvolvido para criar interfaces web modernas de forma simples, organizada e previsível.

O Miau foi projetado principalmente para trabalhar em conjunto com o Gatovel Framework, mas seu núcleo não depende do Gatovel.

Seu objetivo é fornecer uma estrutura frontend pequena para:

* criação de componentes;
* criação de páginas;
* layouts;
* roteamento;
* gerenciamento de estado;
* comunicação HTTP;
* manipulação do DOM;
* eventos;
* estilos;
* integração com APIs.

O Miau deve permanecer pequeno, modular e fácil de compreender.

---

# 2. Princípios

O Miau seguirá os seguintes princípios:

### 2.1 Simplicidade

O Miau deve resolver os problemas necessários sem introduzir complexidade desnecessária.

### 2.2 Estrutura rígida

O projeto possuirá uma estrutura oficial de diretórios.

O desenvolvedor deve trabalhar dentro dessa estrutura.

### 2.3 Separação de responsabilidades

Cada diretório possuirá uma responsabilidade definida.

### 2.4 Modularidade

Os componentes internos do Miau devem possuir responsabilidades independentes sempre que possível.

### 2.5 Desacoplamento

O Miau não deve depender diretamente de um backend específico.

### 2.6 Identidade do ecossistema

O Miau seguirá a mesma filosofia arquitetural do Gatovel através da separação:

```text
src/
├── nucleo/
└── app/
```

### 2.7 Web como base

O Miau deve trabalhar sobre os conceitos fundamentais da Web:

* HTML;
* CSS;
* JavaScript;
* TypeScript;
* DOM;
* HTTP;
* JSON;
* eventos.

O framework não deve esconder completamente essas tecnologias.

---

# 3. Arquitetura principal

A arquitetura oficial do Miau será:

```text
miau/
│
├── public/
│
├── src/
│   │
│   ├── nucleo/
│   │
│   └── app/
│
├── tests/
│
├── miau.config.ts
├── package.json
└── README.md
```

A pasta `src` possui duas áreas fundamentais:

```text
src/
├── nucleo/
└── app/
```

---

# 4. Núcleo — `src/nucleo`

A pasta `nucleo` contém o código responsável pelo funcionamento interno do Miau.

```text
src/nucleo/
```

Tudo que pertence ao framework deve permanecer nessa área.

Exemplo:

```text
src/nucleo/
├── component/
├── router/
├── state/
├── http/
├── dom/
├── events/
└── ...
```

Os nomes e módulos definitivos serão definidos durante a especificação de cada componente.

### Regra

O desenvolvedor não deve colocar código específico da aplicação dentro de `nucleo`.

---

# 5. Aplicação — `src/app`

A pasta `app` contém o código desenvolvido pelo usuário da aplicação.

```text
src/app/
```

Estrutura inicial:

```text
src/app/
├── components/
├── pages/
├── layouts/
├── routes/
├── services/
├── state/
└── styles/
```

Cada diretório possui uma responsabilidade específica.

---

# 6. Components

```text
src/app/components/
```

Responsável pelos componentes reutilizáveis da aplicação.

Exemplos:

```text
Button
Modal
Navbar
Card
Form
UserCard
```

Componentes devem representar partes reutilizáveis da interface.

---

# 7. Pages

```text
src/app/pages/
```

Responsável pelas páginas da aplicação.

Exemplos:

```text
Home
Login
Register
Dashboard
About
```

Uma página representa uma tela ou rota principal da aplicação.

---

# 8. Layouts

```text
src/app/layouts/
```

Responsável pelas estruturas gerais utilizadas por diferentes páginas.

Exemplos:

```text
App
Dashboard
Auth
Admin
```

Layouts podem definir estruturas como:

```text
Header
Sidebar
Main
Footer
```

---

# 9. Routes

```text
src/app/routes/
```

Responsável pela definição das rotas da aplicação.

Exemplo conceitual:

```text
/
    → Home

/login
    → Login

/register
    → Register

/dashboard
    → Dashboard
```

O sistema de roteamento pertence ao núcleo do Miau.

A definição das rotas da aplicação pertence a `src/app/routes`.

---

# 10. Services

```text
src/app/services/
```

Responsável pela comunicação da aplicação com serviços externos.

Principalmente:

* APIs;
* endpoints HTTP;
* serviços externos;
* comunicação com backend.

Exemplo:

```text
UserService
AuthService
ProductService
```

O Miau fornece a infraestrutura HTTP.

A aplicação define os serviços que utilizará.

---

# 11. State

```text
src/app/state/
```

Responsável pelo estado específico da aplicação.

Exemplos:

```text
AuthState
UserState
CartState
```

O mecanismo de gerenciamento de estado pertence ao núcleo.

Os estados concretos da aplicação pertencem a `app`.

---

# 12. Styles

```text
src/app/styles/
```

Responsável pelos estilos específicos da aplicação.

Exemplos:

```text
app.css
components.css
pages.css
```

O Miau poderá fornecer recursos relacionados ao carregamento e organização dos estilos, mas os estilos da aplicação pertencem a `app`.

---

# 13. Public

```text
public/
```

Contém os arquivos públicos da aplicação.

Exemplos:

```text
public/
├── index.html
├── assets/
└── ...
```

Arquivos acessíveis diretamente pelo navegador devem ficar nessa área quando aplicável.

---

# 14. Tests

```text
tests/
```

Responsável pelos testes do projeto.

Os testes poderão validar:

* componentes;
* páginas;
* rotas;
* estado;
* serviços;
* funcionalidades do Miau.

A estratégia definitiva de testes será definida posteriormente.

---

# 15. Configuração

```text
miau.config.ts
```

Arquivo oficial de configuração do projeto Miau.

Será utilizado para configurações necessárias ao projeto sem espalhar configurações arbitrariamente pelo código.

---

# 16. Package

```text
package.json
```

Responsável pelas informações e dependências do projeto npm.

O Miau será distribuído através do ecossistema npm.

---

# 17. Relação entre Miau e Gatovel

O Miau foi projetado principalmente para trabalhar com o Gatovel.

A integração conceitual será:

```text
┌─────────────────────┐
│       GATOVEL       │
│      Backend        │
└──────────┬──────────┘
           │
        HTTP/JSON
           │
           ▼
┌─────────────────────┐
│        MIAU         │
│      Frontend       │
└─────────────────────┘
```

O Gatovel não deve ser uma dependência obrigatória do núcleo do Miau.

---

# 18. Miau com outros backends

O mesmo Miau poderá trabalhar com outros backends:

```text
Gatovel ──┐
Node ─────┤
PHP ──────┤── HTTP/JSON ──► Miau
Java ─────┤
Python ───┤
Outro ────┘
```

O Miau deve depender de interfaces e protocolos da Web, e não de uma linguagem específica de backend.

---

# 19. Separação de responsabilidades

A regra fundamental será:

```text
src/nucleo/
    ↓
Miau é responsável

src/app/
    ↓
Desenvolvedor é responsável
```

Portanto:

```text
Miau Core
    ├── Component system
    ├── Router
    ├── State engine
    ├── HTTP
    ├── DOM
    ├── Events
    └── outros mecanismos internos

Application
    ├── Components
    ├── Pages
    ├── Layouts
    ├── Routes
    ├── Services
    ├── State
    └── Styles
```

---

# 20. Regra de estrutura

O Miau não terá uma estrutura livre.

O desenvolvedor não deve criar arbitrariamente:

```text
src/helpers/
src/modules/
src/features/
src/controllers/
src/managers/
src/my-stuff/
```

quando essas responsabilidades já forem contempladas pela arquitetura oficial.

A estrutura deve permanecer previsível.

Quando uma nova necessidade surgir, primeiro deve ser determinado se ela pertence a uma responsabilidade existente ou se realmente justifica uma nova área oficial do framework.

---

# 21. Miau não será

O Miau não pretende ser:

* um framework frontend gigantesco;
* uma cópia do React;
* uma cópia do Vue;
* uma cópia do Angular;
* uma solução que esconda completamente JavaScript e DOM;
* um framework acoplado exclusivamente ao Gatovel;
* uma coleção de funcionalidades sem organização.

O objetivo é manter o Miau pequeno e focado.

---

# 22. Objetivo arquitetural

A arquitetura final deve permitir que um desenvolvedor olhe para um projeto Miau e compreenda imediatamente:

```text
nucleo/
    → funcionamento do framework

app/
    → funcionamento da minha aplicação
```

Essa distinção deve permanecer como uma das características fundamentais do Miau.

---

# 23. Visão geral

A arquitetura conceitual do Miau v1:

```text
                         MIAU
                          │
             ┌────────────┴────────────┐
             │                         │
          NÚCLEO                    APP
             │                         │
             │                  ┌──────┴──────┐
             │                  │             │
        Component             Pages       Components
        Router                Routes      Layouts
        State                 Services    State
        HTTP                  Styles
        DOM
        Events
             │                         │
             └────────────┬────────────┘
                          │
                       Browser
                          │
                    HTTP / JSON
                          │
                     Backend API
```

---

# 24. Regra final da v1

Antes de adicionar qualquer funcionalidade ao Miau, devemos responder:

1. Isso pertence ao núcleo?
2. Isso pertence à aplicação?
3. Já existe um local oficial para essa responsabilidade?
4. Essa funcionalidade realmente é necessária?
5. Ela mantém o Miau pequeno e simples?

Se a resposta não justificar a inclusão, a funcionalidade não deve entrar na v1.

---

# 25. Status

**MIAU v1 — Especificação arquitetural inicial**

Status:

```text
[✓] Identidade definida
[✓] Separação nucleo/app definida
[✓] Estrutura inicial definida
[✓] Responsabilidades principais definidas
[✓] Integração com Gatovel definida
[✓] Independência de backend definida
[✓] Princípios definidos

[ ] Especificação dos módulos do núcleo
[ ] Definição da API pública
[ ] Definição dos componentes
[ ] Definição do Router
[ ] Definição do State
[ ] Definição do HTTP
[ ] Definição da CLI
[ ] Implementação
```

**Este documento é a base arquitetural para o desenvolvimento do Miau v1.**
