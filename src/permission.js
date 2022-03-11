import router from './router'

router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.path === '/') {
        next({ path: '/login' })
    }else if(to.path === '/login'){
        next();
      }
})