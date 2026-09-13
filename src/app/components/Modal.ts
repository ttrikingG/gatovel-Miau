import { createElement } from '../../nucleo/dom/DOM.js';
import { on } from '../../nucleo/events/Events.js';

export interface ModalOptions {
    title?: string;
    content?: Node;
    closeOnBackdrop?: boolean;
}

export interface Modal {
    element: HTMLElement;
    open(): void;
    close(): void;
}

export function Modal(
    options: ModalOptions = {}
): Modal {
    const overlay = createElement('div', {
        className: 'miau-modal-overlay'
    });

    const container = createElement('div', {
        className: 'miau-modal'
    });

    const header = createElement('div', {
        className: 'miau-modal-header'
    });

    const body = createElement('div', {
        className: 'miau-modal-body'
    });

    const closeButton = createElement('button', {
        className: 'miau-modal-close',
        textContent: '×',
        attributes: {
            type: 'button',
            'aria-label': 'Close'
        }
    });

    if (options.title) {
        const title = createElement('h2', {
            className: 'miau-modal-title',
            textContent: options.title
        });

        header.appendChild(title);
    }

    header.appendChild(closeButton);

    if (options.content) {
        body.appendChild(options.content);
    }

    container.append(
        header,
        body
    );

    overlay.appendChild(container);

    const close = (): void => {
        overlay.remove();
    };

    const open = (): void => {
        if (!document.body.contains(overlay)) {
            document.body.appendChild(overlay);
        }
    };

    on(
        closeButton,
        'click',
        close
    );

    if (options.closeOnBackdrop ?? true) {
        on(
            overlay,
            'click',
            (event) => {
                if (event.target === overlay) {
                    close();
                }
            }
        );
    }

    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'rgba(0, 0, 0, 0.5)';

    container.style.width = 'min(90%, 500px)';
    container.style.padding = '1.5rem';
    container.style.background = '#fff';
    container.style.borderRadius = '0.75rem';

    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';

    closeButton.style.border = '0';
    closeButton.style.background = 'transparent';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '1.5rem';

    return {
        element: overlay,
        open,
        close
    };
}