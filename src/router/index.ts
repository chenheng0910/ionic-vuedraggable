import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/list',
    component: () => import('@/views/ProjectListPage.vue'),
  },
  {
    path: '/pumpkin',
    component: () => import('@/views/PumpkinTest.vue')
  },
  {
    path: '/ferrule',
    component: () => import('@/views/FerruleTest.vue')
  },
  {
    path: '/barbecue',
    component: () => import('@/views/BarbecueTest.vue')
  },
  {
    path: '/shopping',
    component: () => import('@/views/ShoppingTest.vue')
  },
  {
    path: '/rabbit',
    component: () => import('@/views/RabbitTest.vue')
  },
  {
    path: '/bird',
    component: () => import('@/views/BirdTest.vue')
  },
  {
    path: '/egg',
    component: () => import('@/views/EggTest.vue')
  },
  {
    path: '/bus',
    component: () => import('@/views/BusTest.vue')
  },
  {
    path: '/chair',
    component: () => import('@/views/ChairTest.vue')
  },
  {
    path: '/honey',
    component: () => import('@/views/HoneyTest.vue')
  },
  {
    path: '/bear',
    component: () => import('@/views/BearTest.vue')
  },
  {
    path: '/pig',
    component: () => import('@/views/PigHouseTest.vue')
  },
  {
    path: '/flower',
    component: () => import('@/views/FlowerTest.vue')
  },
  {
    path: '/money',
    component: () => import('@/views/MoneyPigTest.vue')
  },
  {
    path: '/resultPage',
    component: () => import('@/views/ResultPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
