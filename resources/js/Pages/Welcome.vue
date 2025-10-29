<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
</script>

<template>
  <Head title="Welcome" />
  
  <div class="min-h-screen bg-gray-100">
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Welcome to the Application</h1>
        <p class="text-gray-600">Your application is up and running with Inertia.js and Vue 3!</p>
        
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-2">Available Routes:</h2>
          <ul class="list-disc pl-5 space-y-2">
            <li v-for="route in [
              { name: 'Tasks', path: '/tasks' },
            ]" :key="route.path" class="text-blue-600 hover:text-blue-800">
              <a :href="route.path" class="hover:underline">{{ route.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
