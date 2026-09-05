export abstract class Component {
    private element: HTMLElement | null = null;
    private mounted = false;

    protected abstract render(): HTMLElement;

    public mount(container: HTMLElement): void {
        if (this.mounted) {
            throw new Error('Component is already mounted.');
        }

        const element = this.render();

        container.appendChild(element);

        this.element = element;
        this.mounted = true;
    }

    public update(): void {
        if (!this.mounted || this.element === null) {
            throw new Error('Component must be mounted before updating.');
        }

        const newElement = this.render();

        this.element.replaceWith(newElement);

        this.element = newElement;
    }

    public unmount(): void {
        if (!this.mounted || this.element === null) {
            return;
        }

        this.element.remove();

        this.element = null;
        this.mounted = false;
    }
}