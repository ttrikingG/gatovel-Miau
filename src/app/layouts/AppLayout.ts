import { Component } from '../../nucleo/component/Component.js';
import { Header } from '../components/Header.js';

export class AppLayout extends Component {
    private content: Component | null = null;

    public setContent(content: Component): void {
        this.content = content;
    }

    protected render(): HTMLElement {
        const container = document.createElement('div');

        const header = new Header();

        header.mount(container);

        const main = document.createElement('main');

        if (this.content !== null) {
            this.content.mount(main);
        }

        container.appendChild(main);

        return container;
    }
}