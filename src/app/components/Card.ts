import { createElement } from '../../nucleo/dom/DOM.js';

export interface CardOptions {
    title?: string;
    content?: string;
    children?: Node[];
}

export function Card(
    options: CardOptions = {}
): HTMLElement {
    const card = createElement('section', {
        className: 'miau-card'
    });

    if (options.title) {
        const title = createElement('h2', {
            className: 'miau-card-title',
            textContent: options.title
        });

        card.appendChild(title);
    }

    if (options.content) {
        const content = createElement('p', {
            className: 'miau-card-content',
            textContent: options.content
        });

        card.appendChild(content);
    }

    if (options.children) {
        for (const child of options.children) {
            card.appendChild(child);
        }
    }

    card.style.padding = '1.5rem';
    card.style.border = '1px solid #ddd';
    card.style.borderRadius = '0.75rem';

    if (options.title) {
        const title = card.querySelector(
            '.miau-card-title'
        );

        if (title instanceof HTMLElement) {
            title.style.marginTop = '0';
        }
    }

    return card;
}