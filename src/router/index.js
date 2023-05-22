// methods
import { createRouter, createWebHistory } from 'vue-router';
import { routerBeforeEach, routerAfterEach } from './guard';
import { defaultRoute } from './list';

const router = createRouter({
  history: createWebHistory(),
  routes: defaultRoute
});

routerBeforeEach(router);
routerAfterEach(router);

export default router;
