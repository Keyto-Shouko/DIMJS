import { KeepAlive } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import GameVue from "../views/GameVue.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Clicker',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: GameVue,
    }
  ]
})

export default router
