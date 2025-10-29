<template>
    <form @submit.prevent="submit" class="space-y-6">
        <div class="space-y-5">
            <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100">
                <Input
                    v-model="form.title"
                    label="Título de la Tarea"
                    placeholder="Ej: Comprar víveres, Llamar al cliente, Revisar informes..."
                    required
                    :error="form.errors?.title"
                    class="bg-white"
                />
            </div>

            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <label class="flex items-center space-x-3 cursor-pointer group mb-4">
                    <div class="relative">
                        <input
                            v-model="form.completed"
                            type="checkbox"
                            class="sr-only"
                        >
                        <div class="w-5 h-5 border-2 border-gray-300 rounded-md transition-all duration-200 group-hover:border-indigo-400"
                             :class="form.completed ? 'bg-indigo-500 border-indigo-500' : 'bg-white'">
                            <svg v-if="form.completed"
                                 class="w-3 h-3 text-white mt-0.5 ml-0.5"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm font-medium text-gray-700">¿Está completada?</span>
                        <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {{ form.completed ? 'Sí' : 'No' }}
                        </span>
                    </div>
                </label>
                
                <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de vencimiento
                    </label>
                    <input
                        v-model="form.due_date"
                        type="date"
                        :min="new Date().toISOString().split('T')[0]"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        :class="{ 'border-red-300': form.errors?.due_date }"
                    >
                    <p v-if="form.errors?.due_date" class="mt-1 text-sm text-red-600">
                        {{ form.errors.due_date }}
                    </p>
                </div>
            </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
                type="button"
                @click="$emit('cancel')"
                class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                :disabled="form.processing"
            >
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Cancelar
            </button>
            <button
                type="submit"
                :disabled="form.processing"
                class="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 border-0 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <svg v-if="form.processing" class="w-4 h-4 mr-2 animate-spin inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ form.processing ? 'Guardando...' : 'Guardar Tarea' }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useForm } from '@inertiajs/vue3';
import Input from '@/Components/atoms/Input.vue';

const props = defineProps({
    form: {
        type: Object,
        required: true
    },
    processing: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['submitted', 'cancel']);

const submit = () => {
    emit('submitted');
};
</script>
