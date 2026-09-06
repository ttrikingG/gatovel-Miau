export class Http {
    public static async get<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        return this.request<T>(url, {
            ...options,
            method: 'GET'
        });
    }

    public static async post<T>(
        url: string,
        body?: unknown,
        options: RequestInit = {}
    ): Promise<T> {
        return this.request<T>(url, {
            ...options,
            method: 'POST',
            body: this.prepareBody(body, options.body)
        });
    }

    public static async put<T>(
        url: string,
        body?: unknown,
        options: RequestInit = {}
    ): Promise<T> {
        return this.request<T>(url, {
            ...options,
            method: 'PUT',
            body: this.prepareBody(body, options.body)
        });
    }

    public static async patch<T>(
        url: string,
        body?: unknown,
        options: RequestInit = {}
    ): Promise<T> {
        return this.request<T>(url, {
            ...options,
            method: 'PATCH',
            body: this.prepareBody(body, options.body)
        });
    }

    public static async delete<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        return this.request<T>(url, {
            ...options,
            method: 'DELETE'
        });
    }

    private static async request<T>(
        url: string,
        options: RequestInit
    ): Promise<T> {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(
                `HTTP request failed with status ${response.status}.`
            );
        }

        return response.json() as Promise<T>;
    }

    private static prepareBody(
        body: unknown,
        existingBody: BodyInit | null | undefined
    ): BodyInit | null | undefined {
        if (existingBody !== undefined) {
            return existingBody;
        }

        if (body === undefined) {
            return undefined;
        }

        return JSON.stringify(body);
    }
}