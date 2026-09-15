### `docs/get-started/quick-start.md`

```markdown
# Quick Start

[← Installation](installation.md) · [Home](../../README.md) · [Next: First Application →](first-application.md)

---

## Your first Miau component

Miau components are functions that return HTML elements.

```ts
import { createElement } from 'miau';

export function Hello(): HTMLElement {
    return createElement(
        'h1',
        {
            textContent: 'Hello, Miau!'
        }
    );
}

A component does not need to be a class.

It is simply a function that creates and returns an HTMLElement.

Rendering a component

A component can be added to the application using Miau's DOM utilities.

import {
    append,
    queryRequired
} from 'miau';

import {
    Hello
} from './app/components/Hello.js';

const app =
    queryRequired('#app');

append(
    app,
    Hello()
);

The resulting HTML is:

<div id="app">
    <h1>Hello, Miau!</h1>
</div>
Using State

Miau provides a small state implementation.

import { State } from 'miau';

const counter =
    new State(0);

counter.subscribe(
    (value) => {
        console.log(value);
    }
);

counter.set(1);
counter.set(2);
counter.set(3);

Every time the state changes, its subscribers are notified.

You can also update the current value:

counter.update(
    (value) => value + 1
);
Handling events

Miau provides utilities for working with DOM events.

import {
    createElement,
    on
} from 'miau';

const button =
    createElement(
        'button',
        {
            textContent: 'Click me'
        }
    );

on(
    button,
    'click',
    () => {
        console.log(
            'Button clicked!'
        );
    }
);

The event system uses the browser's native event APIs.

HTTP requests

Miau includes a small HTTP client based on the native fetch API.

import { Http } from 'miau';

const http =
    new Http();

const user =
    await http.get('/api/user');

console.log(user);

The HTTP client supports:

GET
POST
PUT
PATCH
DELETE

Miau does not communicate directly with databases.

Applications communicate with their backend through HTTP APIs.

Routing

Miau includes a simple client-side Router.

import {
    Router,
    type Route
} from 'miau';

const routes: Route[] = [
    {
        path: '/',
        page: () => {
            const page =
                document.createElement(
                    'main'
                );

            page.textContent =
                'Home';

            return page;
        }
    }
];

const router =
    new Router(
        routes,
        {
            outlet:
                document.querySelector(
                    '#app'
                )!
        }
    );

router.start();

The Router uses the browser's History API and does not require an external routing library.

Templates

Miau provides a simple interpolation system for backend data.

A template can contain:

Olá, ^^user.name^^!

Given:

{
    "user": {
        "name": "Tom"
    }
}

The result is:

Olá, Tom!

The ^^...^^ syntax is intentionally simple.

It resolves values from data and is not a programming language or expression system.

Miau modules

The core provides a small set of focused modules:

DOM
Events
HTTP
Router
State
Template

Each module has a specific responsibility and can be used independently.

Next step

Continue to First Application → and put these concepts together in a small application.