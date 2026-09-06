import { Lexer } from '../lexer/Lexer.js';
import { Parser } from './Parser.js';

const source = `
<div class="app">
    <Header />
    <h1>Olá Miau</h1>
</div>
`;

const tokens = new Lexer(source).tokenize();

const ast = new Parser(tokens).parse();

console.dir(ast, { depth: null });