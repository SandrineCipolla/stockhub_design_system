import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'StockhubDesignSystem',
            fileName: (format) => `stockhub-design-system.${format}.js`,
            formats: ['es', 'umd'],
        },
        // Remove external to bundle Lit with the components
        // This ensures CSS-in-JS works properly
        rollupOptions: {
            output: {
                // Ensure all dependencies are bundled
                inlineDynamicImports: false,
            },
        },
    },
    plugins: [
        {
            name: 'copy-css-tokens',
            closeBundle() {
                // Copy design-tokens.css to dist/tokens/
                const distTokensDir = join(process.cwd(), 'dist', 'tokens');
                mkdirSync(distTokensDir, { recursive: true });
                copyFileSync(
                    join(process.cwd(), 'src', 'tokens', 'design-tokens.css'),
                    join(distTokensDir, 'design-tokens.css')
                );
            },
        },
    ],
});
