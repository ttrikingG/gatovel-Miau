import { Header } from '../components/Header.js';

export function MainLayout(
    content: HTMLElement
): HTMLElement {
    const layout = document.createElement('div');

    layout.className = 'main-layout';

    const header = Header();

    const main = document.createElement('main');

    main.className = 'main-layout-content';

    main.appendChild(content);

    layout.append(header, main);

    layout.style.minHeight = '100vh';

    main.style.maxWidth = '1200px';
    main.style.margin = '0 auto';
    main.style.padding = '2rem';

    return layout;
}