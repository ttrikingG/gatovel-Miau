import type {
    ASTNode,
    ComponentNode,
    ElementNode,
    TextNode
} from '../ast/AST.js';

import type {
    RuntimeNode,
    CreateComponentNode,
    CreateElementNode,
    CreateTextNode
} from './RuntimeAST.js';

export class Transformer {
    public transform(nodes: ASTNode[]): RuntimeNode[] {
        return nodes.map((node) => this.transformNode(node));
    }

    private transformNode(node: ASTNode): RuntimeNode {
        switch (node.type) {
            case 'element':
                return this.transformElement(node);

            case 'component':
                return this.transformComponent(node);

            case 'text':
                return this.transformText(node);
        }
    }

    private transformElement(
        node: ElementNode
    ): CreateElementNode {
        return {
            type: 'create-element',
            tag: node.tag,
            attributes: node.attributes.map((attribute) => ({
                name: attribute.name,
                value: attribute.value
            })),
            children: node.children.map((child) =>
                this.transformNode(child)
            )
        };
    }

    private transformComponent(
        node: ComponentNode
    ): CreateComponentNode {
        return {
            type: 'create-component',
            name: node.name,
            attributes: node.attributes.map((attribute) => ({
                name: attribute.name,
                value: attribute.value
            })),
            children: node.children.map((child) =>
                this.transformNode(child)
            )
        };
    }

    private transformText(
        node: TextNode
    ): CreateTextNode {
        return {
            type: 'create-text',
            value: node.value
        };
    }
}