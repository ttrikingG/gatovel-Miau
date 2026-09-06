import type {
    RuntimeNode,
    CreateElementNode,
    CreateComponentNode,
    CreateTextNode
} from '../transformer/RuntimeAST.js';

interface GeneratedNode {
    code: string;
    variable: string;
}

export class Generator {
    private variableCounter = 0;

    public generate(nodes: RuntimeNode[]): string {
        return nodes
            .map((node) => this.generateNode(node).code)
            .join('\n');
    }

    private generateNode(node: RuntimeNode): GeneratedNode {
        switch (node.type) {
            case 'create-element':
                return this.generateElement(node);

            case 'create-component':
                return this.generateComponent(node);

            case 'create-text':
                return this.generateText(node);
        }
    }

    private generateElement(
        node: CreateElementNode
    ): GeneratedNode {
        const variable = this.createVariable(node.tag);

        const lines: string[] = [];

        lines.push(
            `const ${variable} = document.createElement('${node.tag}');`
        );

        for (const attribute of node.attributes) {
            if (attribute.value !== null) {
                lines.push(
                    `${variable}.setAttribute('${attribute.name}', '${this.escape(attribute.value)}');`
                );
            }
        }

        for (const child of node.children) {
            const generatedChild = this.generateNode(child);

            lines.push(generatedChild.code);

            lines.push(
                `${variable}.appendChild(${generatedChild.variable});`
            );
        }

        return {
            code: lines.join('\n'),
            variable
        };
    }

    private generateComponent(
        node: CreateComponentNode
    ): GeneratedNode {
        const componentVariable = this.createVariable(node.name);

        const elementVariable = this.createVariable(
            `${node.name}_element`
        );

        const lines: string[] = [];

        lines.push(
            `const ${componentVariable} = new ${node.name}();`
        );

        lines.push(
            `const ${elementVariable} = ${componentVariable}.renderElement();`
        );

        return {
            code: lines.join('\n'),
            variable: elementVariable
        };
    }

    private generateText(
        node: CreateTextNode
    ): GeneratedNode {
        const variable = this.createVariable('text');

        return {
            code:
                `const ${variable} = document.createTextNode('${this.escape(node.value)}');`,
            variable
        };
    }

    private createVariable(name: string): string {
        const normalized = name
            .replace(/[^a-zA-Z0-9_$]/g, '_')
            .toLowerCase();

        this.variableCounter++;

        return `miau_${normalized}_${this.variableCounter}`;
    }

    private escape(value: string): string {
        return value
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'");
    }
}