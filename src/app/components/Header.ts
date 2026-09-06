import { Component } from '../../nucleo/component/Component.js';

export class Header extends Component {
    protected render(): HTMLElement {
        const header = document.createElement('header');

        const title = document.createElement('h1');

        title.textContent = 'Miau Application';

        header.appendChild(title);

        return header;
    }
}