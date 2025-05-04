<script setup lang="ts">
import { FontAwesomeIcon } from '@/plugins/fontawesome'

const props = defineProps<{
  name: string;
  isFavorite: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-favorite', name: string): void;
  (e: 'pokemon-details', name: string): void;
}>();

const handleToggleFavorite = (e: Event) => {
  e.stopPropagation();
  emit('toggle-favorite', props.name);
};

const handlePokemonDetails = () => {
  emit('pokemon-details', props.name);
};
</script>

<template>
  <div 
    class="flex justify-between items-center bg-white shadow-sm hover:shadow-md p-4 rounded-lg transition-shadow cursor-pointer"
    @click="handlePokemonDetails"
  >
    <h3 class="font-bold text-pokemon-dark capitalize">{{ name }}</h3>
    <button 
      class="flex justify-center items-center bg-pokemon-lightest-gray rounded-full w-8 h-8 cursor-pointer"
      @click.stop="handleToggleFavorite"
    >
      <font-awesome-icon 
        icon="fa-solid fa-star" 
        class="text-xl"
        :class="isFavorite ? 'text-pokemon-yellow' : 'text-pokemon-light-gray'"
      />
    </button>
  </div>
</template>