import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//公共路由-重定向
export const constantRouters = [
  {
    path:'/',
    redirect:'/login'
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
    alias:'/config',
    component: () => import('../views/layout/Layout.vue'),
    hidden: true,
    redirect: '/config/region',
    children: [{
        path: 'region',
        name: 'Region',
        component: () => import('../views/config/region/RegionConfig.vue'),
        hidden: true
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/config/menu/MenuConfig.vue'),
        hidden: true
      },
      {
        path:'role',
        name:'Role',
        component:() => import('../views/config/role/Role.vue'),
        hidden:true
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