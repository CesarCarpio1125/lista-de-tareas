<template>
  <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-4 text-sm">
    <!-- Total de Tareas -->
    <div class="bg-white rounded-lg border border-gray-100 p-2 shadow-xs">
      <div class="flex items-center">
        <div class="mr-2 text-indigo-600">
          <span class="text-lg">📋</span>
        </div>
        <div>
          <div class="text-xs text-gray-500">Total</div>
          <div class="flex items-center">
            <span class="font-semibold">{{ stats.total }}</span>
            <span v-if="stats.percentageChange !== null" class="ml-1 text-green-600 text-xs">
              ({{ stats.percentageChange }}%)
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tareas Completadas -->
    <div class="bg-white rounded-lg border border-gray-100 p-2 shadow-xs">
      <div class="flex items-center">
        <div class="mr-2 text-green-600">
          <span class="text-lg">✅</span>
        </div>
        <div>
          <div class="text-xs text-gray-500">Completadas</div>
          <div class="flex items-center">
            <span class="font-semibold">{{ stats.completed }}</span>
            <span class="ml-1 text-gray-500 text-xs">
              ({{ stats.completedPercentage }}%)
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tareas Pendientes -->
    <div class="bg-white rounded-lg border border-gray-100 p-2 shadow-xs">
      <div class="flex items-center">
        <div class="mr-2 text-amber-600">
          <span class="text-lg">⏳</span>
        </div>
        <div>
          <div class="text-xs text-gray-500">Pendientes</div>
          <div class="flex items-center">
            <span class="font-semibold">{{ stats.pending }}</span>
            <span class="ml-1 text-gray-500 text-xs">
              ({{ stats.pendingPercentage }}%)
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tareas de esta semana -->
    <div class="bg-white rounded-lg border border-gray-100 p-2 shadow-xs">
      <div class="flex items-center">
        <div class="mr-2 text-blue-600">
          <span class="text-lg">📅</span>
        </div>
        <div>
          <div class="text-xs text-gray-500">Esta semana</div>
          <div class="font-semibold">{{ stats.thisWeek }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      completed: 0,
      pending: 0,
      thisWeek: 0,
      completedPercentage: 0,
      pendingPercentage: 0,
      percentageChange: null
    })
  }
});
</script>
