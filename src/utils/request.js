// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import { Message } from 'element-ui'
import axios from 'axios'
const service = axios.create({
  // 不同生产环境请求地址不同内容相同
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use() // 请求拦截器
service.interceptors.response.use(
  (res) => {
    // 请求成功，2xx触发
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  // 响应失败，超过2xx范围触发
  function (error) {
    Message.error(error)
    return Promise.reject(error)
  },
) // 响应拦截器
export default service // 导出axios实例
