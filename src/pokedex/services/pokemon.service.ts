import { HttpService } from "@/client/axiosService";
import { pokemonEndpoints } from "../utils/endpoints";
import { pokemonAdapter } from "../adapters/pokemon.adapter";
import { pokemonDetailsAdapter, type PokemonApiResponse } from "../adapters/pokemonDetails.adapter";
import { usePokemon } from "@/core/controllers/usePokemonStore.controller";
import type { Pokemon } from "../models/pokemon.entity";
import type { PokemonDetails } from "../models/pokemonDetails.entity";


export class PokemonService {
  private httpService: HttpService;

  constructor() {
    const baseURL = import.meta.env.VITE_POKEAPI_BASE_URL;
    this.httpService = new HttpService(baseURL);
  }

  async getPokemons(): Promise<Pokemon[]> {
    const { favoritesList } = usePokemon();
    const response = await this.httpService.get<{ results: Pokemon[] }>(
      pokemonEndpoints.getPokemons
    );
    return response.results.map((pokemon) =>
      pokemonAdapter(pokemon, favoritesList.value)
    );
  }

  async getPokemonByName(name: string): Promise<PokemonDetails> {
    const { favoritesList } = usePokemon();
    const response = await this.httpService.get<PokemonApiResponse>(
      pokemonEndpoints.getPokemonByName(name)
    );
    return pokemonDetailsAdapter(response, favoritesList.value.includes(name));
  }
}
