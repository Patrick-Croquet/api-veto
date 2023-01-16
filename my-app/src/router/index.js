import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import proprietaireRoutes from './proprietaire'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
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
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
