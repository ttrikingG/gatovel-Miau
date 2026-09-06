import { Component } from '../../nucleo/component/Component.js';

export class Home extends Component {
    protected render(): HTMLElement {
        const main = document.createElement('main');

        const title = document.createElement('h1');

        title.textContent = 'Home';

        main.appendChild(title);

        return main;
    }
}