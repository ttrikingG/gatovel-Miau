export type RuntimeNode =
    | CreateElementNode
    | CreateComponentNode
    | CreateTextNode;

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

export interface RuntimeAttributeNode {
    name: string;
    value: string | null;
}