import { describe, expect, it } from 'vitest';

import {
    interpolate,
    resolvePath,
    renderTemplate
} from '../src/nucleo/template/Template.js';

describe('Template', () => {
    it('should interpolate a simple value', () => {
        const result = interpolate(
            'Hello, ^^name^^!',
            {
                name: 'Tom'
            }
        );

        expect(result).toBe(
            'Hello, Tom!'
        );
    });

    it('should interpolate nested values', () => {
        const result = interpolate(
            'Hello, ^^user.name^^!',
            {
                user: {
                    name: 'Tom'
                }
            }
        );

        expect(result).toBe(
            'Hello, Tom!'
        );
    });

    it('should replace missing values with an empty string', () => {
        const result = interpolate(
            'Hello, ^^user.name^^!',
            {}
        );

        expect(result).toBe(
            'Hello, !'
        );
    });

    it('should resolve nested paths', () => {
        const result = resolvePath(
            {
                user: {
                    profile: {
                        name: 'Tom'
                    }
                }
            },
            'user.profile.name'
        );

        expect(result).toBe('Tom');
    });

    it('should return undefined for invalid paths', () => {
        const result = resolvePath(
            {
                user: {
                    name: 'Tom'
                }
            },
            'user.profile.name'
        );

        expect(result).toBeUndefined();
    });

    it('should render a template into an element', () => {
        const element =
            document.createElement('div');

        renderTemplate(
            element,
            '<h1>Olá, ^^user.name^^</h1>',
            {
                user: {
                    name: 'Tom'
                }
            }
        );

        expect(element.innerHTML).toBe(
            '<h1>Olá, Tom</h1>'
        );
    });

    it('should support multiple interpolations', () => {
        const result = interpolate(
            '^^user.name^^ - ^^user.role^^',
            {
                user: {
                    name: 'Tom',
                    role: 'Developer'
                }
            }
        );

        expect(result).toBe(
            'Tom - Developer'
        );
    });
});