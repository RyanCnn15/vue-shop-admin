import axios from 'axios'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  // baseURL: 'http://ceshi13.dishait.cn',
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求之前做点什么
    const token = getToken()
    config.headers['token'] = token
    return config
  },
  (err) => {
    // 对请求错误做点什么
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应体做操作
    return res.data
  },
  (err) => {
    // 对错误响应做操作
    ElMessage.error(err.response.data.msg || '请求失败')
    return Promise.reject(err)
  }
)

export default request
