import { Lexer } from './lexer/Lexer.js';
import { Parser } from './parser/Parser.js';
import { Transformer } from './transformer/Transformer.js';
import { Generator } from './generator/Generator.js';
import { ComponentResolver } from './resolver/ComponentResolver.js';

import {
    dirname,
    relative,
    resolve
} from 'node:path';

export class Compiler {
    private readonly resolver =
        new ComponentResolver();

    public async compile(
        source: string,
        sourcePath: string,
        outputPath: string
    ): Promise<string> {
        const tokens =
            new Lexer(source).tokenize();

        const ast =
            new Parser(tokens).parse();

        const runtimeAst =
            new Transformer().transform(ast);

        const imports =
            await this.resolveImports(
                runtimeAst,
                sourcePath,
                outputPath
            );

        const generatedCode =
            new Generator().generate(
                runtimeAst
            );

        return [
            ...imports,
            '',
            generatedCode
        ].join('\n');
    }

    private async resolveImports(
        nodes: ReturnType<
            Transformer['transform']
        >,
        sourcePath: string,
        outputPath: string
    ): Promise<string[]> {
        const componentNames =
            this.findComponents(nodes);

        const imports: string[] = [];

        for (const componentName of componentNames) {
            const componentPath =
                await this.resolver.resolve(
                    componentName,
                    sourcePath
                );

            const importPath =
                this.createImportPath(
                    componentPath,
                    sourcePath,
                    outputPath
                );

            imports.push(
                `import { ${componentName} } from '${importPath}';`
            );
        }

        return imports;
    }

    private createImportPath(
        componentPath: string,
        sourcePath: string,
        outputPath: string
    ): string {
        const sourceRoot =
            resolve(sourcePath);

        const componentAbsolutePath =
            resolve(componentPath);

        const relativeComponentPath =
            relative(
                dirname(sourceRoot),
                componentAbsolutePath
            );

        const outputDirectory =
            dirname(resolve(outputPath));

        const sourceDirectory =
            dirname(sourceRoot);

        const componentOutputPath =
            resolve(
                outputDirectory,
                relative(
                    sourceDirectory,
                    componentAbsolutePath
                )
            ).replace(
                /\.ts$/,
                '.js'
            );

        let importPath =
            relative(
                outputDirectory,
                componentOutputPath
            ).replace(/\\/g, '/');

        if (!importPath.startsWith('.')) {
            importPath = `./${importPath}`;
        }

        return importPath;
    }

    private findComponents(
        nodes: ReturnType<
            Transformer['transform']
        >
    ): string[] {
        const names = new Set<string>();

        const visit = (
            node: ReturnType<
                Transformer['transform']
            >[number]
        ): void => {
            if (node.type === 'create-component') {
                names.add(node.name);

                for (const child of node.children) {
                    visit(child);
                }

                return;
            }

            if (node.type === 'create-element') {
                for (const child of node.children) {
                    visit(child);
                }
            }
        };

        for (const node of nodes) {
            visit(node);
        }

        return [...names];
    }
}