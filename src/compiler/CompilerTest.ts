import { Compiler } from './Compiler.js';

const source = `
<div class="app">
    <Header />
    <h1>Olá Miau</h1>
</div>
`;

const compiler = new Compiler();

const output = compiler.compile(source);

console.log(output);