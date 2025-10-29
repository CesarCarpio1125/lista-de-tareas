<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <Link href="/" class="text-xl font-bold text-indigo-600">
                Task Manager
              </Link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/tasks" 
                class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="$page.url.startsWith('/tasks') ? 'border-indigo-500' : 'border-transparent hover:border-gray-300'"
              >
                Tareas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>
