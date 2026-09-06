type StateListener<T> = (value: T) => void;

export class State<T> {
    private value: T;
    private listeners = new Set<StateListener<T>>();

    public constructor(initialValue: T) {
        this.value = initialValue;
    }

    public get(): T {
        return this.value;
    }

    public set(value: T): void {
        this.value = value;

        for (const listener of this.listeners) {
            listener(this.value);
        }
    }

    public subscribe(
        listener: StateListener<T>
    ): () => void {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }
}