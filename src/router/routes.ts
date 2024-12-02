import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/team",
    children: [
      {
        path: "/team/",
        name: "MyTeam",
        component: () => import("@/views/team/index.vue"),
      },
      {
        path: "/team/:id",
        name: "TeamDetails",
        component: () => import("@/views/team/Details.vue"),
        beforeEnter: (to, from, next) => {
          // TODO: Validate id param
          next();
        },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];
