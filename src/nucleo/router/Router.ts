import { clear } from '../dom/DOM.js';

export type Page = () => HTMLElement;

export interface Route {
    path: string;
    page: Page;
}

export interface RouterOptions {
    outlet: HTMLElement;
    notFound?: Page;
}

export class Router {
    private readonly routes: Route[];
    private readonly outlet: HTMLElement;
    private readonly notFound: Page;

    public constructor(
        routes: Route[],
        options: RouterOptions
    ) {
        this.routes = routes;
        this.outlet = options.outlet;
        this.notFound = options.notFound ?? this.defaultNotFound;
    }

    public start(): void {
        window.addEventListener(
            'popstate',
            this.handlePopState
        );

        document.addEventListener(
            'click',
            this.handleDocumentClick
        );

        this.navigate(
            window.location.pathname,
            false
        );
    }

    public navigate(
        path: string,
        pushState = true
    ): void {
        const normalizedPath =
            this.normalizePath(path);

        const route =
            this.findRoute(normalizedPath);

        if (pushState) {
            window.history.pushState(
                {},
                '',
                normalizedPath
            );
        }

        clear(this.outlet);

        const page = route
            ? route.page()
            : this.notFound();

        this.outlet.appendChild(page);
    }

    private readonly handlePopState = (): void => {
        this.navigate(
            window.location.pathname,
            false
        );
    };

    private readonly handleDocumentClick = (
        event: MouseEvent
    ): void => {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        const link =
            target.closest<HTMLAnchorElement>(
                'a[data-miau-link]'
            );

        if (!link) {
            return;
        }

        const href = link.getAttribute('href');

        if (!href || !href.startsWith('/')) {
            return;
        }

        event.preventDefault();

        this.navigate(href);
    };

    private findRoute(
        path: string
    ): Route | undefined {
        return this.routes.find(
            (route) =>
                this.normalizePath(route.path) === path
        );
    }

    private normalizePath(path: string): string {
        if (path === '/') {
            return '/';
        }

        return `/${path.replace(/^\/+|\/+$/g, '')}`;
    }

    private readonly defaultNotFound: Page = (): HTMLElement => {
        const page = document.createElement('main');

        const title = document.createElement('h1');
        title.textContent = '404';

        const message = document.createElement('p');
        message.textContent = 'Page not found.';

        page.append(title, message);

        return page;
    };
}

