import axios from 'axios';

// Configuración global de Axios
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;

// Manejo de errores global
window.axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 419) {
            // Redirigir a login si no está autenticado
            const currentPath = window.location.pathname;
            if (!['/login', '/register'].includes(currentPath)) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Configuración global de Inertia
if (window.Ziggy) {
    window.route = (name, params, absolute) => {
        return window.Ziggy.url(name, params, absolute, window.Ziggy);
    };
}
