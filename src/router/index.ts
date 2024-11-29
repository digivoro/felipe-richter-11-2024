import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/IndexView.vue"),
    },
    {
      path: "/team",
      component: () => import("../views/TeamView.vue"),
    },
  ],
});

export default router;
