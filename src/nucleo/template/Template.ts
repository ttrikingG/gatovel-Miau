export type TemplateData = Record<string, unknown>;

export function interpolate(
    template: string,
    data: TemplateData
): string {
    return template.replace(
        /\^\^([a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*)\^\^/g,
        (_, path: string) => {
            const value = resolvePath(data, path);

            if (value === null || value === undefined) {
                return '';
            }

            return String(value);
        }
    );
}

export function resolvePath(
    data: unknown,
    path: string
): unknown {
    const parts = path.split('.');

    let current: unknown = data;

    for (const part of parts) {
        if (
            current === null ||
            current === undefined ||
            typeof current !== 'object'
        ) {
            return undefined;
        }

        current = (
            current as Record<string, unknown>
        )[part];
    }

    return current;
}

export function renderTemplate(
    element: HTMLElement,
    template: string,
    data: TemplateData
): void {
    element.innerHTML = interpolate(template, data);
}