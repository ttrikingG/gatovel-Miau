import { Lexer } from '../lexer/Lexer.js';
import { Parser } from '../parser/Parser.js';
import { Transformer } from '../transformer/Transformer.js';
import { Generator } from './Generator.js';

const source = `
<div class="app">
    <Header />
    <h1>Olá Miau</h1>
</div>
`;

const tokens = new Lexer(source).tokenize();

const ast = new Parser(tokens).parse();

const runtimeAst = new Transformer().transform(ast);

const output = new Generator().generate(runtimeAst);

console.log(output);