import { readFile } from 'node:fs/promises';

import { Compiler } from './Compiler.js';

const sourcePath =
    'tests/compiler/App.miau';

const outputPath =
    'dist-test/tests/compiler/App.js';

const source = await readFile(
    sourcePath,
    'utf-8'
);

const compiler =
    new Compiler();

const output =
    await compiler.compile(
        source,
        sourcePath,
        outputPath
    );

console.log(output);