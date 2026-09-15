### `docs/get-started/first-application.md`

```markdown
# First Application

[← Quick Start](quick-start.md) · [Home](../../README.md) · [Next: Architecture →](../documentation/architecture.md)

---

## Building a small application

In this guide, we will combine some of Miau's modules to create a small application.

The example contains:

- a page;
- a button;
- application state;
- DOM manipulation;
- an event;
- a simple counter.

---

## Creating the page

Create:

```text
src/app/pages/Home.ts

Add:

import {
    createElement,
    append,
    on,
    State
} from 'miau';

export function Home(): HTMLElement {
    const page =
        createElement('main');

    const title =
        createElement(
            'h1',
            {
                textContent:
                    'Miau Counter'
            }
        );

    const value =
        createElement(
            'p',
            {
                textContent: '0'
            }
        );

    const button =
        createElement(
            'button',
            {
                textContent:
                    'Increment'
            }
        );

    const counter =
        new State(0);

    counter.subscribe(
        (currentValue) => {
            value.textContent =
                String(currentValue);
        }
    );

    on(
        button,
        'click',
        () => {
            counter.update(
                (currentValue) =>
                    currentValue + 1
            );
        }
    );

    append(
        page,
        title,
        value,
        button
    );

    return page;
}

The page creates the title, counter value and button.

The State object stores the counter value.

When the button is clicked, the state is updated and the subscriber updates the displayed value.

Creating the route

Create:

src/app/routes/routes.ts

Then define the application route:

import {
    type Route
} from 'miau';

import {
    Home
} from '../pages/Home.js';

export const routes: Route[] = [
    {
        path: '/',
        page: Home
    }
];

The / route points to the Home page.

Connecting the Router

Create or update:

src/main.ts
import {
    Router,
    queryRequired
} from 'miau';

import {
    routes
} from './app/routes/routes.js';

const outlet =
    queryRequired<HTMLElement>(
        '#app'
    );

const router =
    new Router(
        routes,
        {
            outlet
        }
    );

router.start();

The application now has a complete flow:

Browser
   │
   ▼
Router
   │
   ▼
Home Page
   │
   ├── State
   ├── DOM
   └── Events
Running the application

Build the application:

npm run build

Start the development server:

npm run dev

Open:

http://localhost:3000

You should see the Miau Counter.

Clicking Increment changes the state and updates the displayed value.

What happened?

The example demonstrates a basic Miau application flow:

User interaction
       │
       ▼
     Event
       │
       ▼
     State
       │
       ▼
     Update
       │
       ▼
      DOM

Miau does not try to hide the Web platform.

Instead, it provides small utilities around native browser APIs to make application development more organized and modular.

Where to go next

You have now created your first Miau application.

Continue with Architecture → to understand how Miau is organized internally and how its modules work together.

← Quick Start · Home · Architecture →