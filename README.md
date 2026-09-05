# Gatovel Miau

A lightweight and modular frontend framework for Web applications, recommended for the Gatovel Framework but designed to work with any backend.

## About

Miau is an independent frontend framework built with TypeScript and native Web APIs.

It is designed to provide a small, predictable, and modular foundation for building Web applications.

Miau is primarily recommended for applications built with the Gatovel Framework, but it is not coupled to Gatovel and can communicate with any backend through HTTP/JSON.

## Core

The Miau core is organized into independent modules:

- Component
- DOM
- Events
- HTTP
- Router
- State

The framework follows a simple principle:

> Provide mechanisms, not impose the application.

## Architecture

miau/
├── public/
├── src/
│   ├── nucleo/
│   │   ├── component/
│   │   ├── dom/
│   │   ├── events/
│   │   ├── http/
│   │   ├── router/
│   │   └── state/
│   └── app/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── routes/
│       ├── services/
│       ├── state/
│       └── styles/
├── tests/
├── miau.config.ts
├── package.json
└── README.md

## Status

Miau is currently under development.

The framework is being developed incrementally, with each core module being implemented and tested before moving to the next stage.

## Requirements

- Node.js
- TypeScript

## License

MIT