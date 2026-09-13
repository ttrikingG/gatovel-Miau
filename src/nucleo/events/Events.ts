export type EventHandler<T extends Event = Event> = (
    event: T
) => void;

export function on<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: K,
    handler: EventHandler<HTMLElementEventMap[K]>
): () => void {
    const listener = handler as EventListener;

    element.addEventListener(event, listener);

    return () => {
        element.removeEventListener(event, listener);
    };
}

export function once<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: K,
    handler: EventHandler<HTMLElementEventMap[K]>
): () => void {
    const listener = handler as EventListener;

    element.addEventListener(
        event,
        listener,
        { once: true }
    );

    return () => {
        element.removeEventListener(
            event,
            listener
        );
    };
}

export function emit<T = unknown>(
    element: HTMLElement,
    name: string,
    detail?: T
): boolean {
    const event = new CustomEvent<T>(name, {
        detail,
        bubbles: true
    });

    return element.dispatchEvent(event);
}

export function listen<T = unknown>(
    element: HTMLElement,
    name: string,
    handler: (event: CustomEvent<T>) => void
): () => void {
    const listener = (event: Event): void => {
        handler(event as CustomEvent<T>);
    };

    element.addEventListener(
        name,
        listener
    );

    return () => {
        element.removeEventListener(
            name,
            listener
        );
    };
}