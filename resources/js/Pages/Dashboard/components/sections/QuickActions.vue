<template>
  <div class="mb-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-white">Acciones rápidas</h2>
      <span class="text-blue-300 text-2xl">⚡</span>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <ActionCard
        title="Crear Tarea"
        description="Nueva tarea pendiente"
        icon="✏️"
        color="green"
        href="/tasks/create"
        class="h-full hover:transform hover:-translate-y-1 transition-transform duration-200"
      />
      
      <ActionCard
        title="Ver Tareas"
        description="Lista completa"
        icon="📋"
        color="blue"
        href="/tasks"
        class="h-full hover:transform hover:-translate-y-1 transition-transform duration-200"
      />
      
      <ActionCard
        title="Estadísticas"
        description="Ver análisis"
        icon="📊"
        color="purple"
        href="/analytics"
        class="h-full hover:transform hover:-translate-y-1 transition-transform duration-200"
      />
      
      <ActionCard
        title="Equipo"
        description="Ver miembros"
        icon="👥"
        color="indigo"
        href="/team"
        class="h-full hover:transform hover:-translate-y-1 transition-transform duration-200"
      />
      
      <ActionCard
        title="Configuración"
        description="Ajustes"
        icon="⚙️"
        color="yellow"
        href="/settings"
        class="h-full hover:transform hover:-translate-y-1 transition-transform duration-200"
      />
      
      <ActionCard
        title="Soporte"
        description="Ayuda y soporte"
        icon="❓"
        color="pink"
        href="/support"
        class="h-full hover:transform hover:-translate-y-1 transition-transform duration-200"
      />
    </div>
  </div>
</template>

<script setup>
import ActionCard from '../cards/ActionCard.vue';
</script>
