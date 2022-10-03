import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/itemmusic',
    name: 'ItemMusic',
    component: () => import('../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    beforeEnter: (to, from, next) => {
      if (
        store.state.isLogin ||
        store.state.token ||
        localStorage.getItem('token')
      ) {
        next()
      } else {
        router.push('/login')
      }
    },
    component: () => import('../views/InfoUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.path == '/login' || to.path == '/infoUser') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router
