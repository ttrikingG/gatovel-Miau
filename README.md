# Gatovel Miau

A lightweight and modular frontend framework for Web applications, built with TypeScript and native Web APIs, featuring its own HTML-like component syntax and build-time compiler.

Miau is recommended for applications built with the Gatovel Framework, but it is independent and can work with any backend through HTTP/JSON.

## About

Miau is an independent frontend framework designed to provide a small, predictable, and modular foundation for building Web applications.

Unlike traditional frontend frameworks that require developers to construct component trees directly through JavaScript APIs, Miau provides an HTML-like application syntax that is transformed into JavaScript during the build process.

Example:

```html
<div class="app">
    <Header title="Minha aplicação Miau" />

    <main>
        <h1>Olá Miau</h1>
    </main>
</div>
```

The Miau compiler transforms this source into executable JavaScript that creates the corresponding DOM structure and resolves the required components.

The goal is to provide a development experience that feels close to writing HTML while maintaining the flexibility of TypeScript and the native Web platform.

## Philosophy

Miau follows a simple principle:

> Provide mechanisms, not impose the application.

The framework provides the mechanisms required to build Web applications while avoiding unnecessary abstractions and application-level conventions.

Miau does not attempt to reproduce the architecture of existing frameworks such as React, Vue, or Svelte.

Instead, it defines its own component model, syntax, and compilation pipeline.

## Compiler

The Miau compiler is a build-time compiler responsible for transforming `.miau` application source files into executable JavaScript.

The compilation pipeline is organized into independent stages:

```text
.miau source
     │
     ▼
   Lexer
     │
     ▼
   Parser
     │
     ▼
    AST
     │
     ▼
 Transformer
     │
     ▼
 Runtime AST
     │
     ▼
  Generator
     │
     ▼
 JavaScript
```

The compiler also includes component resolution and output generation:

```text
Application Source
       │
       ▼
     Lexer
       │
       ▼
     Parser
       │
       ▼
      AST
       │
       ▼
   Transformer
       │
       ▼
   Runtime AST
       │
       ├──────────────► Component Resolver
       │
       ▼
    Generator
       │
       ▼
   JavaScript
       │
       ▼
    Browser
```

This architecture allows Miau to understand its own component syntax instead of relying on runtime parsing in the browser.

## Miau Syntax

Miau applications use an HTML-like syntax with support for native HTML elements and Miau components.

Example:

```html
<div class="app">
    <Header title="Minha aplicação Miau" />

    <main>
        <Home />
    </main>
</div>
```

HTML elements are represented as native DOM elements, while components are resolved and instantiated by the generated JavaScript.

The syntax is intentionally simple and designed specifically for Miau.

## Components

Components are TypeScript classes that define their own rendering behavior.

Example:

```ts
import { Component } from '../../src/nucleo/component/Component.js';

interface HeaderProps {
    title: string;
}

export class Header extends Component<HeaderProps> {
    protected render(): HTMLElement {
        const header = document.createElement('header');

        const title = document.createElement('h1');

        title.textContent = this.props.title;

        header.appendChild(title);

        return header;
    }
}
```

Components can receive typed Props directly from Miau syntax:

```html
<Header title="Minha aplicação Miau" />
```

The compiler transforms this into JavaScript equivalent to:

```js
new Header({
    "title": "Minha aplicação Miau"
});
```

## Props

Miau supports component Props through attributes defined in `.miau` files.

Example:

```html
<Header title="Minha aplicação Miau" />
```

The component defines its Props using TypeScript:

```ts
interface HeaderProps {
    title: string;
}
```

and accesses them through:

```ts
this.props.title
```

This allows the component API to remain strongly typed while keeping the application syntax simple.

## Core

The Miau runtime core is organized into independent modules:

* Component
* DOM
* Events
* HTTP
* Router
* State

### Component

Provides the base component abstraction and component lifecycle operations.

