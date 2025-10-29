<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <Link :href="$page.url === '/' ? '#' : route('dashboard')" class="text-xl font-bold text-gray-900">
                {{ appName }}
              </Link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- Navigation Links -->
              <Link 
                v-if="$page.url !== '/tasks'"
                :href="route('tasks.index')" 
                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Tareas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="py-10">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Flash Messages -->
        <div v-if="$page.props.flash && $page.props.flash.message" class="mb-4">
          <div :class="{
            'bg-green-100 border-green-400 text-green-700': $page.props.flash.type === 'success',
            'bg-red-100 border-red-400 text-red-700': !$page.props.flash.type || $page.props.flash.type === 'error'
          }" class="border px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ $page.props.flash.message }}</span>
          </div>
        </div>

        <!-- Page Content -->
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage();
const appName = computed(() => document.title || 'Laravel');
</script>

<style scoped>
/* Add any custom styles here */
</style>
