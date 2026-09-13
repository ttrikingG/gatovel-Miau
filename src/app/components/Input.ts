import { createElement } from '../../nucleo/dom/DOM.js';

export interface InputOptions {
    type?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
}

export function Input(
    options: InputOptions = {}
): HTMLInputElement {
    const input = createElement('input', {
        className: 'miau-input',
        attributes: {
            type: options.type ?? 'text'
        }
    });

    if (options.name !== undefined) {
        input.name = options.name;
    }

    if (options.placeholder !== undefined) {
        input.placeholder = options.placeholder;
    }

    if (options.value !== undefined) {
        input.value = options.value;
    }

    input.disabled = options.disabled ?? false;
    input.required = options.required ?? false;

    input.style.width = '100%';
    input.style.padding = '0.75rem';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '0.5rem';
    input.style.fontSize = '1rem';

    return input;
}