<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Navigation Bar -->
    <nav class="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg shadow-md">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Mi Aplicación</h1>
              <p class="text-xs text-gray-500">Gestión de Tareas</p>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="$page.url === '/' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z"></path>
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              href="/tasks"
              class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="$page.url.startsWith('/tasks') ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <span>Tareas</span>
            </Link>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button class="text-gray-500 hover:text-gray-700 p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Breadcrumb -->
    <div v-if="showBreadcrumb" class="bg-white/70 backdrop-blur-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-3">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" class="hover:text-gray-700 transition-colors">Inicio</Link>
              </li>
              <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
                <svg class="flex-shrink-0 h-4 w-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <span :class="index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-700 transition-colors'">
                  {{ crumb }}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="mb-6">
        <slot name="header"></slot>
      </div>
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
        <slot></slot>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white/70 backdrop-blur-sm border-t border-gray-100 mt-16">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex justify-center items-center space-x-2 mb-4">
            <div class="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span class="text-lg font-semibold text-gray-900">Mi Aplicación</span>
          </div>
          <p class="text-sm text-gray-500 mb-2">
            Sistema de gestión de tareas moderno y eficiente
          </p>
          <p class="text-xs text-gray-400">
            &copy; {{ new Date().getFullYear() }} Desarrollado con Inertia.js + Vue 3 + Laravel
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  showBreadcrumb: {
    type: Boolean,
    default: false
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
});
</script>
