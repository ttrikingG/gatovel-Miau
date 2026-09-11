import { Build } from '../build/Build.js';

const command =
    process.argv[2];

const inputPath =
    process.argv[3];

const outputPath =
    process.argv[4];

if (command !== 'build') {
    throw new Error(
        'Unknown command. Use: build <input> <output>.'
    );
}

if (!inputPath || !outputPath) {
    throw new Error(
        'Usage: build <input> <output>.'
    );
}

const build =
    new Build();

await build.run(
    inputPath,
    outputPath
);