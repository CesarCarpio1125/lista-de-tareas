<template>
  <MainLayout>
    <!-- Hero Section with gradient background -->
    <div class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="bg-white/20 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
                <h1 class="text-2xl font-bold text-white">Crear Nueva Tarea</h1>
              </div>
              <Link
                href="/tasks"
                class="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-white/20"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <span class="text-sm font-medium">Volver al listado</span>
              </Link>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Info Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="bg-gradient-to-r from-blue-100 to-indigo-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800">Información de la Tarea</h3>
              </div>
              <p class="text-gray-600 text-sm leading-relaxed">
                Completa la información necesaria para crear una nueva tarea.
                Asegúrate de incluir un título descriptivo y marca si ya está completada.
              </p>
              <div class="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm text-green-700 font-medium">Tip: Usa títulos claros y específicos</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Panel -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-b border-gray-100">
                <h3 class="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Detalles de la Tarea</span>
                </h3>
              </div>
              <div class="p-6">
                <Alert
                  v-if="Object.keys($page.props.errors).length > 0"
                  type="error"
                  title="¡Error!"
                  :message="Object.values($page.props.errors).join(' ')"
                  class="mb-6 border-l-4 border-red-400 bg-red-50"
                />

                <TaskForm
                  :form="form"
                  :processing="form.processing"
                  @submitted="onSubmitted"
                  @cancel="onCancel"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import MainLayout from '@/Components/templates/MainLayout.vue';
import Alert from '@/Components/atoms/Alert.vue';
import TaskForm from '@/Components/molecules/TaskForm.vue';

const form = useForm({
  title: '',
  description: '',
  completed: false
});

const onSubmitted = () => {
  form.post('/tasks', {
    onSuccess: () => {
      form.reset();
    },
    preserveScroll: true
  });
};

const onCancel = () => {
  window.history.back();
};
</script>
