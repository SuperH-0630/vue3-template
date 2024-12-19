import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { clearPlaceholderLoading } from '@/utils/placeholder-loading'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页'
    }
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
  clearPlaceholderLoading()
})
export default router
