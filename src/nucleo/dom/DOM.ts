export class DOM {
    public static create(tag: string): HTMLElement {
        return document.createElement(tag);
    }

    public static setAttribute(
        element: HTMLElement,
        name: string,
        value: string
    ): void {
        element.setAttribute(name, value);
    }

    public static removeAttribute(
        element: HTMLElement,
        name: string
    ): void {
        element.removeAttribute(name);
    }

    public static addClass(
        element: HTMLElement,
        className: string
    ): void {
        element.classList.add(className);
    }

    public static removeClass(
        element: HTMLElement,
        className: string
    ): void {
        element.classList.remove(className);
    }

    public static setText(
        element: HTMLElement,
        text: string
    ): void {
        element.textContent = text;
    }

    public static append(
        parent: HTMLElement,
        child: HTMLElement
    ): void {
        parent.appendChild(child);
    }

    public static remove(
        element: HTMLElement
    ): void {
        element.remove();
    }
}