import { Lexer } from '../../src/compiler/lexer/Lexer.js';

const source = `
<h1>Olá, ^^user.name^^!</h1>
`;

const tokens = new Lexer(source).tokenize();

console.log(tokens);

