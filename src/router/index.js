import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法(解决相同路由重复跳转爆红)
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//公共路由-重定向
export const constantRouters = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    //登录页面
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    hidden: true,
  },
  {
    //布局页面
    path: '/layout',
    name: 'Layout',
    alias: '/config',
    component: () => import('../views/layout/Layout.vue'),
    hidden: true,
    redirect: '/config/region',
    meta: { name: '系统配置', isMenu: true },
    children: [{
      path: 'region',
      name: 'Region',
      component: () => import('../views/config/region/RegionConfig.vue'),
      hidden: true,
      meta: { name: '地区配置', isMenu: false },
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('../views/config/menu/MenuConfig.vue'),
      hidden: true,
      meta: { name: '菜单配置', isMenu: false },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('../views/config/role/Role.vue'),
      hidden: true,
      meta: { name: '权限配置', isMenu: false },
    }
    ]
  }


]
export const formatRoutes = () => {


}

export default new Router({
  mode: 'history',
  routes: constantRouters
})