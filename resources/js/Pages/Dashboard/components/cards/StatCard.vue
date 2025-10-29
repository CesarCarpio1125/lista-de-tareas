<template>
  <div :class="[cardStyles.base, cardStyles.hover, cardStyles.padding, 'bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-200 rounded-xl p-6']">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-medium text-blue-300 uppercase tracking-wider mb-1">{{ title }}</p>
        <p class="text-2xl font-bold text-white">{{ value }}</p>
      </div>
      <div :class="`p-3 rounded-xl ${getColorClass('bg')} ${getColorClass('text')} bg-opacity-20`">
        <span class="text-2xl">{{ icon }}</span>
      </div>
    </div>
    <div v-if="trend || percentage !== null" class="mt-4 pt-3 border-t border-white/5 text-sm">
      <span v-if="trend" :class="`${getColorClass('trend')} font-medium flex items-center`">
        <span v-if="typeof trend.value === 'number' && trend.value > 0" class="mr-1">📈</span>
        <span v-else-if="typeof trend.value === 'number'" class="mr-1">📉</span>
        {{ trend.value }}{{ typeof trend.value === 'number' ? '%' : '' }}
      </span>
      <span v-else :class="`${getColorClass('trend')} font-medium`">
        {{ percentage }}%
      </span>
      <span v-if="trend?.label || percentageLabel" class="text-blue-300/80 ml-2">
        {{ trend?.label || percentageLabel }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import designSystem from '@/DesignSystem';

const cardStyles = computed(() => designSystem.components.card);

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  icon: {
    type: String,
    default: '📊'
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'gray'].includes(value)
  },
  trend: {
    type: [Object, null],
    default: null
  },
  percentage: {
    type: Number,
    default: null
  },
  percentageLabel: {
    type: String,
    default: ''
  }
});

// Get color classes with fallback
const getColorClass = (type) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-100',
      trend: 'text-blue-300'
    },
    green: {
      bg: 'bg-green-500',
      text: 'text-green-100',
      trend: 'text-green-300'
    },
    red: {
      bg: 'bg-red-500',
      text: 'text-red-100',
      trend: 'text-red-300'
    },
    yellow: {
      bg: 'bg-yellow-500',
      text: 'text-yellow-100',
      trend: 'text-yellow-300'
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-100',
      trend: 'text-purple-300'
    },
    indigo: {
      bg: 'bg-indigo-500',
      text: 'text-indigo-100',
      trend: 'text-indigo-300'
    },
    pink: {
      bg: 'bg-pink-500',
      text: 'text-pink-100',
      trend: 'text-pink-300'
    },
    gray: {
      bg: 'bg-gray-500',
      text: 'text-gray-100',
      trend: 'text-gray-300'
    }
  };
  
  const colors = colorMap[props.color] || colorMap.blue;
  return colors[type] || '';
};
</script>
