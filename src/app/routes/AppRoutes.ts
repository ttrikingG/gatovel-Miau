import type { Route } from '../../nucleo/router/Router.js';
import { Home } from '../pages/Home.js';

export const AppRoutes: Route[] = [
    {
        path: '/',
        page: Home
    }
];