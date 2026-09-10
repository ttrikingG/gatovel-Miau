import { Lexer } from '../../src/compiler/lexer/Lexer.js';
import { Parser } from '../../src/compiler/parser/Parser.js';

const source = `
<h1>Olá, ^^user.name^^!</h1>
`;

const tokens =
    new Lexer(source).tokenize();

const ast =
    new Parser(tokens).parse();

console.log(
    JSON.stringify(
        ast,
        null,
        4
    )
);
