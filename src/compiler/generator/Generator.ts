import type {
    RuntimeNode,
    CreateElementNode,
    CreateComponentNode,
    CreateTextNode,
    CreateExpressionNode,
    RuntimeAttributeValue
} from '../transformer/RuntimeAST.js';

import { ExpressionCompiler } from '../expression/ExpressionCompiler.js';

interface GeneratedNode {
    code: string;
    variable: string;
}

export class Generator {
    private variableCounter = 0;

    private readonly expressionCompiler =
        new ExpressionCompiler();

    public generate(
        nodes: RuntimeNode[]
    ): string {
        const meaningfulNodes = nodes.filter(
            (node) =>
                node.type !== 'create-text' ||
                node.value.trim().length > 0
        );

        const generatedNodes = meaningfulNodes.map(
            (node) => this.generateNode(node)
        );

        const lines = generatedNodes.map(
            (node) => node.code
        );

        const rootNode = generatedNodes[0];

        if (rootNode) {
            lines.push(
                `document.body.appendChild(${rootNode.variable});`
            );
        }

        return lines.join('\n');
    }

    private generateNode(
        node: RuntimeNode
    ): GeneratedNode {
        switch (node.type) {
            case 'create-element':
                return this.generateElement(node);

            case 'create-component':
                return this.generateComponent(node);

            case 'create-text':
                return this.generateText(node);

            case 'create-expression':
                return this.generateExpression(node);
        }
    }

    private generateElement(
        node: CreateElementNode
    ): GeneratedNode {
        const variable =
            this.createVariable(node.tag);

        const lines: string[] = [];

        lines.push(
            `const ${variable} = document.createElement('${node.tag}');`
        );

        for (const attribute of node.attributes) {
            if (attribute.value === null) {
                continue;
            }

            if (this.isEvent(attribute.name)) {
                lines.push(
                    `${variable}.addEventListener('${this.eventName(attribute.name)}', ${this.generateEventHandler(attribute.value)});`
                );

                continue;
            }

            lines.push(
                this.generateElementAttribute(
                    variable,
                    attribute.name,
                    attribute.value
                )
            );
        }

        for (const child of node.children) {
            const generatedChild =
                this.generateNode(child);

            lines.push(
                generatedChild.code
            );

            lines.push(
                `${variable}.appendChild(${generatedChild.variable});`
            );
        }

        return {
            code: lines.join('\n'),
            variable
        };
    }

    private generateElementAttribute(
        variable: string,
        name: string,
        value: RuntimeAttributeValue
    ): string {
        if (value.type === 'static') {
            return (
                `${variable}.setAttribute(` +
                `${JSON.stringify(name)}, ` +
                `${JSON.stringify(value.value)}` +
                `);`
            );
        }

        return (
            `${variable}.setAttribute(` +
            `${JSON.stringify(name)}, ` +
            `String(${this.expressionCompiler.compile(value.value)})` +
            `);`
        );
    }

    private generateComponent(
        node: CreateComponentNode
    ): GeneratedNode {
        const componentVariable =
            this.createVariable(node.name);

        const elementVariable =
            this.createVariable(
                `${node.name}_element`
            );

        const lines: string[] = [];

        const props =
            this.generateProps(
                node.attributes
            );

        lines.push(
            `const ${componentVariable} = new ${node.name}(${props});`
        );

        lines.push(
            `const ${elementVariable} = ${componentVariable}.renderElement();`
        );

        return {
            code: lines.join('\n'),
            variable: elementVariable
        };
    }

    private generateProps(
        attributes: CreateComponentNode['attributes']
    ): string {
        if (attributes.length === 0) {
            return '{}';
        }

        const properties = attributes.map(
            (attribute) => {
                const name =
                    JSON.stringify(attribute.name);

                let value: string;

                if (attribute.value === null) {
                    value = 'undefined';
                } else if (
                    this.isEvent(attribute.name)
                ) {
                    value =
                        this.generateEventHandler(
                            attribute.value
                        );
                } else if (
                    attribute.value.type === 'static'
                ) {
                    value =
                        JSON.stringify(
                            attribute.value.value
                        );
                } else {
                    value =
                        this.expressionCompiler.compile(
                            attribute.value.value
                        );
                }

                return `${name}: ${value}`;
            }
        );

        return `{ ${properties.join(', ')} }`;
    }

    private generateText(
        node: CreateTextNode
    ): GeneratedNode {
        const variable =
            this.createVariable('text');

        return {
            code:
                `const ${variable} = document.createTextNode(${JSON.stringify(node.value)});`,
            variable
        };
    }

    private generateExpression(
        node: CreateExpressionNode
    ): GeneratedNode {
        const variable =
            this.createVariable('expression');

        return {
            code:
                `const ${variable} = document.createTextNode(String(${this.expressionCompiler.compile(node.value)}));`,
            variable
        };
    }

    private isEvent(
        attributeName: string
    ): boolean {
        return /^on[A-Z]/.test(attributeName);
    }

    private eventName(
        attributeName: string
    ): string {
        return attributeName
            .slice(2)
            .toLowerCase();
    }

    private generateEventHandler(
        value: RuntimeAttributeValue
    ): string {
        if (value.type === 'expression') {
            return this.expressionCompiler.compile(
                value.value
            );
        }

        return this.expressionCompiler.compile(
            value.value
        );
    }

    private createVariable(
        name: string
    ): string {
        const normalized = name
            .replace(
                /[^a-zA-Z0-9_$]/g,
                '_'
            )
            .toLowerCase();

        this.variableCounter++;

        return `miau_${normalized}_${this.variableCounter}`;
    }
}
