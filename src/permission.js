// import router from './router'
// import store from './store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
// import { getToken, setToken } from '@/utils/auth' // 验权

// const whiteList = ['/login'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (to.query.token) {
//     setToken(to.query.token)
//   }
//   if (getToken()) {
//     if(to.path === '/login'){
//       next();
//     }else if (!store.getters.role) {
//         store.dispatch('GetInfo').then(res => { // 拉取用户信息
//           store.dispatch('Connection').then(res => {
//             store.dispatch('GenerateRoutes').then(() => { // 生成可访问的路由表
//               router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//               next({ ...to, replace: true })
//             })
//           })
//         }).catch((err) => {
//           //  store.dispatch('FedLogOut').then(() => {
//           //   Message.error(err || 'Verification failed, please login again')
//           //   next({ path: '/' })
//           // })
//           NProgress.done()
//         })
//       }else {
//       if (to.path === '/') {
//         if(store.state.user.currentHospital !== null){
//           next({ path: '/dashboard' })
//         }else{
//           next({ path: '/system' })
//         }
//       } else {
//         if(store.state.user.currentHospital !== null){
//           next()
//         }else{
//           if(to.path.startsWith('/system')){
//             next()
//           }else{
//             next({ path: '/system' })
//           }
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next('/login')
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })
