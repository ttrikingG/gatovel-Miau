export type TokenType =
    | 'tag-open'
    | 'tag-close'
    | 'tag-name'
    | 'attribute-name'
    | 'attribute-value'
    | 'text'
    | 'slash'
    | 'equals'
    | 'eof';

export interface Token {
    type: TokenType;
    value: string;
}