<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="task in tasks" :key="task.id" class="px-4 py-4 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ task.title }}
            </p>
            <p v-if="task.description" class="mt-1 text-sm text-gray-500 truncate">
              {{ task.description }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0">
            <span
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
            >
              {{ task.completed ? 'Completed' : 'Pending' }}
            </span>
          </div>
        </div>
      </li>
      <li v-if="tasks.length === 0" class="px-4 py-4 sm:px-6 text-center text-gray-500">
        No tasks found.
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>
