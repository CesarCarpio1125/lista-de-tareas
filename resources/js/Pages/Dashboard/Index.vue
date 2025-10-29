<template>
  <DashboardLayout title="Dashboard" class="dark:bg-gray-900">
    <div class="space-y-8">
      <!-- Welcome Section -->
      <WelcomeSection :stats="{ 
        total: stats.total, 
        completed: stats.completed, 
        pending: stats.pending, 
        thisWeek: stats.thisWeek 
      }" />

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total"
          :value="stats.total || 0"
          icon="📋"
          color="blue"
          :trend="{ value: 12, label: 'vs mes anterior' }"
          class="h-full"
        />
        
        <StatCard 
          title="Completadas"
          :value="stats.completed || 0"
          icon="✅"
          color="green"
          :percentage="stats.total ? Math.round((stats.completed / stats.total) * 100) : 0"
          percentageLabel="de completación"
          class="h-full"
        />
        
        <StatCard 
          title="Pendientes"
          :value="stats.pending || 0"
          icon="⏳"
          color="yellow"
          :trend="{ value: 'Por hacer', label: 'este mes' }"
          class="h-full"
        />
        
        <StatCard 
          title="Esta Semana"
          :value="stats.thisWeek || 0"
          icon="📅"
          color="purple"
          :trend="{ value: 'Activas', label: 'recientemente' }"
          class="h-full"
        />
      </div>

      <!-- Main Content Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Quick Actions -->
          <QuickActions />
          
          <!-- Progress Summary -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors duration-300">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-white">Resumen de Progreso</h3>
              <span class="text-blue-300 text-2xl">📈</span>
            </div>
            
            <div class="space-y-6">
              <div v-for="i in 3" :key="i" class="animate-pulse">
                <div class="h-4 bg-white/10 rounded-full w-3/4 mb-2"></div>
                <div class="h-3 bg-white/10 rounded-full w-1/2"></div>
                <div class="mt-2 h-2 bg-white/5 rounded-full w-full">
                  <div class="h-full bg-blue-500/30 rounded-full" :style="{ width: `${Math.random() * 30 + 20}%` }"></div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-white/5">
              <button class="text-sm text-blue-300 hover:text-white font-medium transition-colors">
                Ver informe completo
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Recent Activity -->
          <RecentActivity />
          
          <!-- Quick Stats -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors duration-300">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-white">Estadísticas Rápidas</h3>
              <span class="text-blue-300 text-2xl">📊</span>
            </div>
            
            <div class="space-y-5">
              <div v-for="stat in quickStats" :key="stat.label" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="p-2 rounded-lg mr-3" :class="stat.bgColor">
                    <span class="text-lg">{{ stat.icon }}</span>
                  </div>
                  <div>
                    <p class="text-sm text-blue-200/80">{{ stat.label }}</p>
                    <p class="text-base font-medium text-white">{{ stat.value }}</p>
                  </div>
                </div>
                <span :class="['text-xs font-medium px-2 py-1 rounded-full', stat.trendClass]">
                  {{ stat.trend }}
                </span>
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-white/5">
              <button class="text-sm text-blue-300 hover:text-white font-medium transition-colors">
                Ver todas las estadísticas
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue';
import DashboardLayout from './components/layout/DashboardLayout.vue';
import WelcomeSection from './components/sections/WelcomeSection.vue';
import StatCard from './components/cards/StatCard.vue';
import QuickActions from './components/sections/QuickActions.vue';
import RecentActivity from './components/sections/RecentActivity.vue';

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

// Datos de ejemplo para estadísticas rápidas
const quickStats = ref([
  {
    label: 'Tiempo promedio',
    value: '12 min',
    icon: '⏱️',
    trend: '+2.5%',
    trendClass: 'bg-green-500/10 text-green-400',
    bgColor: 'bg-blue-500/10 text-blue-400'
  },
  {
    label: 'Eficiencia',
    value: '78%',
    icon: '⚡',
    trend: '+5.2%',
    trendClass: 'bg-green-500/10 text-green-400',
    bgColor: 'bg-yellow-500/10 text-yellow-400'
  },
  {
    label: 'Tareas atrasadas',
    value: '2',
    icon: '⚠️',
    trend: '-1',
    trendClass: 'bg-red-500/10 text-red-400',
    bgColor: 'bg-red-500/10 text-red-400'
  },
  {
    label: 'Productividad',
    value: 'Bueno',
    icon: '📊',
    trend: '↑ 12%',
    trendClass: 'bg-green-500/10 text-green-400',
    bgColor: 'bg-purple-500/10 text-purple-400'
  }
]);
</script>
