export interface HttpRequestOptions {
    headers?: Record<string, string>;
    signal?: AbortSignal;
}

export class HttpError extends Error {
    public readonly status: number;
    public readonly statusText: string;

    public constructor(
        status: number,
        statusText: string,
        message: string
    ) {
        super(message);

        this.name = 'HttpError';
        this.status = status;
        this.statusText = statusText;
    }
}

export class Http {
    private readonly baseUrl: string;

    public constructor(baseUrl = '') {
        this.baseUrl = baseUrl.replace(/\/+$/, '');
    }

    public async get<T>(
        url: string,
        options: HttpRequestOptions = {}
    ): Promise<T> {
        return this.request<T>('GET', url, undefined, options);
    }

    public async post<TRequest, TResponse>(
        url: string,
        data: TRequest,
        options: HttpRequestOptions = {}
    ): Promise<TResponse> {
        return this.request<TResponse>(
            'POST',
            url,
            data,
            options
        );
    }

    public async put<TRequest, TResponse>(
        url: string,
        data: TRequest,
        options: HttpRequestOptions = {}
    ): Promise<TResponse> {
        return this.request<TResponse>(
            'PUT',
            url,
            data,
            options
        );
    }

    public async patch<TRequest, TResponse>(
        url: string,
        data: TRequest,
        options: HttpRequestOptions = {}
    ): Promise<TResponse> {
        return this.request<TResponse>(
            'PATCH',
            url,
            data,
            options
        );
    }

    public async delete<T>(
        url: string,
        options: HttpRequestOptions = {}
    ): Promise<T> {
        return this.request<T>('DELETE', url, undefined, options);
    }

    private async request<T>(
        method: string,
        url: string,
        data?: unknown,
        options: HttpRequestOptions = {}
    ): Promise<T> {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            ...options.headers
        };

        const requestOptions: RequestInit = {
            method,
            headers,
            signal: options.signal
        };

        if (data !== undefined) {
            headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(data);
        }

        const response = await fetch(
            this.buildUrl(url),
            requestOptions
        );

        if (!response.ok) {
            throw new HttpError(
                response.status,
                response.statusText,
                `HTTP request failed with status ${response.status}.`
            );
        }

        if (response.status === 204) {
            return undefined as T;
        }

        const contentType =
            response.headers.get('content-type') ?? '';

        if (contentType.includes('application/json')) {
            return await response.json() as T;
        }

        return await response.text() as T;
    }

    private buildUrl(url: string): string {
        if (!this.baseUrl) {
            return url;
        }

        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        return `${this.baseUrl}/${url.replace(/^\/+/, '')}`;
    }
}