import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' assert {type: 'json'};

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main, // dist/index.js
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module, // dist/index.esm.js
            format: 'esm',
            sourcemap: true,
        },
    ],
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist',
            rootDir: 'src',
        }),
    ],
};
