export function loadGlobalStyles(): void {
    const style = document.createElement('style');

    style.textContent = `
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            min-height: 100%;
        }

        body {
            font-family:
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                sans-serif;

            line-height: 1.5;
        }

        a {
            color: inherit;
        }

        button,
        input,
        textarea,
        select {
            font: inherit;
        }
    `;

    document.head.appendChild(style);
}