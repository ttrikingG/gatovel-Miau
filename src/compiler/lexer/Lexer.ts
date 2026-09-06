import type { Token } from './Token.js';

export class Lexer {
    private position = 0;
    private insideTag = false;

    public constructor(
        private readonly source: string
    ) {}

    public tokenize(): Token[] {
        const tokens: Token[] = [];

        while (this.position < this.source.length) {
            if (!this.insideTag) {
                this.readOutsideTag(tokens);
                continue;
            }

            this.readInsideTag(tokens);
        }

        tokens.push({
            type: 'eof',
            value: ''
        });

        return tokens;
    }

    private readOutsideTag(tokens: Token[]): void {
        if (this.source[this.position] === '<') {
            tokens.push({
                type: 'tag-open',
                value: '<'
            });

            this.position++;
            this.insideTag = true;

            return;
        }

        const start = this.position;

        while (
            this.position < this.source.length &&
            this.source[this.position] !== '<'
        ) {
            this.position++;
        }

        const value = this.source.slice(start, this.position);

        if (value.length > 0) {
            tokens.push({
                type: 'text',
                value
            });
        }
    }

    private readInsideTag(tokens: Token[]): void {
        const character = this.source[this.position];

        if (this.isWhitespace(character)) {
            this.position++;
            return;
        }

        if (character === '>') {
            tokens.push({
                type: 'tag-close',
                value: '>'
            });

            this.position++;
            this.insideTag = false;

            return;
        }

        if (character === '/') {
            tokens.push({
                type: 'slash',
                value: '/'
            });

            this.position++;

            return;
        }

        if (character === '=') {
            tokens.push({
                type: 'equals',
                value: '='
            });

            this.position++;

            return;
        }

        if (character === '"' || character === "'") {
            tokens.push(this.readAttributeValue(character));
            return;
        }

        if (this.isIdentifierStart(character)) {
            tokens.push(this.readIdentifier(tokens));
            return;
        }

        this.position++;
    }

    private readIdentifier(tokens: Token[]): Token {
        const start = this.position;

        while (
            this.position < this.source.length &&
            this.isIdentifierCharacter(this.source[this.position])
        ) {
            this.position++;
        }

        const value = this.source.slice(start, this.position);

        const previousToken = tokens[tokens.length - 1];

        if (
            previousToken?.type === 'tag-open' ||
            previousToken?.type === 'slash'
        ) {
            return {
                type: 'tag-name',
                value
            };
        }

        return {
            type: 'attribute-name',
            value
        };
    }

    private readAttributeValue(quote: string): Token {
        this.position++;

        const start = this.position;

        while (
            this.position < this.source.length &&
            this.source[this.position] !== quote
        ) {
            this.position++;
        }

        const value = this.source.slice(start, this.position);

        if (this.position < this.source.length) {
            this.position++;
        }

        return {
            type: 'attribute-value',
            value
        };
    }

    private isWhitespace(character: string): boolean {
        return /\s/.test(character);
    }

    private isIdentifierStart(character: string): boolean {
        return /[\p{L}_]/u.test(character);
    }

    private isIdentifierCharacter(character: string): boolean {
        return /[\p{L}\p{N}_:-]/u.test(character);
    }
}