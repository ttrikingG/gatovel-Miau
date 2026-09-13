import { createElement } from '../../nucleo/dom/DOM.js';
import { on } from '../../nucleo/events/Events.js';

export interface FormOptions {
    children?: Node[];
    onSubmit?: (
        event: SubmitEvent
    ) => void;
}

export function Form(
    options: FormOptions = {}
): HTMLFormElement {
    const form = createElement('form', {
        className: 'miau-form'
    });

    if (options.children) {
        for (const child of options.children) {
            form.appendChild(child);
        }
    }

    if (options.onSubmit) {
        on(
            form,
            'submit',
            options.onSubmit
        );
    }

    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '1rem';

    return form;
}