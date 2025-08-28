import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:locale(tr|en)?',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('../pages/Home.vue') },
      { path: 'blog', name: 'blog-list', component: () => import('../pages/BlogList.vue') },
      { path: 'blog/:slug', name: 'blog-detail', component: () => import('../pages/BlogDetail.vue') },
      { path: 'projects', name: 'projects', component: () => import('../pages/Projects.vue') },
      { path: 'projects/:slug', name: 'project-detail', component: () => import('../pages/ProjectDetail.vue') },
      { path: 'about', name: 'about', component: () => import('../pages/About.vue') },
    ]
  },
  {
    path: '/:locale(tr|en)?/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('../pages/admin/Login.vue') },
      { path: '', name: 'dashboard', component: () => import('../pages/admin/Dashboard.vue') },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
