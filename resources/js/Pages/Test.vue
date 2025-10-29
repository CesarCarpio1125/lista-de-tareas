<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Test Component</h1>
      <p class="text-gray-600 mb-4">If you can see this, Vue is working!</p>
      <div class="p-4 bg-blue-50 text-blue-700 rounded-lg">
        <p class="font-medium">Current Time:</p>
        <p class="text-2xl font-mono">{{ currentTime }}</p>
      </div>
      <div class="mt-6 p-4 bg-green-50 text-green-700 rounded-lg">
        <p>Stats from backend:</p>
        <pre class="mt-2 p-2 bg-white rounded text-sm overflow-auto">{{ JSON.stringify(stats, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentTime = ref(new Date().toLocaleTimeString());
const props = defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      completed: 0,
      pending: 0,
      thisWeek: 0
    })
  }
});

// Update time every second
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
  }, 1000);
});
</script>
