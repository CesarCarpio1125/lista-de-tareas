<template>
    <button
        :type="type"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
        :disabled="disabled"
    >
        <slot>Button</slot>
    </button>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'button'
    },
    disabled: {
        type: Boolean,
        default: false
    }
});
</script>
