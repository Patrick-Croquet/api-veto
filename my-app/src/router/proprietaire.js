export default [
  {
    name: "ProprietaireList",
    path: "/proprietaires/",
    component: () => import("../components/proprietaire/List.vue"),
  },
  {
    name: "ProprietaireCreate",
    path: "/proprietaires/create",
    component: () => import("../components/proprietaire/Create.vue"),
  },
  {
    name: "ProprietaireUpdate",
    path: "/proprietaires/edit/:id",
    component: () => import("../components/proprietaire/Update.vue"),
  },
  {
    name: "ProprietaireShow",
    path: "/proprietaires/show/:id",
    component: () => import("../components/proprietaire/Show.vue"),
  },
];
