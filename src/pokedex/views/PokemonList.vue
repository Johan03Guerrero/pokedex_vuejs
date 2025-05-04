<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { FontAwesomeIcon } from '@/plugins/fontawesome'
import PokemonItem from './components/PokemonItem.vue'
import Loader from '@/commons/components/Loader.vue'
import pokemonController from '../controllers/pokemon.controller'
import PokemonDetailModal from './components/PokemonDetailModal.vue'
import { usePokemon } from '@/core/controllers/usePokemonStore.controller'

const {
  searchQuery,
  isLoading,
  activeFilter,
  searchResults,
  searchedPokemon,
  handleSearch,
  handleToggleFavorite,
  goToHome,
  shareToMyFriends,
} = pokemonController()

const { favoritesList } = usePokemon()

const pokemonIsFavorite = computed(() => {
  if (!searchedPokemon.value) return false
  return favoritesList.value.includes(searchedPokemon.value.name)
})

const inputValue = ref('')
const isModalOpen = ref(false)
const selectedPokemon = ref('')

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    searchQuery.value = inputValue.value
  }
}

const handlePokemonDetails = (name: string) => {
  selectedPokemon.value = name
  handleSearch(name)
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

watch(searchedPokemon, (newPokemon) => {
  if (newPokemon && newPokemon.name === selectedPokemon.value) {
    isModalOpen.value = true
  }
})
</script>

<template>
  <div class="flex flex-col items-center bg-gray-100 min-h-screen">
    <div class="relative items-center mb-8 px-4 pt-8 w-full">
      <Input 
        id="search" 
        type="text" 
        placeholder="Search" 
        class="pl-10 w-full" 
        v-model="inputValue"
        @keyup="handleKeyUp"
      />
      <span class="top-8 absolute inset-y-0 flex justify-center items-center px-8 start-0">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-pokemon-gray" />
      </span>
    </div>
    <div class="flex-1 px-4 w-full">
      <div v-if="isLoading" class="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader />
      </div>
      <div v-else-if="searchResults.length === 0"
        class="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
        <h1 class="mb-4 font-bold text-[36px]">Uh-oh!</h1>
        <p class="mb-8 font-medium text-[20px]">You look lost on your journey!</p>
        <button class="bg-pokemon-accent px-6 py-3 rounded-full text-white cursor-pointer" @click="goToHome">
          Go back home
        </button>
      </div>
      <div v-else class="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        <PokemonItem 
          v-for="pokemon in searchResults" 
          :key="pokemon.name" 
          :name="pokemon.name"
          :is-favorite="pokemon.isFavorite" 
          @toggle-favorite="handleToggleFavorite" 
          @pokemon-details="handlePokemonDetails"
        />
      </div>
    </div>
    <div v-if="searchResults.length > 0"
      class="right-0 bottom-0 left-0 sticky flex gap-2 bg-white p-4 px-[25px] md:px-[291px] w-screen">
      <button class="flex flex-1 justify-center items-center gap-2 py-3 rounded-full text-white cursor-pointer"
        :class="activeFilter === 'all' ? 'bg-pokemon-accent' : 'bg-pokemon-light-gray'" @click="activeFilter = 'all'">
        <font-awesome-icon icon="fa-solid fa-list" />
        <span>All</span>
      </button>
      <button class="flex flex-1 justify-center items-center gap-2 py-3 rounded-full text-white cursor-pointer"
        :class="activeFilter === 'favorites' ? 'bg-pokemon-accent' : 'bg-pokemon-light-gray'"
        @click="activeFilter = 'favorites'">
        <font-awesome-icon icon="fa-solid fa-star" />
        <span>Favorites</span>
      </button>
    </div>
  </div>
  <PokemonDetailModal 
    v-if="searchedPokemon"
    :is-open="isModalOpen" 
    @close="closeModal"
    :pokemon="{
      name: searchedPokemon.name,
      image: searchedPokemon.image,
      weight: searchedPokemon.weight,
      height: searchedPokemon.height,
      types: searchedPokemon.types
    }"
    :is-favorite="pokemonIsFavorite"
    @toggle-favorite="handleToggleFavorite"
    @copy="shareToMyFriends"
  />
</template>
