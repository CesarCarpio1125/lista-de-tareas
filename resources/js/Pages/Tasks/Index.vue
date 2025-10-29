<template>
    <MainLayout title="Tareas Mágicas" :showBreadcrumb="true" :breadcrumbs="['Tareas Mágicas']">
        <template #header>
            <div class="w-full">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                        <div class="mb-4 md:mb-0">
                            <h1 class="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Mis Tareas Mágicas <span class="text-yellow-300">✨</span></h1>
                            <p class="text-indigo-100 text-sm md:text-base">Donde los sueños se convierten en tareas realizadas</p>
                        </div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            <div class="flex items-center space-x-2 text-sm bg-white/20 px-3 py-2 rounded-lg text-white">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                                <span>{{ tasks.length }} {{ tasks.length === 1 ? 'tarea' : 'tareas' }}</span>
                            </div>
                            <Link
                                href="/tasks/create"
                                class="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span>Nueva Tarea</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <!-- Filtros Mágicos -->
        <TaskFilters
            v-model:filter="filter"
            v-model:search="search"
            :filters="filters"
        />

        <!-- Mensajes flash -->
        <div v-if="$page.props.flash" class="mb-6">
            <div
                v-if="$page.props.flash.success"
                class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl relative"
                role="alert"
            >
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium">{{ $page.props.flash.success }}</p>
                    </div>
                </div>
            </div>
            <div
                v-if="$page.props.flash.error"
                class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl relative"
                role="alert"
            >
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium">{{ $page.props.flash.error }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Estadísticas -->
        <TaskStats :stats="stats" />

        <!-- Grid de Tareas -->
        <div v-if="filteredTasks.length > 0" class="w-full py-4 sm:py-6">
            <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    <TaskCard
                        v-for="task in filteredTasks"
                        :key="task.id"
                        :task="task"
                        class="h-full"
                        @toggle-complete="toggleTask"
                        @delete="deleteTask"
                    />
                </div>
            </div>
        </div>

        <!-- Estado vacío -->
        <TaskEmptyState
            v-else
            :search="search"
            :filter="filter"
        />
    </MainLayout>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import MainLayout from '@/Components/templates/MainLayout.vue';
import TaskCard from './views/TaskCard.vue';
import TaskFilters from './views/TaskFilters.vue';
import TaskEmptyState from './views/TaskEmptyState.vue';
import TaskStats from './views/TaskStats.vue';

// Props
const props = defineProps({
    tasks: {
        type: Array,
        default: () => []
    },
    message: {
        type: String,
        default: ''
    }
});

// State
const filter = ref('all');
const search = ref('');

// Computed
const filteredTasks = computed(() => {
    let result = [...props.tasks];

    // Aplicar filtros
    if (filter.value === 'pending') {
        result = result.filter(task => !task.completed);
    } else if (filter.value === 'completed') {
        result = result.filter(task => task.completed);
    } else if (filter.value === 'today') {
        const today = new Date().toISOString().split('T')[0];
        result = result.filter(task => task.due_date === today);
    } else if (filter.value === 'week') {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        result = result.filter(task => {
            const taskDate = new Date(task.due_date);
            return taskDate >= today && taskDate <= nextWeek;
        });
    } else if (filter.value === 'with_due_date') {
        result = result.filter(task => task.due_date);
    } else if (filter.value === 'without_due_date') {
        result = result.filter(task => !task.due_date);
    }

    // Aplicar búsqueda
    if (search.value) {
        const searchTerm = search.value.toLowerCase();
        result = result.filter(task =>
            task.title.toLowerCase().includes(searchTerm) ||
            (task.description && task.description.toLowerCase().includes(searchTerm)) ||
            (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
    }

    return result;
});

const stats = computed(() => {
    const total = props.tasks.length;
    const completed = props.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const today = new Date().toISOString().split('T')[0];
    const thisWeek = props.tasks.filter(task => {
        const taskDate = new Date(task.due_date);
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        return task.due_date >= today && task.due_date <= nextWeek.toISOString().split('T')[0];
    }).length;

    return {
        total,
        completed,
        pending,
        thisWeek,
        completedPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        pendingPercentage: total > 0 ? Math.round((pending / total) * 100) : 0,
        percentageChange: 12 // Este valor podría venir de alguna otra lógica
    };
});

const filters = [
    { label: 'Todas', value: 'all' },
    { label: 'Pendientes', value: 'pending' },
    { label: 'Completadas', value: 'completed' },
    { label: 'Hoy', value: 'today' },
    { label: 'Esta semana', value: 'week' },
    { label: 'Con fecha', value: 'with_due_date' },
    { label: 'Sin fecha', value: 'without_due_date' }
];

// Methods
const toggleTask = (task) => {
    // Implementa la lógica para alternar el estado de la tarea
    // Por ejemplo, podrías hacer una petición al servidor
    console.log('Toggle task:', task.id);
};

const deleteTask = (task) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        // Implementa la lógica para eliminar la tarea
        // Por ejemplo: this.$inertia.delete(route('tasks.destroy', task.id))
        console.log('Delete task:', task.id);
    }
};

// Función para obtener colores de etiquetas
const getTagColor = (tag) => {
    const colors = [
        'bg-blue-100 text-blue-800',
        'bg-purple-100 text-purple-800',
        'bg-pink-100 text-pink-800',
        'bg-red-100 text-red-800',
        'bg-orange-100 text-orange-800',
        'bg-yellow-100 text-yellow-800',
        'bg-green-100 text-green-800',
        'bg-teal-100 text-teal-800',
        'bg-cyan-100 text-cyan-800',
        'bg-indigo-100 text-indigo-800'
    ];

    const index = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
};
</script>
