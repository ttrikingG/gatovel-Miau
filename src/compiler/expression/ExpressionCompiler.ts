export class ExpressionCompiler {
    public compile(
        expression: string
    ): string {
        const value =
            expression.trim();

        if (value.length === 0) {
            throw new Error(
                'Expression cannot be empty.'
            );
        }

        return this.compileExpression(value);
    }

    private compileExpression(
        expression: string
    ): string {
        let result = '';
        let position = 0;

        while (position < expression.length) {
            const character =
                expression[position];

            if (
                character === '"' ||
                character === "'"
            ) {
                const stringResult =
                    this.readString(
                        expression,
                        position
                    );

                result += stringResult.value;
                position = stringResult.position;

                continue;
            }

            const identifier =
                this.readIdentifier(
                    expression,
                    position
                );

            if (identifier !== null) {
                result +=
                    this.compileIdentifier(
                        identifier.value
                    );

                position = identifier.position;

                continue;
            }

            result += character;
            position++;
        }

        return result;
    }

    private readString(
        expression: string,
        start: number
    ): {
        value: string;
        position: number;
    } {
        const quote =
            expression[start];

        let position =
            start + 1;

        while (
            position < expression.length
        ) {
            if (
                expression[position] === '\\'
            ) {
                position += 2;
                continue;
            }

            if (
                expression[position] === quote
            ) {
                position++;

                break;
            }

            position++;
        }

        return {
            value: expression.slice(
                start,
                position
            ),
            position
        };
    }

    private readIdentifier(
        expression: string,
        start: number
    ): {
        value: string;
        position: number;
    } | null {
        const character =
            expression[start];

        if (
            !/[a-zA-Z_$]/.test(character)
        ) {
            return null;
        }

        let position =
            start + 1;

        while (
            position < expression.length &&
            /[a-zA-Z0-9_$]/.test(
                expression[position]
            )
        ) {
            position++;
        }

        let value =
            expression.slice(
                start,
                position
            );

        while (
            expression[position] === '.' &&
            /[a-zA-Z_$]/.test(
                expression[position + 1] ?? ''
            )
        ) {
            let end =
                position + 2;

            while (
                end < expression.length &&
                /[a-zA-Z0-9_$]/.test(
                    expression[end]
                )
            ) {
                end++;
            }

            value += expression.slice(
                position,
                end
            );

            position = end;
        }

        return {
            value,
            position
        };
    }

    private compileIdentifier(
        identifier: string
    ): string {
        if (
            this.isLiteral(identifier) ||
            this.isReservedWord(identifier)
        ) {
            return identifier;
        }

        if (
            identifier.startsWith(
                'AppLogic.'
            )
        ) {
            return identifier;
        }

        return `AppLogic.${identifier}`;
    }

    private isLiteral(
        value: string
    ): boolean {
        return (
            value === 'true' ||
            value === 'false' ||
            value === 'null' ||
            value === 'undefined'
        );
    }

    private isReservedWord(
        value: string
    ): boolean {
        const reservedWords = new Set([
            'this',
            'typeof',
            'instanceof',
            'new',
            'void',
            'delete',
            'in',
            'of',
            'await',
            'yield'
        ]);

        return reservedWords.has(value);
    }
}
