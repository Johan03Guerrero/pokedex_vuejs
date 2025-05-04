export const pokemonEndpoints = Object.freeze({
  getPokemons: '/pokemon?limit=100000&offset=0/',
  getPokemonByName: (name: string) => `/pokemon/${name}`
}) 