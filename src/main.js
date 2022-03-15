import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'
import 'element-ui/lib/theme-chalk/index.css';
//引入样式表
import '@/assets/style/main.scss'
//分别引用axios封装方法
import { getRequest, postRequest, deleteRequest, putRequest } from './utils/request'
//按需引入elementui
import elementui from  '@/utils/elementui'

//导入时间格式化文件
import moment from 'moment' // 导入时间格式化文件

//引入svg
import '@/assets/icons'

Vue.use(elementui)
Vue.config.productionTip = false

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
