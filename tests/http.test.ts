import {
    afterEach,
    describe,
    expect,
    it,
    vi
} from 'vitest';

import {
    Http,
    HttpError
} from '../src/nucleo/http/Http.js';

describe('Http', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should perform a GET request', async () => {
        const response = new Response(
            JSON.stringify({
                message: 'Hello'
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(response)
        );

        const http = new Http(
            'https://api.example.com'
        );

        const result = await http.get<{
            message: string;
        }>('/hello');

        expect(result).toEqual({
            message: 'Hello'
        });

        expect(fetch).toHaveBeenCalledWith(
            'https://api.example.com/hello',
            expect.objectContaining({
                method: 'GET'
            })
        );
    });

    it('should perform a POST request', async () => {
        const response = new Response(
            JSON.stringify({
                id: 1
            }),
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(response)
        );

        const http = new Http(
            'https://api.example.com'
        );

        const result = await http.post<
            { name: string },
            { id: number }
        >(
            '/users',
            {
                name: 'Tom'
            }
        );

        expect(result).toEqual({
            id: 1
        });

        expect(fetch).toHaveBeenCalledWith(
            'https://api.example.com/users',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    name: 'Tom'
                })
            })
        );
    });

    it('should return text responses', async () => {
        const response = new Response(
            'Hello Miau',
            {
                status: 200,
                headers: {
                    'Content-Type': 'text/plain'
                }
            }
        );

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(response)
        );

        const http = new Http();

        const result = await http.get<string>(
            '/hello'
        );

        expect(result).toBe('Hello Miau');
    });

    it('should handle 204 responses', async () => {
        const response = new Response(null, {
            status: 204
        });

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(response)
        );

        const http = new Http();

        const result = await http.delete<void>(
            '/users/1'
        );

        expect(result).toBeUndefined();
    });

    it('should throw HttpError on failed requests', async () => {
        const response = new Response(
            JSON.stringify({
                error: 'Unauthorized'
            }),
            {
                status: 401,
                statusText: 'Unauthorized'
            }
        );

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(response)
        );

        const http = new Http();

        await expect(
            http.get('/private')
        ).rejects.toBeInstanceOf(HttpError);

        await expect(
            http.get('/private')
        ).rejects.toMatchObject({
            status: 401,
            statusText: 'Unauthorized'
        });
    });

    it('should keep absolute URLs unchanged', async () => {
        const response = new Response(
            JSON.stringify({
                success: true
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(response)
        );

        const http = new Http(
            'https://api.example.com'
        );

        await http.get(
            'https://other.example.com/data'
        );

        expect(fetch).toHaveBeenCalledWith(
            'https://other.example.com/data',
            expect.any(Object)
        );
    });
});