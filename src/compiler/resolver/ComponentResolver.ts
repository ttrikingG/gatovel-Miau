import { access } from 'node:fs/promises';
import {
    dirname,
    resolve
} from 'node:path';

export class ComponentResolver {
    public async resolve(
        componentName: string,
        sourcePath: string
    ): Promise<string> {
        const sourceDirectory = dirname(
            resolve(sourcePath)
        );

        const componentPath = resolve(
            sourceDirectory,
            `${componentName}.ts`
        );

        await access(componentPath);

        return componentPath;
    }
}