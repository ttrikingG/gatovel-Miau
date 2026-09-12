import { describe, expect, it } from 'vitest';
import { State } from '../src/nucleo/state/State.js';

describe('State', () => {
    it('should store the initial value', () => {
        const state = new State(10);

        expect(state.get()).toBe(10);
    });

    it('should update the value', () => {
        const state = new State(10);

        state.set(20);

        expect(state.get()).toBe(20);
    });

    it('should update the value using a function', () => {
        const state = new State(10);

        state.update((value) => value + 5);

        expect(state.get()).toBe(15);
    });

    it('should notify subscribers', () => {
        const state = new State(10);

        const values: number[] = [];

        state.subscribe((value) => {
            values.push(value);
        });

        state.set(20);
        state.set(30);

        expect(values).toEqual([
            10,
            20,
            30
        ]);
    });

    it('should unsubscribe a listener', () => {
        const state = new State(10);

        const values: number[] = [];

        const unsubscribe = state.subscribe(
            (value) => {
                values.push(value);
            }
        );

        state.set(20);

        unsubscribe();

        state.set(30);

        expect(values).toEqual([
            10,
            20
        ]);
    });
});