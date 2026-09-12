import { createElement } from '../../nucleo/dom/DOM.js';
import { on } from '../../nucleo/events/Events.js';

export interface ButtonOptions {
    label?: string;
    onClick?: () => void;
}

export function Button(
    options: ButtonOptions = {}
): HTMLButtonElement {
    const button = createElement('button', {
        className: 'miau-button',
        textContent: options.label ?? 'Button'
    });

    if (options.onClick) {
        on(button, 'click', options.onClick);
    }

    button.style.padding = '0.75rem 1rem';
    button.style.border = '0';
    button.style.borderRadius = '0.5rem';
    button.style.cursor = 'pointer';
    button.style.fontSize = '1rem';

    return button;
}