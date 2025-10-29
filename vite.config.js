import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ command, mode }) => ({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '~': path.resolve(__dirname, './resources'),
            'ziggy-js': path.resolve('vendor/tightenco/ziggy/dist'),
        },
    },
    
    optimizeDeps: {
        include: ['ziggy-js'],
    },
    
    server: {
        hmr: {
            host: 'localhost',
        },
    },
    
    build: {
        sourcemap: true,
    },
}));

        host: '0.0.0.0',
        port: 5173, // Default Vite port
        strictPort: true,
        hmr: {
            host: 'localhost',
            protocol: 'ws',
        },
        watch: {
            usePolling: true,
        },
    },
    
    optimizeDeps: {
        include: [
            '@inertiajs/vue3',
            'vue',
            'ziggy-js',
            'ziggy-vue',
            'axios'
        ],
        exclude: ['fsevents'],
        esbuildOptions: {
            target: 'esnext',
            // Ignore .node files (fsevents)
            plugins: [{
                name: 'ignore-node-files',
                setup(build) {
                    build.onResolve({ filter: /\.node$/ }, () => ({ external: true }));
                },
            }],
        },
    },
    
    build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': [
                        'vue',
                        '@inertiajs/vue3',
                        'ziggy-js',
                    ],
                },
            },
        },
    },
}));
