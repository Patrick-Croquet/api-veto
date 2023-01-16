export default [
  {
    name: "AnimalList",
    path: "/animals/",
    component: () => import("../components/animal/List.vue"),
  },
  {
    name: "AnimalCreate",
    path: "/animals/create",
    component: () => import("../components/animal/Create.vue"),
  },
  {
    name: "AnimalUpdate",
    path: "/animals/edit/:id",
    component: () => import("../components/animal/Update.vue"),
  },
  {
    name: "AnimalShow",
    path: "/animals/show/:id",
    component: () => import("../components/animal/Show.vue"),
  },
];
