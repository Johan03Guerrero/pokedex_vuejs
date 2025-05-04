import { defineStore } from "pinia";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    favorites: [] as string[],
  }),
  actions: {
    addFavorite(name: string) {
      if (!this.favorites.includes(name)) {
        this.favorites.push(name);
      }
    },
    removeFavorite(name: string) {
      const index = this.favorites.indexOf(name);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    },
  },
  getters: {
    favoritesList: (state) => state.favorites,
    isFavorite: (state) => (name: string) => state.favorites.includes(name),
  },
});
