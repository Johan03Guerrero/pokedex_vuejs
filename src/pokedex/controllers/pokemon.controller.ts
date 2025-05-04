import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ROUTE_PATHS } from "../routes";
import { useGetPokemonList } from "./useGetPokemonList.controller";
import { useGetPokemonByName } from "./useGetPokemonByName.controller";
import { usePokemon } from "@/core/controllers/usePokemonStore.controller";

export default function pokemonController() {
  const router = useRouter();
  const pokemonName = ref("");
  const { addFavorite, removeFavorite, favoritesList } = usePokemon();
  const {
    isLoading: isLoadingList,
    isError: isErrorList,
    pokemons,
  } = useGetPokemonList();

  const {
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    pokemon: searchedPokemon,
  } = useGetPokemonByName(pokemonName);

  const searchQuery = ref("");
  const activeFilter = ref<"all" | "favorites">("all");

  const isLoading = computed(
    () => isLoadingList.value || isLoadingSearch.value
  );
  const isError = computed(() => isErrorList.value || isErrorSearch.value);

  const searchResults = computed(() => {
    if (!pokemons.value) return [];

    const filteredPokemons = pokemons.value.map((pokemon) => ({
      ...pokemon,
      isFavorite: favoritesList.value.includes(pokemon.name),
    }));

    const searchFiltered = filteredPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    if (activeFilter.value === "favorites") {
      return searchFiltered.filter((pokemon) => pokemon.isFavorite);
    }

    return searchFiltered;
  });

  const handleSearch = (name: string) => {
    pokemonName.value = name;
  };

  const handleToggleFavorite = (name: string) => {
    if (favoritesList.value.includes(name)) {
      removeFavorite(name);
    } else {
      addFavorite(name);
    }
  };

  const goToHome = () => {
    router.push(ROUTE_PATHS.WELCOME);
  };

  const shareToMyFriends = () => {
    if (!searchedPokemon.value) return;

    const pokemonInfo = [
      searchedPokemon.value.name,
      searchedPokemon.value.height,
      searchedPokemon.value.weight,
      searchedPokemon.value.types.join(", "),
      searchedPokemon.value.isFavorite ? "Favorite" : "Not Favorite",
    ].join(", ");

    navigator.clipboard.writeText(pokemonInfo);
  };

  return {
    searchQuery,
    isLoading,
    isError,
    activeFilter,
    searchResults,
    searchedPokemon,
    handleSearch,
    handleToggleFavorite,
    goToHome,
    shareToMyFriends,
  };
}
