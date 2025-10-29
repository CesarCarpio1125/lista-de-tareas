<template>
  <div class="w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-indigo-50 mb-6">
          <svg class="h-12 w-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">
          {{ search || filter !== 'all' ? 'No se encontraron tareas' : '¡No hay tareas aún!' }}
        </h3>
        <p class="text-gray-500 mb-6 max-w-md mx-auto">
          {{ search || filter !== 'all'
            ? 'Intenta ajustar tus filtros o términos de búsqueda.'
            : 'Es hora de crear tu primera tarea. ¡Comienza organizando tu día!'
          }}
        </p>
        <Link
          v-if="!search && filter === 'all'"
          :href="route('tasks.create')"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Crear primera tarea
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  search: {
    type: String,
    default: ''
  },
  filter: {
    type: String,
    default: 'all'
  }
});
</script>
