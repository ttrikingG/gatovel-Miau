import type {
    ASTNode,
    ComponentNode,
    ElementNode,
    TextNode,
    ExpressionNode,
    AttributeNode
} from '../ast/AST.js';

import type {
    RuntimeNode,
    CreateComponentNode,
    CreateElementNode,
    CreateTextNode,
    CreateExpressionNode,
    RuntimeAttributeNode
} from './RuntimeAST.js';

export class Transformer {
    public transform(
        nodes: ASTNode[]
    ): RuntimeNode[] {
        return nodes.map(
            (node) => this.transformNode(node)
        );
    }

    private transformNode(
        node: ASTNode
    ): RuntimeNode {
        switch (node.type) {
            case 'element':
                return this.transformElement(node);

            case 'component':
                return this.transformComponent(node);

            case 'text':
                return this.transformText(node);

            case 'expression':
                return this.transformExpression(node);
        }
    }

    private transformElement(
        node: ElementNode
    ): CreateElementNode {
        return {
            type: 'create-element',
            tag: node.tag,
            attributes:
                this.transformAttributes(
                    node.attributes
                ),
            children: node.children.map(
                (child) =>
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
            attributes:
                this.transformAttributes(
                    node.attributes
                ),
            children: node.children.map(
                (child) =>
                    this.transformNode(child)
            )
        };
    }

    private transformAttributes(
        attributes: AttributeNode[]
    ): RuntimeAttributeNode[] {
        return attributes.map(
            (attribute) => {
                if (
                    attribute.value === null
                ) {
                    return {
                        name: attribute.name,
                        value: null
                    };
                }

                return {
                    name: attribute.name,
                    value: {
                        type:
                            attribute.value.type,
                        value:
                            attribute.value.value
                    }
                };
            }
        );
    }

    private transformText(
        node: TextNode
    ): CreateTextNode {
        return {
            type: 'create-text',
            value: node.value
        };
    }

    private transformExpression(
        node: ExpressionNode
    ): CreateExpressionNode {
        return {
            type: 'create-expression',
            value: node.value
        };
    }
}