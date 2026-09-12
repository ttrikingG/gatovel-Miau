export function createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options: {
        className?: string;
        id?: string;
        textContent?: string;
        attributes?: Record<string, string>;
    } = {}
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);

    if (options.className) {
        element.className = options.className;
    }

    if (options.id) {
        element.id = options.id;
    }

    if (options.textContent !== undefined) {
        element.textContent = options.textContent;
    }

    if (options.attributes) {
        for (const [name, value] of Object.entries(options.attributes)) {
            element.setAttribute(name, value);
        }
    }

    return element;
}

export function append(
    parent: HTMLElement,
    ...children: Array<Node | null | undefined>
): void {
    for (const child of children) {
        if (child) {
            parent.appendChild(child);
        }
    }
}

export function clear(element: HTMLElement): void {
    element.replaceChildren();
}

export function query<T extends Element = Element>(
    selector: string,
    parent: ParentNode = document
): T | null {
    return parent.querySelector<T>(selector);
}

export function queryRequired<T extends Element = Element>(
    selector: string,
    parent: ParentNode = document
): T {
    const element = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }

    return element;
}

export function mount(
    element: HTMLElement,
    container: HTMLElement
): void {
    container.appendChild(element);
}