<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-blue-600">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-white">Editar Tarea</h2>
              <p class="mt-1 text-sm text-indigo-100">Actualiza los detalles de la tarea</p>
            </div>
            <Link
              :href="route('tasks.index')"
              class="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al listado
            </Link>
          </div>
        </div>

        <!-- Form -->
        <div class="p-6">
          <TaskForm
            :form="form"
            :processing="form.processing"
            @submit="submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import MainLayout from '@/Components/templates/MainLayout.vue';
import TaskForm from '@/Components/molecules/TaskForm.vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const form = useForm({
  _method: 'PUT',
  title: props.task.title,
  description: props.task.description || '',
  completed: props.task.completed || false,
  due_date: props.task.due_date || '',
});

const submit = () => {
  form.post(route('tasks.update', props.task.id), {
    onSuccess: () => {
      // El mensaje de éxito se manejará con el flash message del controlador
    },
    onError: () => {
      // Los errores se mostrarán automáticamente en el formulario
    }
  });
};
</script>

<style scoped>
/* Estilos específicos del componente de edición */
</style>
