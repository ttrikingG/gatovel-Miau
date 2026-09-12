import {
    describe,
    expect,
    it
} from 'vitest';

import { Router } from '../src/nucleo/router/Router.js';
import { AppRoutes } from '../src/app/routes/AppRoutes.js';
import { Home } from '../src/app/pages/Home.js';

describe('Application', () => {
    it('should contain the Home route', () => {
        const homeRoute = AppRoutes.find(
            (route) => route.path === '/'
        );

        expect(homeRoute).toBeDefined();
        expect(homeRoute?.page).toBe(Home);
    });

    it('should render the Home page through the Router', () => {
        const outlet =
            document.createElement('div');

        const router = new Router(
            AppRoutes,
            {
                outlet
            }
        );

        router.navigate('/', false);

        expect(
            outlet.querySelector('h2')
                ?.textContent
        ).toBe('Olá, Tom');

        expect(
            outlet.querySelector(
                '.app-header'
            )
        ).not.toBeNull();

        expect(
            outlet.querySelector('button')
        ).not.toBeNull();
    });

    it('should render the 404 page for an unknown route', () => {
        const outlet =
            document.createElement('div');

        const router = new Router(
            AppRoutes,
            {
                outlet
            }
        );

        router.navigate(
            '/this-page-does-not-exist',
            false
        );

        expect(
            outlet.querySelector('h1')
                ?.textContent
        ).toBe('404');

        expect(
            outlet.textContent
        ).toContain('Page not found.');
    });
});