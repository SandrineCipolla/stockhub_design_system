import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'StockhubDesignSystem',
            fileName: (format) => `stockhub-design-system.${format}.js`,
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: ['lit'],
            output: {
                globals: {
                    lit: 'lit',
                },
            },
        },
    },
});
