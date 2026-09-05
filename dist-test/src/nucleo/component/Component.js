export class Component {
    element = null;
    mounted = false;
    mount(container) {
        if (this.mounted) {
            throw new Error('Component is already mounted.');
        }
        const element = this.render();
        container.appendChild(element);
        this.element = element;
        this.mounted = true;
    }
    update() {
        if (!this.mounted || this.element === null) {
            throw new Error('Component must be mounted before updating.');
        }
        const newElement = this.render();
        this.element.replaceWith(newElement);
        this.element = newElement;
    }
    unmount() {
        if (!this.mounted || this.element === null) {
            return;
        }
        this.element.remove();
        this.element = null;
        this.mounted = false;
    }
}
