export class Events {
    public static on(
        element: HTMLElement,
        event: string,
        handler: EventListener
    ): void {
        element.addEventListener(event, handler);
    }

    public static off(
        element: HTMLElement,
        event: string,
        handler: EventListener
    ): void {
        element.removeEventListener(event, handler);
    }

    public static emit(
        element: HTMLElement,
        event: string
    ): void {
        element.dispatchEvent(new Event(event));
    }
}