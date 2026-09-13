import { createElement } from '../../nucleo/dom/DOM.js';

export interface TableColumn<T> {
    key: keyof T;
    label: string;
}

export interface TableOptions<T extends Record<string, unknown>> {
    columns: TableColumn<T>[];
    data: T[];
}

export function Table<T extends Record<string, unknown>>(
    options: TableOptions<T>
): HTMLTableElement {
    const table = createElement('table', {
        className: 'miau-table'
    });

    const thead = createElement('thead');
    const headerRow = createElement('tr');

    for (const column of options.columns) {
        const header = createElement('th', {
            textContent: column.label
        });

        header.style.textAlign = 'left';
        header.style.padding = '0.75rem';

        headerRow.appendChild(header);
    }

    thead.appendChild(headerRow);

    const tbody = createElement('tbody');

    for (const item of options.data) {
        const row = createElement('tr');

        for (const column of options.columns) {
            const cell = createElement('td', {
                textContent: String(
                    item[column.key] ?? ''
                )
            });

            cell.style.padding = '0.75rem';

            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.append(
        thead,
        tbody
    );

    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    return table;
}