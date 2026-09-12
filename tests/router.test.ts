import {
    afterEach,
    describe,
    expect,
    it
} from 'vitest';

import {
    Router,
    type Route
} from '../src/nucleo/router/Router.js';

describe('Router', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        window.history.replaceState(
            {},
            '',
            '/'
        );
    });

    function createPage(
        text: string
    ): () => HTMLElement {
        return () => {
            const page =
                document.createElement('main');

            page.textContent = text;

            return page;
        };
    }

    it('should render the matching route', () => {
        const outlet =
            document.createElement('div');

        const routes: Route[] = [
            {
                path: '/',
                page: createPage('Home')
            },
            {
                path: '/about',
                page: createPage('About')
            }
        ];

        const router = new Router(
            routes,
            {
                outlet
            }
        );

        router.navigate('/about', false);

        expect(outlet.textContent).toBe(
            'About'
        );
    });

    it('should render the not found page', () => {
        const outlet =
            document.createElement('div');

        const notFound =
            createPage('Not Found');

        const router = new Router(
            [],
            {
                outlet,
                notFound
            }
        );

        router.navigate('/missing', false);

        expect(outlet.textContent).toBe(
            'Not Found'
        );
    });

    it('should update browser history', () => {
        const outlet =
            document.createElement('div');

        const router = new Router(
            [
                {
                    path: '/about',
                    page: createPage('About')
                }
            ],
            {
                outlet
            }
        );

        router.navigate('/about');

        expect(
            window.location.pathname
        ).toBe('/about');
    });

    it('should normalize route paths', () => {
        const outlet =
            document.createElement('div');

        const router = new Router(
            [
                {
                    path: '/about/',
                    page: createPage('About')
                }
            ],
            {
                outlet
            }
        );

        router.navigate(
            '///about///',
            false
        );

        expect(outlet.textContent).toBe(
            'About'
        );
    });
});