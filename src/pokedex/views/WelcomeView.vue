<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ROUTE_PATHS } from '../routes';
import Button from '@/components/ui/button/Button.vue';

const router = useRouter();

const handleGetStarted = () => {
  router.push(ROUTE_PATHS.POKEMON_LIST);
};
</script>

<template>
  <div class="flex flex-col items-center bg-gray-100 pt-[70px]">
    <figure>
      <img src="@/assets/icons/pikachu.png" alt="Pokédex Logo" class="mb-[70px] w-[325px] h-[288px]">
    </figure>
    <h1 class="mb-[30px] font-bold text-[26px] text-pokemon-dark">Welcome to Pokédex</h1>
    <span class="mb-[50px] text-pokemon-gray text-lg text-center">
      The digital encyclopedia created by Professor Oak is
      an invaluable tool to Trainers in the Pokémon
      world.
    </span>
    <Button class="custom-button" @click="handleGetStarted"> Get Started </Button>
  </div>
</template>

<style scoped lang="postcss">
@import '@/assets/main.css';

.custom-button {
  @apply bg-pokemon-accent px-5 py-2 rounded-[60px] font-bold text-white text-lg cursor-pointer;
}
</style>
