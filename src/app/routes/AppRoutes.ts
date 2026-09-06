import { Router } from '../../nucleo/router/Router.js';
import { AppLayout } from '../layouts/AppLayout.js';
import { Home } from '../pages/Home.js';

export class AppRoutes {
    public static register(): void {
        Router.add('/', () => {
            const layout = new AppLayout();
            const home = new Home();

            layout.setContent(home);

            layout.mount(document.body);
        });
    }
}