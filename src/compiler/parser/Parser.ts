import type { Token } from '../lexer/Token.js';
import type {
    ASTNode,
    AttributeNode,
    ComponentNode,
    ElementNode,
    TextNode
} from '../ast/AST.js';

export class Parser {
    private position = 0;

    public constructor(
        private readonly tokens: Token[]
    ) {}

    public parse(): ASTNode[] {
        const nodes: ASTNode[] = [];

        while (!this.isAtEnd()) {
            if (this.check('text')) {
                nodes.push(this.parseText());
                continue;
            }

            if (this.check('tag-open')) {
                nodes.push(this.parseElement());
                continue;
            }

            this.position++;
        }

        return nodes;
    }

    private parseElement(): ElementNode | ComponentNode {
        this.consume('tag-open');

        const name = this.consume('tag-name').value;

        const attributes = this.parseAttributes();

        if (this.check('slash')) {
            this.consume('slash');
            this.consume('tag-close');

            return this.createNode(name, attributes, []);
        }

        this.consume('tag-close');

        const children = this.parseChildren(name);

        return this.createNode(name, attributes, children);
    }

    private parseChildren(parentName: string): ASTNode[] {
        const children: ASTNode[] = [];

        while (!this.isAtEnd()) {
            if (this.isClosingTag(parentName)) {
                this.consume('tag-open');
                this.consume('slash');
                this.consume('tag-name');
                this.consume('tag-close');

                break;
            }

            if (this.check('text')) {
                children.push(this.parseText());
                continue;
            }

            if (this.check('tag-open')) {
                children.push(this.parseElement());
                continue;
            }

            this.position++;
        }

        return children;
    }

    private parseAttributes(): AttributeNode[] {
        const attributes: AttributeNode[] = [];

        while (
            this.check('attribute-name')
        ) {
            const name = this.consume('attribute-name').value;

            let value: string | null = null;

            if (this.check('equals')) {
                this.consume('equals');

                value = this.consume('attribute-value').value;
            }

            attributes.push({
                name,
                value
            });
        }

        return attributes;
    }

    private parseText(): TextNode {
        return {
            type: 'text',
            value: this.consume('text').value
        };
    }

    private createNode(
        name: string,
        attributes: AttributeNode[],
        children: ASTNode[]
    ): ElementNode | ComponentNode {
        if (this.isComponentName(name)) {
            return {
                type: 'component',
                name,
                attributes,
                children
            };
        }

        return {
            type: 'element',
            tag: name,
            attributes,
            children
        };
    }

    private isComponentName(name: string): boolean {
        return /^[A-Z]/.test(name);
    }

    private isClosingTag(name: string): boolean {
        return (
            this.check('tag-open') &&
            this.checkNext('slash') &&
            this.checkNextNext('tag-name') &&
            this.tokens[this.position + 2]?.value === name
        );
    }

    private check(type: Token['type']): boolean {
        return this.tokens[this.position]?.type === type;
    }

    private checkNext(type: Token['type']): boolean {
        return this.tokens[this.position + 1]?.type === type;
    }

    private checkNextNext(type: Token['type']): boolean {
        return this.tokens[this.position + 2]?.type === type;
    }

    private consume(type: Token['type']): Token {
        const token = this.tokens[this.position];

        if (!token || token.type !== type) {
            throw new Error(
                `Expected token "${type}".`
            );
        }

        this.position++;

        return token;
    }

    private isAtEnd(): boolean {
        return this.check('eof');
    }
}