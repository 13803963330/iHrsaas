// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import { Message } from 'element-ui'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {getTokeTime} from './auth'
const service = axios.create({
  // 不同生产环境请求地址不同内容相同
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use(
  async (config)=>{
    function isTime() {
      const currentTime=Date.now(); //当前时间
      const tokenTime=getTokeTime(); //存储时间
      const timeout=2*60*60*1000; //过期间隔
      return currentTime-tokenTime>timeout //是否过期
    }

    if(store.state.user.token){
      if (isTime()) {
        await store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('登陆过期'));
      }else{
        config.headers.Authorization = `Bearer ${store.getters.token}`
      }
    }
    return config //返回配置
  },error=>{
    return Promise.reject(error) 
  }
) 

// 响应拦截器
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
 async function (error) {
    if (error?.response?.status ===401) {
      Message.error('登录过期');
      await store.dispatch('user/logout')
        router.push('/login')
    }else{
      Message.error(error.message)
    }
    return Promise.reject(error)
  },
) 
export default service // 导出axios实例
