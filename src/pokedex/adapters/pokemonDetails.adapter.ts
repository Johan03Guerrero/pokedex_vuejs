import type { PokemonDetails } from '../models/pokemonDetails.entity';

interface PokemonApiResponse {
  forms: Array<{ name: string }>;
  game_indices: { height: number };
  weight: number;
  types: Array<{ type: { name: string } }>;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
}

export const pokemonDetailsAdapter = (
  data: PokemonApiResponse,
  isFavorite: boolean
): PokemonDetails => {
  return {
    name: data.forms[0].name,
    height: data.game_indices.height.toString(),
    weight: data.weight.toString(),
    types: data.types.map((type) => type.type.name),
    isFavorite,
    image: data.sprites.other.home.front_default,
  };
}; 