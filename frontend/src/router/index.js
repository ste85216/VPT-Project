/**
 * router/index.js
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
  scrollBehavior (to, from) {
    // 只有當路徑發生變化時，才滾動到頂部
    if (to.path !== from.path) {
      return { top: 0 }
    }
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  if (from === START_LOCATION) {
    await user.profile()
  }

  if (user.isLogin && ['/loginregister'].includes(to.path)) { // 如果已登入，不允許進入登入註冊頁面
    next('/')
  } else if (to.meta.login && !user.isLogin) { // 如果需要登入，但未登入，導向登入註冊頁面
    next('/loginregister')
  } else if (to.meta.admin && !user.isAdmin) { // 如果需要管理員權限，但未登入，導向首頁
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
}) // 設定網頁標題

export default router
