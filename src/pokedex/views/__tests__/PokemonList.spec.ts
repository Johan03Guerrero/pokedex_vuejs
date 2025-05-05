import { describe, vi, it, expect, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import { faker } from "@faker-js/faker";
import PokemonList from "../PokemonList.vue";

const mocks = vi.hoisted(() => ({
  getPokemons: vi.fn(() => {
    return Promise.resolve([
      {
        name: faker.person.firstName().toLowerCase(),
        url: faker.internet.url(),
        isFavorite: faker.datatype.boolean(),
      },
      {
        name: faker.person.firstName().toLowerCase(),
        url: faker.internet.url(),
        isFavorite: faker.datatype.boolean(),
      },
    ]);
  }),
  getPokemonByName: vi.fn(() => {
    return Promise.resolve({
      name: faker.person.firstName().toLowerCase(),
      height: faker.number.int({ min: 1, max: 10 }).toString(),
      weight: faker.number.int({ min: 1, max: 100 }).toString(),
      types: [faker.animal.type().toLowerCase()],
      isFavorite: faker.datatype.boolean(),
      image: faker.image.url(),
    });
  }),
}));

vi.mock("@/pokedex/services/pokemon.service", () => ({
  PokemonService: class {
    getPokemons() {
      return mocks.getPokemons();
    }
    getPokemonByName() {
      return mocks.getPokemonByName();
    }
  },
}));

describe("[views] Given PokemonList", () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: "/", component: {} }],
  });

  const renderConfig = {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            pokemon: { favorites: [] },
          },
        }),
        VueQueryPlugin,
        router,
      ],
    },
  };

  describe("When is mounted and there is pokemon data", () => {
    afterEach(() => {
      cleanup();
    });

    it("Then it should render the search input", async () => {
      const { findByPlaceholderText } = render(PokemonList, renderConfig);
      const searchInput = await findByPlaceholderText(/Search/i);
      expect(searchInput).toBeDefined();
    });

    it("Then it should render the All filter button", async () => {
      const { findByText } = render(PokemonList, renderConfig);
      const allButton = await findByText(/All/i);
      expect(allButton).toBeDefined();
    });

    it("Then it should render the Favorites filter button", async () => {
      const { findByText } = render(PokemonList, renderConfig);
      const favoritesButton = await findByText(/Favorites/i);
      expect(favoritesButton).toBeDefined();
    });
  });

  describe("When there are no search results", () => {
    afterEach(() => {
      cleanup();
    });

    it("Then it should render the error message", async () => {
      mocks.getPokemons.mockResolvedValueOnce([]);
      const { findByText } = render(PokemonList, renderConfig);
      const errorTitle = await findByText(/Uh-oh!/i);
      const errorMessage = await findByText(/You look lost on your journey!/i);
      expect(errorTitle).toBeDefined();
      expect(errorMessage).toBeDefined();
    });

    it("Then it should render the go back home button", async () => {
      mocks.getPokemons.mockResolvedValueOnce([]);
      const { findByText } = render(PokemonList, renderConfig);
      const homeButton = await findByText(/Go back home/i);
      expect(homeButton).toBeDefined();
    });
  });
}); 