<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{
  isOpen: boolean;
  teleportationTarget?: string;
  zIndex?: number;
  pokemon: {
    name: string;
    image: string;
    weight: string;
    height: string;
    types: string[];
  };
  isFavorite: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'toggle-favorite', name: string): void;
  (e: 'copy'): void;
}>();

const isBody = computed(() => Boolean(props.teleportationTarget) && props.teleportationTarget === "body");

const closeModal = () => {
  emit('close');
};

const handleToggleFavorite = () => {
  emit('toggle-favorite', props.pokemon.name);
};

const handleCopy = () => {
  emit('copy');
};
</script>

<template>
  <Teleport :to="props.teleportationTarget || 'body'" :disabled="!props.teleportationTarget">
    <Transition enter-active-class="" leave-active-class="">
      <div class="modal" :style="{
        zIndex: props.zIndex ? props.zIndex : 3,
        position: isBody ? 'fixed' : 'absolute',
      }" v-show="isOpen">
        <div class="bg-white mx-[30px] md:mx-[291px] rounded-lg w-full md:min-w-md">
          <div class="relative">
            <div class="absolute inset-0 bg-[url('@/assets/icons/fundPokemon.svg')] bg-cover bg-center rounded-t-lg"></div>
            <div class="relative flex justify-end items-center p-4">
              <button @click="closeModal" class="text-white hover:text-gray-200 cursor-pointer">
                <font-awesome-icon :icon="['fas', 'circle-xmark']" class="text-2xl" />
              </button>
            </div>
            <div class="relative flex justify-center items-center h-48">
              <img :src="pokemon.image" :alt="pokemon.name" class="w-40 h-40 object-contain" />
            </div>
          </div>

          <div class="space-y-4 mb-6 p-6">
            <div class="pb-2 border-gray-200 border-b">
              <div class="flex">
                <span class="mr-2 font-bold text-lg">Name:</span>
                <span class="font-medium text-lg capitalize">{{ pokemon.name }}</span>
              </div>
            </div>
            <div class="pb-2 border-gray-200 border-b">
              <div class="flex">
                <span class="mr-2 font-bold text-lg">Weight:</span>
                <span class="font-medium text-lg">{{ pokemon.weight }}</span>
              </div>
            </div>
            <div class="pb-2 border-gray-200 border-b">
              <div class="flex">
                <span class="mr-2 font-bold text-lg">Height:</span>
                <span class="font-medium text-lg">{{ pokemon.height }}</span>
              </div>
            </div>
            <div class="pb-2 border-gray-200 border-b">
              <div class="flex">
                <span class="mr-2 font-bold text-lg">Types:</span>
                <span class="font-medium text-lg capitalize">{{ pokemon.types.join(', ') }}</span>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center p-6">
            <button 
              @click="handleCopy"
              class="bg-pokemon-accent px-4 py-2 rounded-full text-white transition-colors hover:bg-pokemon-accent-dark cursor-pointer"
            >
              Share to my friends
            </button>
            <button 
              @click="handleToggleFavorite"
              class="flex justify-center items-center bg-pokemon-lightest-gray rounded-full w-8 h-8 cursor-pointer"
            >
              <font-awesome-icon 
                icon="fa-solid fa-star" 
                class="text-xl"
                :class="isFavorite ? 'text-pokemon-yellow' : 'text-pokemon-light-gray'"
              />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="postcss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
