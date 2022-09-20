import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
// import {
//   getToken
// } from './auth'
import store from '../store'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8' //post 请求头设置
// axios.defaults.baseURL = '/api/'
axios.defaults.baseURL = 'http://175.178.35.231:8811'

//服务器接口服务地址
// axios.defaults.baseURL = window.location.origin + ':8811'
//创建axios实例
const service = axios.create({
  //超时时间
  timeout: 10000
})

//请求拦截器
// service.interceptors.request.use(config => {
//   // 每次发送请求之前判断是否存在token        
//   // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//   // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
//   const token = getToken()
//   if (token != null) {
//     config.headers['Authorization'] = token
//   }
//   return config
// }, err => {
//   Message.error({
//     message: '请求接口超时！'
//   })
//   return Promise.reject(err)
// })

//响应拦截器
service.interceptors.response.use(data => {
  const res = data.data
  if (res.status && res.status !== 200) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 3 * 1000
    })

    // 401:未登录;
    if (res.status === 401) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return Promise.reject('error')
  } else {
    return res
  }
}, error => {
  console.log('err' + error)
  let {
    message
  } = error
  if (message === 'Network Error') {
    message = '后端接口连接异常'
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时:' + message
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message.substr(message.length - 3) + '异常'
  }
  Message({
    message: message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error)
})



export const postRequest = (url, params) => {
  return service({
    method: 'post',
    url: url,
    data: params
  })
}

export const uploadFileRequest = (url, params) => {
  return service({
    method: 'post',
    url: url,
    data: params
  })
}
export const putRequest = (url, params) => {
  return service({
    method: 'put',
    url: url,
    data: params
  })
}
export const deleteRequest = (url) => {
  return service({
    method: 'delete',
    url: url
  })
}
export const getRequest = (url, params) => {
  if (params) {
    return service({
      method: 'get',
      url: url,
      params: params
    })
  } else {
    return service({
      method: 'get',
      url: url
    })
  }
}

export default service