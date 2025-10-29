<template>
  <div class="relative overflow-hidden rounded-2xl mb-8 border border-white/10 bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm">
    <!-- Decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-700/30 via-blue-900/30 to-indigo-900/30"></div>
      
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0yMCAxMGM1LjUyMyAwIDEwIDQuNDc3IDEwIDEwcy00LjQ3NyAxMC0xMCAxMHMtMTAtNC40NzctMTAtMTAgNC40NzctMTAgMTAtMTB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==');"></div>
      
      <!-- Animated dots -->
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-400 rounded-full opacity-10 animate-pulse" style="animation-delay: 0.5s;"></div>
      <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-400 rounded-full opacity-10 animate-pulse"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 p-8 md:p-10">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <!-- Text Content -->
        <div class="flex-1">
          <div class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 text-blue-200 border border-white/10 backdrop-blur-sm mb-6">
            <span class="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            Sistema activo • {{ currentDate }}
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            ¡Bienvenido de nuevo! 👋
          </h1>
          
          <p class="text-blue-100/80 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            Gestiona tus tareas de manera eficiente y mantén el control de tus proyectos en un solo lugar.
          </p>
          
          <div class="flex flex-wrap gap-4">
            <Link
              href="/tasks"
              class="inline-flex items-center justify-center space-x-2 bg-white text-blue-800 hover:bg-blue-50 font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span class="text-xl">📋</span>
              <span>Ver mis tareas</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              href="/tasks/create"
              class="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 border-2 border-white/20 hover:border-white/30 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              <span class="text-xl">✏️</span>
              <span>Nueva tarea</span>
            </Link>
          </div>
          
          <!-- Stats -->
          <div class="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-8">
            <div class="flex items-center">
              <div class="bg-blue-500/20 p-2.5 rounded-xl mr-3">
                <span class="text-blue-300 text-2xl">📊</span>
              </div>
              <div>
                <p class="text-sm text-blue-200/80">Total de tareas</p>
                <p class="text-xl font-bold text-white">{{ stats.total || 0 }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="bg-green-500/20 p-2.5 rounded-xl mr-3">
                <span class="text-green-300 text-2xl">✅</span>
              </div>
              <div>
                <p class="text-sm text-blue-200/80">Completadas</p>
                <p class="text-xl font-bold text-white">{{ stats.completed || 0 }} <span class="text-sm font-normal text-blue-300/80">({{ completionPercentage }}%)</span></p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Illustration -->
        <div class="hidden md:block relative">
          <div class="relative">
            <div class="absolute -inset-4 bg-white/10 rounded-2xl transform rotate-6"></div>
            <div class="relative bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div class="flex items-center justify-center w-48 h-48 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                <span class="text-6xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Stats Row -->
      <div class="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-white/10 mr-3">
            <span class="text-blue-200">📅</span>
          </div>
          <div>
            <div class="text-xs text-blue-100/80">Hoy es</div>
            <div class="text-white font-medium">{{ currentDate }}</div>
          </div>
        </div>
        
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-white/10 mr-3">
            <span class="text-green-200">✅</span>
          </div>
          <div>
            <div class="text-xs text-blue-100/80">Tareas completadas</div>
            <div class="text-white font-medium">{{ stats.completed || 0 }} de {{ stats.total || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mt-16"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 mb-10"></div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
  stats: {
    type: Object,
    default: () => ({
      total: 0,
      completed: 0
    })
  }
});

const currentDate = computed(() => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'America/Mexico_City' 
  };
  return new Date().toLocaleDateString('es-ES', options);
});

const completionPercentage = computed(() => {
  if (!props.stats.total) return 0;
  return Math.round((props.stats.completed / props.stats.total) * 100);
});
</script>
