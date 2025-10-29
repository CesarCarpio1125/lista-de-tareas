<template>
  <div 
    v-if="show"
    class="rounded-md p-4 mb-4"
    :class="alertClasses"
    role="alert"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <component 
          :is="iconComponent" 
          class="h-5 w-5" 
          :class="iconClasses" 
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 
          v-if="title" 
          class="text-sm font-medium"
          :class="titleClasses"
        >
          {{ title }}
        </h3>
        <div 
          class="text-sm mt-2"
          :class="messageClasses"
        >
          <p>
            <slot>{{ message }}</slot>
          </p>
        </div>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="closeButtonClasses"
            @click="$emit('close')"
          >
            <span class="sr-only">Cerrar</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  timeout: {
    type: Number,
    default: 0 // en milisegundos, 0 = no se cierra automáticamente
  }
});

const emit = defineEmits(['close']);

// Cerrar automáticamente después del tiempo especificado
if (props.timeout > 0) {
  setTimeout(() => {
    emit('close');
  }, props.timeout);
}

// Mapeo de tipos a colores y clases
typeConfigs = {
  success: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    title: 'text-green-800',
    icon: CheckCircleIcon,
    iconColor: 'text-green-400',
    closeButton: 'text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50'
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    title: 'text-red-800',
    icon: ExclamationCircleIcon,
    iconColor: 'text-red-400',
    closeButton: 'text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50'
  },
  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    title: 'text-yellow-800',
    icon: ExclamationTriangleIcon,
    iconColor: 'text-yellow-400',
    closeButton: 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50'
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    title: 'text-blue-800',
    icon: InformationCircleIcon,
    iconColor: 'text-blue-400',
    closeButton: 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50'
  }
};

const config = computed(() => typeConfigs[props.type] || typeConfigs.info);

const alertClasses = computed(() => [
  config.value.bg,
  props.dismissible ? 'pr-10' : ''
]);

const iconClasses = computed(() => [
  config.value.iconColor
]);

const titleClasses = computed(() => [
  config.value.title
]);

const messageClasses = computed(() => [
  config.value.text
]);

const closeButtonClasses = computed(() => [
  config.value.closeButton
]);

const iconComponent = computed(() => config.value.icon || XMarkIcon);
</script>
