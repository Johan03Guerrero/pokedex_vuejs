import { storeToRefs } from "pinia";
import { usePokemonStore } from "../store/pokemonStore";

export const usePokemon = () => {
  const pokemonStore = usePokemonStore();
  const { favoritesList, isFavorite } = storeToRefs(pokemonStore);

  const addFavorite = (name: string) => {
    pokemonStore.addFavorite(name);
  };

  const removeFavorite = (name: string) => {
    pokemonStore.removeFavorite(name);
  };

  return {
    favoritesList,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
};
