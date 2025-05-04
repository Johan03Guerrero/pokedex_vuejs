import { watch, type Ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { PokemonService } from "../services/pokemon.service";

export const useGetPokemonByName = (name: Ref<string>) => {
  const pokemonService = new PokemonService();
  
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["pokemon", name.value],
    queryFn: async () => await pokemonService.getPokemonByName(name.value),
    enabled: !!name.value,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: Infinity,
  });

  watch(name, () => {
    if (name.value) {
      refetch();
    }
  });

  return {
    pokemon: data,
    isError: error,
    isLoading: isLoading || isFetching,
  };
};
