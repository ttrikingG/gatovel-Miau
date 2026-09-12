import { createElement } from '../../nucleo/dom/DOM.js';

export function Header(): HTMLElement {
    const header = createElement('header', {
        className: 'app-header'
    });

    const container = createElement('div', {
        className: 'app-header-container'
    });

    const title = createElement('h1', {
        textContent: 'Miau'
    });

    const navigation = createElement('nav');

    const homeLink = createElement('a', {
        textContent: 'Home',
        attributes: {
            href: '/',
            'data-miau-link': ''
        }
    });

    navigation.appendChild(homeLink);
    container.append(title, navigation);
    header.appendChild(container);

    header.style.padding = '1rem';
    header.style.borderBottom = '1px solid #ddd';

    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'space-between';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';

    title.style.margin = '0';

    navigation.style.display = 'flex';
    navigation.style.gap = '1rem';

    return header;
}