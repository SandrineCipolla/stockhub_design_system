import { defineConfig } from 'vite';

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
});
