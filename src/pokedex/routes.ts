import type { RouteRecordRaw } from "vue-router";

export const ROUTE_NAMES = {
  WELCOME: "Welcome",
  POKEMON_LIST: "PokemonList",
  POKEMON_DETAILS: "PokemonDetails",
} as const;

export const ROUTE_PATHS = {
  WELCOME: "/",
  POKEMON_LIST: "/pokemon",
  POKEMON_DETAILS: "/pokemon/:id",
} as const;

export const pokedexModule: RouteRecordRaw = {
  path: "/",
  children: [
    {
      path: "",
      name: ROUTE_NAMES.WELCOME,
      component: () => import("@/pokedex/views/WelcomeView.vue"),
    },
    // {
    //   path: ROUTE_PATHS.POKEMON_LIST,
    //   name: ROUTE_NAMES.POKEMON_LIST,
    //   component: () => import("@/pokedex/views/PokemonListView.vue"),
    // },
    // {
    //   path: ROUTE_PATHS.POKEMON_DETAILS,
    //   name: ROUTE_NAMES.POKEMON_DETAILS,
    //   component: () => import("@/pokedex/views/PokemonDetailsView.vue"),
    // },
  ],
};
