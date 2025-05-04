import { useQuery } from '@tanstack/vue-query'
import { PokemonService } from '../services/pokemon.service'

export const useGetPokemonList = () => {
  const pokemonService = new PokemonService()
  
  const query = useQuery({
    queryKey: ['pokemons'],
    queryFn: async () => await pokemonService.getPokemons(),
    refetchOnWindowFocus: false,
    retry: 0
  })

  return {
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    pokemons: query.data
  }
} 