### DOM

Provides utilities for creating and manipulating native DOM elements.

### Events

Provides event registration, removal, and dispatching.

### HTTP

Provides a small abstraction over the native `fetch` API for HTTP communication.

### Router

Provides client-side navigation and route resolution.

### State

Provides a lightweight state container with subscriptions.

All core modules are implemented using TypeScript and native Web APIs.

## Architecture

The project is organized into distinct layers:

```text
miau/
├── public/
│
├── src/
│   ├── nucleo/
│   │   ├── component/
│   │   ├── dom/
│   │   ├── events/
│   │   ├── http/
│   │   ├── router/
│   │   └── state/
│   │
│   ├── compiler/
│   │   ├── ast/
│   │   ├── generator/
│   │   ├── lexer/
│   │   ├── parser/
│   │   ├── transformer/
│   │   ├── resolver/
│   │   ├── output/
│   │   └── Compiler.ts
│   │
│   ├── build/
│   │   └── Build.ts
│   │
│   ├── cli/
│   │   └── index.ts
│   │
│   └── app/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── routes/
│       ├── services/
│       ├── state/
│       └── styles/
│
├── tests/
├── miau.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Compiler Architecture

The compiler is divided into specialized modules:

### Lexer

Converts Miau source code into tokens.

### Parser

Converts tokens into an Abstract Syntax Tree (AST).

### AST

Represents the structure of the Miau source independently from the generated runtime code.

### Transformer

Transforms the source AST into a runtime-oriented AST describing the operations required to create the application.

### Generator

Converts the runtime AST into executable JavaScript.

### Component Resolver

Resolves Miau component references to their TypeScript source files and generates the corresponding JavaScript imports.

### Output Writer

Writes generated compiler output to the filesystem.

### Build

Coordinates the Miau compilation process and output generation.

## Development Model

Miau follows a build-time approach.

The browser does not need to understand the `.miau` syntax directly.

Instead:

```text
Developer
    │
    │ writes
    ▼
App.miau
    │
    │ build
    ▼
Miau Compiler
    │
    │ generates
    ▼
JavaScript
    │
    ▼
Browser
```

This keeps the runtime lightweight and moves the complexity of understanding Miau syntax into the development/build process.

## Backend Independence

Miau is not coupled to the Gatovel Framework.

Although Miau is primarily recommended as the frontend framework for Gatovel applications, it can communicate with any backend capable of providing HTTP/JSON APIs.

For example:

```text
Miau
 │
 │ HTTP/JSON
 ▼
Gatovel
```

or:

```text
Miau
 │
 │ HTTP/JSON
 ▼
Laravel
```

or:

```text
Miau
 │
 │ HTTP/JSON
 ▼
Node.js
```

The frontend framework does not impose a specific backend technology.

## Native Web Platform

Miau is built on top of native Web APIs instead of depending on a large runtime ecosystem.

The framework makes use of APIs such as:

* DOM APIs
* Fetch API
* History API
* Browser Events
* Web APIs available through TypeScript

The objective is to keep the framework understandable, modular, and close to the platform on which it runs.

## Current Status

Miau is currently under active development.

The following foundations are already implemented:

* TypeScript-based framework core
* Component system
* DOM utilities
* Events module
* HTTP module
* Router
* State management
* Miau HTML-like syntax
* Lexer
* Parser
* Abstract Syntax Tree
* Runtime AST
* Transformer
* JavaScript Generator
* Component Resolver
* Build system
* Component Props
* `.miau` to JavaScript compilation
* Browser execution of compiled applications

The compiler has been successfully tested through the complete pipeline:

```text
.miau
  ↓
Compiler
  ↓
JavaScript
  ↓
Component import
  ↓
DOM generation
  ↓
Browser
```

Development is continuing incrementally, with each subsystem being implemented and tested before expanding the framework.

## Requirements

* Node.js
* TypeScript

## License

MIT
