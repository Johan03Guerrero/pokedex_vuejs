import {
  createRouter,
  createWebHistory,
} from "vue-router";
import { pokedexModule, ROUTE_NAMES } from "@/pokedex/routes";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    pokedexModule,
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: ROUTE_NAMES.WELCOME },
    },
  ],
});

export const registerModule = (module: {
  router?: (router: ReturnType<typeof createRouter>) => void;
}) => {
  if (module.router) {
    module.router(router);
  }
};

export const registerModules = (
  modules: Record<
    string,
    { router?: (router: ReturnType<typeof createRouter>) => void }
  >
) => {
  Object.keys(modules).forEach((moduleKey) => {
    const module = modules[moduleKey];
    registerModule(module);
  });
};

export default router;
