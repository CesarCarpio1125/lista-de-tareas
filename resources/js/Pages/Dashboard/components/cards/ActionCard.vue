<template>
  <component
    :is="href ? Link : 'div'"
    :href="href"
    :class="[
      cardStyles.base,
      cardStyles.hover,
      'group',
      disabled ? 'opacity-60 cursor-not-allowed' : '',
      colorClasses[color]?.hover
    ]"
    :disabled="disabled"
  >
    <div 
      :class="[
        'p-2.5 rounded-lg mr-3 transition-colors',
        colorClasses[color]?.bg,
        colorClasses[color]?.text,
        !disabled && colorClasses[color]?.hoverIcon
      ]"
    >
      <span class="text-lg">{{ icon }}</span>
    </div>
    <div>
      <p class="font-medium text-gray-800">{{ title }}</p>
      <p class="text-sm text-gray-500 mt-0.5">{{ description }}</p>
    </div>
  </component>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { defineProps, computed } from 'vue';
import designSystem from '@/DesignSystem';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '⚡'
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'gray'].includes(value)
  },
  href: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

const cardStyles = computed(() => designSystem.components.card);

const colorClasses = computed(() => ({
  blue: {
    bg: designSystem.colors.primary.bg,
    text: designSystem.colors.primary.text,
    hoverIcon: 'group-hover:bg-blue-100'
  },
  green: {
    bg: designSystem.colors.success.bg,
    text: designSystem.colors.success.text,
    hover: 'hover:border-green-200',
    hoverIcon: 'group-hover:bg-green-100'
  },
  red: {
    bg: designSystem.colors.danger.bg,
    text: designSystem.colors.danger.text,
    hover: 'hover:border-red-200',
    hoverIcon: 'group-hover:bg-red-100'
  },
  yellow: {
    bg: designSystem.colors.warning.bg,
    text: designSystem.colors.warning.text,
    hover: 'hover:border-yellow-200',
    hoverIcon: 'group-hover:bg-yellow-100'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    hover: 'hover:border-purple-200',
    hoverIcon: 'group-hover:bg-purple-100'
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    hover: 'hover:border-indigo-200',
    hoverIcon: 'group-hover:bg-indigo-100'
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    hover: 'hover:border-pink-200',
    hoverIcon: 'group-hover:bg-pink-100'
  },
  gray: {
    bg: designSystem.colors.gray[100],
    text: designSystem.colors.gray[700],
    hover: 'hover:border-gray-200',
    hoverIcon: 'group-hover:bg-gray-100'
  }
}));
