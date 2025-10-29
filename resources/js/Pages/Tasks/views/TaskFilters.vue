<template>
  <div class="mb-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <!-- Filtros -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="$emit('update:filter', filter.value)"
          class="px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
          :class="{
            'bg-indigo-100 text-indigo-800': modelValue === filter.value,
            'bg-white text-gray-600 hover:bg-gray-100': modelValue !== filter.value
          }"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Buscador -->
      <div class="relative flex-1 max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          :value="modelSearch"
          @input="$emit('update:search', $event.target.value)"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Buscar tareas..."
        />
      </div>

      <!-- Botón de nueva tarea -->
      <Link
        :href="route('tasks.create')"
        class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-full text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nueva tarea
      </Link>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  modelSearch: {
    type: String,
    default: ''
  },
  filters: {
    type: Array,
    default: () => [
      { label: 'Todas', value: 'all' },
      { label: 'Pendientes', value: 'pending' },
      { label: 'Completadas', value: 'completed' },
      { label: 'Hoy', value: 'today' },
      { label: 'Esta semana', value: 'week' },
      { label: 'Con fecha', value: 'with_due_date' },
      { label: 'Sin fecha', value: 'without_due_date' }
    ]
  }
});

defineEmits(['update:filter', 'update:search']);
</script>
