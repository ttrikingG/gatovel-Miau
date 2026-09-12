import { describe, expect, it } from 'vitest';
import {
    on,
    once,
    emit,
    listen
} from '../src/nucleo/events/Events.js';

describe('Events', () => {
    it('should listen to a DOM event', () => {
        const button = document.createElement('button');

        let clicked = false;

        on(button, 'click', () => {
            clicked = true;
        });

        button.click();

        expect(clicked).toBe(true);
    });

    it('should remove an event listener', () => {
        const button = document.createElement('button');

        let count = 0;

        const unsubscribe = on(
            button,
            'click',
            () => {
                count++;
            }
        );

        button.click();
        unsubscribe();
        button.click();

        expect(count).toBe(1);
    });

    it('should execute an event only once', () => {
        const button = document.createElement('button');

        let count = 0;

        once(button, 'click', () => {
            count++;
        });

        button.click();
        button.click();

        expect(count).toBe(1);
    });

    it('should emit a custom event', () => {
        const element = document.createElement('div');

        let receivedValue: unknown;

        listen(
            element,
            'test-event',
            (event) => {
                receivedValue = event.detail;
            }
        );

        emit(element, 'test-event', {
            message: 'Hello Miau'
        });

        expect(receivedValue).toEqual({
            message: 'Hello Miau'
        });
    });

    it('should remove a custom event listener', () => {
        const element = document.createElement('div');

        let count = 0;

        const unsubscribe = listen(
            element,
            'test-event',
            () => {
                count++;
            }
        );

        emit(element, 'test-event');
        unsubscribe();
        emit(element, 'test-event');

        expect(count).toBe(1);
    });
});