import { cp, rm } from 'node:fs/promises';
import { execSync } from 'node:child_process';

async function build() {
    console.log('Building Miau...');

    await rm('dist', {
        recursive: true,
        force: true
    });

    execSync('tsc', {
        stdio: 'inherit'
    });

    await cp('public', 'dist', {
        recursive: true
    });

    console.log('Build completed successfully.');
}

build().catch((error) => {
    console.error('Build failed.');
    console.error(error);
    process.exit(1);
});