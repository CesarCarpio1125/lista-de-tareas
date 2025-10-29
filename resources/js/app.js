import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp, Link, Head } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggy-js';

// Debug
console.log('app.js loaded');

createInertiaApp({
    title: title => `${title} - ${import.meta.env.VITE_APP_NAME || 'Laravel'}`,

    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.vue', { eager: true });
        const page = pages[`./Pages/${name}.vue`] || pages[`./Pages/${name}/Index.vue`];

        if (!page) {
            console.error(`Page not found: ${name}`);
            throw new Error(`Page not found: ${name}`);
        }

        return page;
    },

    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });

        // Register global components
        app.component('Link', Link);
        app.component('Head', Head);

        // Use plugins
        app.use(plugin)
           .use(ZiggyVue, Ziggy);

        // Mount the app
        const vm = app.mount(el);

        console.log('Vue app mounted', vm);
        return vm;
    },

    progress: {
        color: '#4B5563',
        showSpinner: true,
    },
});
