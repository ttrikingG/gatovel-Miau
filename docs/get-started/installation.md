# Installation

[← Home](../../README.md) · [Next: Quick Start →](quick-start.md)

---

## Requirements

Before creating a Miau application, make sure you have:

- Node.js
- npm
- TypeScript

Miau is designed to run in modern browsers and uses native Web APIs.

---

## Creating a project

The recommended way to create a new Miau application is through `create-miau`.

```bash
npx create-miau my-app

Replace my-app with the name of your application.

After creating the project:

cd my-app

Install the project dependencies:

npm install
Project structure

A new Miau application follows a simple structure:

my-app/
├── public/
│   └── index.html
│
├── scripts/
│   ├── build.mjs
│   └── dev.mjs
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── state/
│   │   └── styles/
│   │
│   └── main.ts
│
├── package.json
└── tsconfig.json

The structure is intentionally simple. Application code lives inside src/, while public/ contains files served directly by the application.

Development

Start the development server:

npm run dev

The application will be available at:

http://localhost:3000
Build

Create a production build:

npm run build

The generated application will be placed inside the dist/ directory.

Next step

Continue to Quick Start → to learn the basic building blocks of a Miau application.