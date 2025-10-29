<template>
  <MainLayout title="Dashboard" :showBreadcrumb="false">
    <template #header>
      <div class="mb-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-1">¡Bienvenido de vuelta! 👋</h1>
        <p class="text-gray-600 text-sm md:text-base">Aquí tienes un resumen de tu actividad</p>
      </div>
    </template>

    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 mb-6 text-white shadow-md">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div class="mb-4 md:mb-0">
       
          <p class="text-blue-100 text-sm mb-4 md:mb-0">Sistema de gestión de tareas moderno y eficiente</p>
          <Link
            href="/tasks"
            class="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 text-sm rounded-lg transition-all duration-200 border border-white/20"
          >
            <span>📋</span>
            <span>Ver mis tareas</span>
          </Link>
        </div>
        <div class="bg-white/20 p-3 rounded-xl backdrop-blur-sm self-center">
          <span class="text-3xl">🚀</span>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Total Tasks -->
      <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.total || 0 }}</p>
          </div>
          <div class="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <span class="text-xl">📋</span>
          </div>
        </div>
        <div class="mt-3 pt-2 border-t border-gray-50 text-xs">
          <span class="text-green-500 font-medium">+12%</span>
          <span class="text-gray-400 ml-1">vs mes anterior</span>
        </div>
      </div>

      <!-- Completed Tasks -->
      <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Completadas</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.completed || 0 }}</p>
          </div>
          <div class="p-2.5 rounded-lg bg-green-50 text-green-600">
            <span class="text-xl">✅</span>
          </div>
        </div>
        <div class="mt-3 pt-2 border-t border-gray-50 text-xs">
          <span class="text-green-500 font-medium">
            {{ stats.total ? Math.round((stats.completed / stats.total) * 100) : 0 }}%
          </span>
          <span class="text-gray-400 ml-1">de completación</span>
        </div>
      </div>

      <!-- Pending Tasks -->
      <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Pendientes</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.pending || 0 }}</p>
          </div>
          <div class="p-2.5 rounded-lg bg-amber-50 text-amber-600">
            <span class="text-xl">⏳</span>
          </div>
        </div>
        <div class="mt-3 pt-2 border-t border-gray-50 text-xs">
          <span class="text-amber-500 font-medium">Por hacer</span>
          <span class="text-gray-400 ml-1">este mes</span>
        </div>
      </div>

      <!-- This Week -->
      <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Esta Semana</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.thisWeek || 0 }}</p>
          </div>
          <div class="p-2.5 rounded-lg bg-purple-50 text-purple-600">
            <span class="text-xl">📅</span>
          </div>
        </div>
        <div class="mt-3 pt-2 border-t border-gray-50 text-xs">
          <span class="text-purple-500 font-medium">Activas</span>
          <span class="text-gray-400 ml-1">recientemente</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Link
        href="/tasks/create"
        class="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
      >
        <div class="p-2.5 rounded-lg bg-green-50 text-green-600 mr-3 group-hover:bg-green-100 transition-colors">
          <span class="text-lg">➕</span>
        </div>
        <div>
          <p class="font-medium text-gray-800">Crear Tarea</p>
          <p class="text-sm text-gray-500 mt-0.5">Nueva tarea pendiente</p>
        </div>
      </Link>

      <Link
        href="/tasks"
        class="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
      >
        <div class="p-2.5 rounded-lg bg-blue-50 text-blue-600 mr-3 group-hover:bg-blue-100 transition-colors">
          <span class="text-lg">📋</span>
        </div>
        <div>
          <p class="font-medium text-gray-800">Ver Tareas</p>
          <p class="text-sm text-gray-500 mt-0.5">Lista completa</p>
        </div>
      </Link>

      <div class="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div class="p-2.5 rounded-lg bg-purple-50 text-purple-600 mr-3">
          <span class="text-lg">⚡</span>
        </div>
        <div>
          <p class="font-medium text-gray-800">Más acciones</p>
          <p class="text-sm text-gray-500 mt-0.5">Próximamente</p>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-semibold text-gray-800">Actividad Reciente</h3>
        <span class="text-gray-300">🕒</span>
      </div>
      <div class="text-center py-6">
        <div class="mx-auto h-10 w-10 text-3xl text-gray-200 mb-3">📊</div>
        <p class="text-gray-500 text-sm font-medium mb-1">No hay actividad reciente</p>
        <p class="text-xs text-gray-400">Las actividades aparecerán aquí cuando comiences a trabajar</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  message: {
    type: String,
    default: ''
  },
  stats: {
    type: Object,
    default: () => ({
      total: 0,
      completed: 0,
      pending: 0,
      thisWeek: 0
    })
  }
});
</script>
