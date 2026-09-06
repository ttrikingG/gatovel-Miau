import { Lexer } from './lexer/Lexer.js';
import { Parser } from './parser/Parser.js';
import { Transformer } from './transformer/Transformer.js';
import { Generator } from './generator/Generator.js';

export class Compiler {
    public compile(source: string): string {
        const tokens = new Lexer(source).tokenize();

        const ast = new Parser(tokens).parse();

        const runtimeAst = new Transformer().transform(ast);

        return new Generator().generate(runtimeAst);
    }
}