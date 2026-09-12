import { describe, expect, it } from 'vitest';
import {
    createElement,
    append,
    clear,
    query,
    queryRequired,
    mount
} from '../src/nucleo/dom/DOM.js';

describe('DOM', () => {
    it('should create an element', () => {
        const element = createElement('div');

        expect(element).toBeInstanceOf(HTMLDivElement);
    });

    it('should create an element with options', () => {
        const element = createElement('button', {
            className: 'test-button',
            id: 'button',
            textContent: 'Click',
            attributes: {
                type: 'button'
            }
        });

        expect(element.className).toBe('test-button');
        expect(element.id).toBe('button');
        expect(element.textContent).toBe('Click');
        expect(element.getAttribute('type')).toBe('button');
    });

    it('should append children', () => {
        const parent = document.createElement('div');
        const child = document.createElement('span');

        append(parent, child);

        expect(parent.contains(child)).toBe(true);
    });

    it('should clear an element', () => {
        const parent = document.createElement('div');

        parent.innerHTML = '<span>Test</span>';

        clear(parent);

        expect(parent.children).toHaveLength(0);
    });

    it('should query an element', () => {
        document.body.innerHTML = `
            <div id="app"></div>
        `;

        const element = query<HTMLElement>('#app');

        expect(element).not.toBeNull();
        expect(element?.id).toBe('app');
    });

    it('should return a required element', () => {
        document.body.innerHTML = `
            <div id="app"></div>
        `;

        const element = queryRequired<HTMLElement>('#app');

        expect(element.id).toBe('app');
    });

    it('should throw when required element does not exist', () => {
        expect(() => {
            queryRequired<HTMLElement>('#missing');
        }).toThrow('Element not found: #missing');
    });

    it('should mount an element', () => {
        const container = document.createElement('div');
        const element = document.createElement('section');

        mount(element, container);

        expect(container.contains(element)).toBe(true);
    });
});