import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export class OutputWriter {
    public async write(
        outputPath: string,
        content: string
    ): Promise<void> {
        await mkdir(dirname(outputPath), {
            recursive: true
        });

        await writeFile(
            outputPath,
            content,
            'utf-8'
        );
    }
}