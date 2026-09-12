export type StateListener<T> = (
    value: T
) => void;

export class State<T> {
    private value: T;
    private readonly listeners = new Set<StateListener<T>>();

    public constructor(initialValue: T) {
        this.value = initialValue;
    }

    public get(): T {
        return this.value;
    }

    public set(value: T): void {
        this.value = value;
        this.notify();
    }

    public update(
        updater: (currentValue: T) => T
    ): void {
        this.value = updater(this.value);
        this.notify();
    }

    public subscribe(
        listener: StateListener<T>
    ): () => void {
        this.listeners.add(listener);

        listener(this.value);

        return () => {
            this.listeners.delete(listener);
        };
    }

    private notify(): void {
        for (const listener of this.listeners) {
            listener(this.value);
        }
    }
}