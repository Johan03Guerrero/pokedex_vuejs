import type { Router } from 'vue-router';
import { pokedexModule } from './routes';

export const Pokedex = {
  router: (router: Router) => {
    router.addRoute(pokedexModule);
  }
}; 