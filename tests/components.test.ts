import {
    describe,
    expect,
    it,
    vi
} from 'vitest';

import { Button } from '../src/app/components/Button.js';
import { Header } from '../src/app/components/Header.js';
import { MainLayout } from '../src/app/layouts/MainLayout.js';
import { Home } from '../src/app/pages/Home.js';

describe('Components', () => {
    it('should create a Button', () => {
        const button = Button({
            label: 'Click me'
        });

        expect(button).toBeInstanceOf(
            HTMLButtonElement
        );

        expect(button.textContent).toBe(
            'Click me'
        );

        expect(button.className).toBe(
            'miau-button'
        );
    });

    it('should execute Button click handler', () => {
        const onClick = vi.fn();

        const button = Button({
            label: 'Click',
            onClick
        });

        button.click();

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should create a Header', () => {
        const header = Header();

        expect(header.tagName).toBe('HEADER');

        expect(
            header.querySelector('h1')
                ?.textContent
        ).toBe('Miau');

        expect(
            header.querySelector(
                'a[data-miau-link]'
            )
        ).not.toBeNull();
    });

    it('should create a MainLayout', () => {
        const content =
            document.createElement('section');

        content.textContent = 'Content';

        const layout = MainLayout(content);

        expect(
            layout.querySelector('header')
        ).not.toBeNull();

        expect(
            layout.querySelector('main')
        ).not.toBeNull();

        expect(
            layout.querySelector('main')
                ?.textContent
        ).toContain('Content');
    });

    it('should create the Home page', () => {
        const home = Home();

        expect(
            home.querySelector('h2')
                ?.textContent
        ).toBe('Olá, Tom');

        expect(
            home.querySelector('p')
        ).not.toBeNull();

        expect(
            home.querySelector('button')
        ).not.toBeNull();
    });
});