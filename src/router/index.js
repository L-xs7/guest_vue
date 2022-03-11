import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//公共路由
export const constantRouters = [{
  //登录页面
  path: '/login',
  name: 'Login',
  component: () => import('../views/login/Login.vue'),
  hidden: true

}]
export const formatRoutes = () => {

}

export default new Router({
    mode:'hash',
    routes: constantRouters
})