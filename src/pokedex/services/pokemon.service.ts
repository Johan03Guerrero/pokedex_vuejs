import { HttpService } from "@/client/axiosService";
import { pokemonEndpoints } from "../utils/endpoints";
import { pokemonAdapter } from "../adapters/pokemon.adapter";
import { usePokemon } from "@/core/controllers/usePokemonStore.controller";
import type { Pokemon } from "../models/pokemon.entity";

interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export class PokemonService {
  private httpService: HttpService;

  constructor() {
    const baseURL = import.meta.env.VITE_POKEAPI_BASE_URL;
    this.httpService = new HttpService(baseURL);
  }

  async getPokemons(): Promise<Pokemon[]> {
    const { favoritesList } = usePokemon();
    const response = await this.httpService.get<PokemonApiResponse>(
      pokemonEndpoints.getPokemons
    );
    return response.results.map((pokemon) =>
      pokemonAdapter(pokemon, favoritesList.value)
    );
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    const { favoritesList } = usePokemon();
    const response = await this.httpService.get<{ name: string; url: string }>(
      pokemonEndpoints.getPokemonByName(name)
    );
    return pokemonAdapter(response, favoritesList.value);
  }
}
