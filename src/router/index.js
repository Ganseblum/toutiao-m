// 路由规则模块

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由规则
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/search', name: 'search', component: () => import('@/views/search/index.vue') },
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article/index.vue'), props: true },
  { path: '/user/profile', name: 'user-profile', component: () => import('@/views/user-info/index.vue') },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      { path: 'home', name: 'home', component: () => import('@/views/home') },
      { path: 'video', name: 'video', component: () => import('@/views/video') },
      { path: 'qa', name: 'qa', component: () => import('@/views/qa') },
      { path: 'my', name: 'my', component: () => import('@/views/my') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
