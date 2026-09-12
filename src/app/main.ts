import { Router } from '../nucleo/router/Router.js';
import { queryRequired } from '../nucleo/dom/DOM.js';
import { AppRoutes } from './routes/AppRoutes.js';
import { loadGlobalStyles } from './styles/global.js';

function bootstrap(): void {
    loadGlobalStyles();

    const outlet = queryRequired<HTMLElement>(
        '#app'
    );

    const router = new Router(
        AppRoutes,
        {
            outlet
        }
    );

    router.start();
}

if (document.readyState === 'loading') {
    document.addEventListener(
        'DOMContentLoaded',
        bootstrap,
        { once: true }
    );
} else {
    bootstrap();
}