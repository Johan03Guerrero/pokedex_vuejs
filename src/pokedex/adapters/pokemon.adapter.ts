import type { Pokemon } from '../models/pokemon.entity'

interface PokemonApiResponse {
  name: string
  url: string
}

export function pokemonAdapter(pokemon: PokemonApiResponse, favorites: string[]): Pokemon {
  return {
    name: pokemon.name,
    url: pokemon.url,
    isFavorite: favorites.includes(pokemon.name)
  }
} 