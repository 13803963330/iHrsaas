import store from '@/store'
import router from '@/router'


const whiteList = ['/login','/404']
// 前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  //1.登录
  if (token) {
    store.dispatch('user/getuserInfo')
    to.path === '/login'?next('/'):next()
    // 2.未登录
  } else {
    // 访问的是否在白名单（末登录也能访问的页面
    const isCludes = whiteList.includes(to.path)
    isCludes?next():next('/login')
  }
})
