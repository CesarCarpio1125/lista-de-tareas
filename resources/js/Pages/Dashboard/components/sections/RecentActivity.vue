<template>
  <div class="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-lg">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-white">Actividad Reciente</h2>
      <div class="p-2 rounded-lg bg-blue-500/10">
        <span class="text-blue-300 text-2xl">📊</span>
      </div>
    </div>
    
    <div v-if="activities.length > 0" class="space-y-3">
      <div 
        v-for="(activity, index) in activities" 
        :key="index"
        class="flex items-start p-4 rounded-xl hover:bg-white/5 transition-all duration-200 border border-white/5 hover:border-white/10 group"
      >
        <div :class="['p-2.5 rounded-xl mr-4 transition-colors', activity.bgColor, activity.hoverBg]">
          <span class="text-xl">{{ activity.icon }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-white">{{ activity.title }}</p>
            <span class="text-xs text-blue-300/80">{{ activity.time }}</span>
          </div>
          <p class="text-sm text-blue-100/70 mt-1">{{ activity.description }}</p>
          <div v-if="activity.tags" class="flex flex-wrap gap-2 mt-2">
            <span 
              v-for="(tag, tagIndex) in activity.tags" 
              :key="tagIndex"
              class="text-xs px-2 py-0.5 rounded-full bg-white/5 text-blue-200/80 border border-white/5"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-10">
      <div class="mx-auto h-20 w-20 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
        <span class="text-4xl text-blue-300/50">📊</span>
      </div>
      <p class="text-blue-100/80 font-medium mb-1">No hay actividad reciente</p>
      <p class="text-sm text-blue-300/60">Las actividades aparecerán aquí cuando comiences a trabajar</p>
      
      <button 
        @click="loadSampleData"
        class="mt-6 inline-flex items-center text-sm text-blue-300 hover:text-white font-medium transition-colors group"
      >
        <span class="mr-2 group-hover:scale-110 transition-transform">👈</span>
        ¡Haz clic para ver un ejemplo!
      </button>
    </div>
    
    <div v-if="activities.length > 0" class="mt-6 pt-4 border-t border-white/5">
      <button class="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-blue-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
        Ver todo el historial
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Datos de ejemplo - en una aplicación real, estos vendrían de una API
const activities = ref([]);

const loadSampleData = () => {
  activities.value = [
    {
      title: 'Tarea completada',
      description: 'Revisar el informe trimestral de ventas',
      time: 'Hace 2 horas',
      icon: '✅',
      bgColor: 'bg-green-500/10 text-green-400',
      hoverBg: 'group-hover:bg-green-500/20',
      tags: ['Informes', 'Ventas']
    },
    {
      title: 'Nueva tarea',
      description: 'Preparar presentación para la reunión del equipo',
      time: 'Hoy',
      icon: '📝',
      bgColor: 'bg-blue-500/10 text-blue-400',
      hoverBg: 'group-hover:bg-blue-500/20',
      tags: ['Presentación', 'Reunión']
    },
    {
      title: 'Recordatorio',
      description: 'Reunión con el equipo de desarrollo a las 3:00 PM',
      time: 'En 1 hora',
      icon: '⏰',
      bgColor: 'bg-yellow-500/10 text-yellow-400',
      hoverBg: 'group-hover:bg-yellow-500/20',
      tags: ['Reunión', 'Equipo']
    },
    {
      title: 'Actualización',
      description: 'Se ha actualizado el dashboard con nuevas métricas',
      time: 'Ayer',
      icon: '🔄',
      bgColor: 'bg-purple-500/10 text-purple-400',
      hoverBg: 'group-hover:bg-purple-500/20',
      tags: ['Actualización', 'Dashboard']
    }
  ];
};

// Cargar datos de ejemplo después de 2 segundos (solo para demostración)
setTimeout(() => {
  // Descomenta la siguiente línea para cargar datos de ejemplo automáticamente
  // loadSampleData();
}, 2000);
</script>
