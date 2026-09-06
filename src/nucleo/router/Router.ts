type RouteHandler = () => void;

export class Router {
    private static routes = new Map<string, RouteHandler>();
    private static started = false;

    public static add(
        path: string,
        handler: RouteHandler
    ): void {
        if (this.routes.has(path)) {
            throw new Error(`Route already exists: ${path}`);
        }

        this.routes.set(path, handler);
    }

    public static start(): void {
        if (this.started) {
            return;
        }

        this.started = true;

        window.addEventListener('popstate', () => {
            this.resolve();
        });

        this.resolve();
    }

    public static navigate(path: string): void {
        if (!this.routes.has(path)) {
            throw new Error(`Route not found: ${path}`);
        }

        history.pushState({}, '', path);

        this.resolve();
    }

    public static current(): string {
        return window.location.pathname;
    }

    private static resolve(): void {
        const path = this.current();
        const handler = this.routes.get(path);

        if (!handler) {
            throw new Error(`Route not found: ${path}`);
        }

        handler();
    }
}