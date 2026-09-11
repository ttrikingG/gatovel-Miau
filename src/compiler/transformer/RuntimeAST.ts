export type RuntimeNode =
    | CreateElementNode
    | CreateComponentNode
    | CreateTextNode
    | CreateExpressionNode;

export interface CreateElementNode {
    type: 'create-element';
    tag: string;
    attributes: RuntimeAttributeNode[];
    children: RuntimeNode[];
}

export interface CreateComponentNode {
    type: 'create-component';
    name: string;
    attributes: RuntimeAttributeNode[];
    children: RuntimeNode[];
}

export interface CreateTextNode {
    type: 'create-text';
    value: string;
}

export interface CreateExpressionNode {
    type: 'create-expression';
    value: string;
}

export interface RuntimeAttributeNode {
    name: string;
    value: RuntimeAttributeValue | null;
}

export type RuntimeAttributeValue =
    | StaticRuntimeAttributeValue
    | ExpressionRuntimeAttributeValue;

export interface StaticRuntimeAttributeValue {
    type: 'static';
    value: string;
}

export interface ExpressionRuntimeAttributeValue {
    type: 'expression';
    value: string;
}
