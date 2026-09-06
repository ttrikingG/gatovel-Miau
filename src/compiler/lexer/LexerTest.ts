import { Lexer } from './Lexer.js';

const source = `
<div class="app">
    <Header />
    <h1>Olá Miau</h1>
</div>
`;

const lexer = new Lexer(source);

console.log(lexer.tokenize());