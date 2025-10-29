<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-gray-100 p-4 md:p-6">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-white mb-1">
              <slot name="title">
                {{ title }}
              </slot>
            </h1>
            <p v-if="subtitle" class="text-blue-200 text-sm md:text-base">
              <slot name="subtitle">
                {{ subtitle }}
              </slot>
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <!-- User profile/notifications can go here -->
            <button class="p-2 rounded-full hover:bg-blue-800 transition-colors">
              <span class="text-xl">🔔</span>
            </button>
            <div class="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              {{ userInitials }}
            </div>
          </div>
        </div>
      </header>
      
      <!-- Main Content -->
      <main class="space-y-8">
        <slot></slot>
      </main>
      
      <!-- Footer -->
      <footer class="mt-12 pt-6 border-t border-blue-800 text-center text-sm text-blue-300">
        <p>© {{ new Date().getFullYear() }} Sistema de Gestión de Tareas. Todos los derechos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const props = defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  subtitle: {
    type: String,
    default: ''
  }
});

// Get user initials for the avatar
const userInitials = computed(() => {
  const user = usePage().props.auth.user;
  if (!user || !user.name) return 'U';
  return user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});
</script>
