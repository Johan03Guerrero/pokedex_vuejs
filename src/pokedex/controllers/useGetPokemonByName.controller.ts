import { watch, type Ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { PokemonService } from "../services/pokemon.service";
import { usePokemon } from "@/core/controllers/usePokemonStore.controller";

export const useGetPokemonByName = (name: Ref<string>) => {
  const pokemonService = new PokemonService();
  const { favoritesList } = usePokemon();
  
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["pokemon", name.value],
    queryFn: async () => {
      const result = await pokemonService.getPokemonByName(name.value);
      return result;
    },
    enabled: !!name.value,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: Infinity,
  });

  watch(name, async () => {
    if (name.value) {
      await refetch();
    }
  });

  watch(favoritesList, async () => {
    if (name.value) {
      await refetch();
    }
  });

  return {
    pokemon: data,
    isError: error,
    isLoading: isLoading || isFetching,
  };
};
