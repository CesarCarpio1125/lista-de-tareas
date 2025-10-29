<template>
  <div
    class="relative h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 group hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-50"
    :class="{
      'ring-1 ring-green-100': task.completed,
      'hover:border-indigo-100': !task.completed
    }"
  >
    <!-- Status indicator -->
    <div 
      class="absolute top-0 left-0 h-1 w-full"
      :class="{
        'bg-gradient-to-r from-green-400 to-emerald-400': task.completed,
        'bg-gradient-to-r from-indigo-400 to-blue-400': !task.completed
      }"
    ></div>
    
    <!-- Status Badge -->
    <div class="absolute top-4 right-4">
      <span 
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium leading-4 shadow-sm"
        :class="{
          'bg-green-50 text-green-700 ring-1 ring-green-600/20': task.completed,
          'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20': !task.completed
        }"
      >
        <span 
          class="h-1.5 w-1.5 rounded-full mr-1.5"
          :class="{
            'bg-green-500': task.completed,
            'bg-amber-400': !task.completed
          }"
        ></span>
        {{ task.completed ? 'Completada' : 'Pendiente' }}
      </span>
    </div>

    <!-- Card Content -->
    <div class="flex-1 p-4 sm:p-5">
      <div class="flex items-start justify-between">
        <div class="pr-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
            {{ task.title }}
          </h3>
          <p class="text-sm text-gray-500 mb-4 leading-relaxed">
            {{ task.description }}
          </p>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="task.tags && task.tags.length > 0" class="flex flex-wrap gap-2 mb-5">
        <span 
          v-for="(tag, index) in task.tags.slice(0, 3)" 
          :key="index"
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm"
          :class="getTagColor(tag) + ' bg-opacity-70 hover:bg-opacity-100 transition-colors duration-200'"
        >
          <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="getTagColor(tag).replace('text-', 'bg-').split(' ')[0]"></span>
          {{ tag }}
        </span>
        <span 
          v-if="task.tags.length > 3" 
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs text-gray-500 bg-gray-50"
        >
          +{{ task.tags.length - 3 }} más
        </span>
      </div>

      <!-- Meta Info -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center space-x-4 text-sm">
          <div class="flex items-center text-gray-500">
            <svg class="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="font-medium text-gray-600">{{ formatDate(task.due_date) }}</span>
          </div>
          <div v-if="task.priority" class="flex items-center text-gray-500">
            <svg class="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span class="font-medium text-gray-600">{{ task.priority }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="bg-gray-50 px-3 py-2 flex items-center justify-between border-t border-gray-100">
      <!-- Left side: Due date (mobile) -->
      <div class="text-xs font-medium md:hidden" :class="{
        'text-green-600': task.completed,
        'text-amber-500': !task.completed
      }">
        {{ formatDate(task.due_date, 'short') }}
      </div>
      
      <!-- Right side: Action buttons -->
      <div class="flex items-center space-x-1">
        <!-- Complete Button -->
        <button
          @click="toggleComplete(task)"
          class="p-1.5 rounded-md transition-all duration-200 transform hover:scale-110 active:scale-95"
          :class="{
            'bg-green-100 text-green-600 hover:bg-green-200': task.completed,
            'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-amber-500': !task.completed
          }"
          :title="task.completed ? 'Marcar como pendiente' : 'Marcar como completada'"
        >
          <svg v-if="task.completed" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 12h14" />
          </svg>
        </button>
        
        <!-- Edit Button -->
        <Link
          :href="route('tasks.edit', task.id)"
          class="p-1.5 rounded-md transition-all duration-200 transform hover:scale-110 active:scale-95 bg-blue-100 text-blue-600 hover:bg-blue-200"
          title="Editar tarea"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </Link>
        
        <!-- Delete Button -->
        <button
          @click="$inertia.delete(route('tasks.destroy', task.id))"
          class="p-1.5 rounded-md transition-all duration-200 transform hover:scale-110 active:scale-95 bg-red-100 text-red-500 hover:bg-red-200"
          title="Eliminar tarea"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { formatDate, getTagColor } from '@/Utils/dateUtils';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['toggleComplete']);

const toggleComplete = (task) => {
  emit('toggleComplete', task);
};
</script>
