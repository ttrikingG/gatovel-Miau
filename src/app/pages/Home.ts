import { Button } from '../components/Button.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { interpolate } from '../../nucleo/template/Template.js';

export function Home(): HTMLElement {
    const content = document.createElement('section');

    content.className = 'home-page';

    const title = document.createElement('h2');

    title.innerHTML = interpolate(
        'Olá, ^^user.name^^',
        {
            user: {
                name: 'Tom'
            }
        }
    );

    const description = document.createElement('p');

    description.textContent =
        'Miau é um framework frontend pequeno, modular e simples para a Web.';

    const button = Button({
        label: 'Clique aqui',
        onClick: () => {
            window.alert('Miau funcionando!');
        }
    });

    content.append(
        title,
        description,
        button
    );

    return MainLayout(content);
}