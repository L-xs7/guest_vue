import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
//引入样式表
import '@/assets/style/main.scss'
//按需引入elementui
import elementui from  '@/utils/elementui'

//导入时间格式化文件
import moment from 'moment' // 导入时间格式化文件
//引入svg
import '@/assets/icons'
//引入echarts
import * as echarts from 'echarts'
Vue.use(elementui)
Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
