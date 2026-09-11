export type ASTNode =
    | ElementNode
    | ComponentNode
    | TextNode
    | ExpressionNode;

export interface ElementNode {
    type: 'element';
    tag: string;
    attributes: AttributeNode[];
    children: ASTNode[];
}

export interface ComponentNode {
    type: 'component';
    name: string;
    attributes: AttributeNode[];
    children: ASTNode[];
}

export interface TextNode {
    type: 'text';
    value: string;
}

export interface ExpressionNode {
    type: 'expression';
    value: string;
}

export interface AttributeNode {
    name: string;
    value: AttributeValue | null;
}

export type AttributeValue =
    | StaticAttributeValue
    | ExpressionAttributeValue;

export interface StaticAttributeValue {
    type: 'static';
    value: string;
}

export interface ExpressionAttributeValue {
    type: 'expression';
    value: string;
}