import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import dayjs from 'dayjs'
import Print from 'vue-print-nb'
Vue.use(Print);

import '@/icons' // icon
import '@/permission' // permission control
// 自定义指令
import * as directives from './directives'
// 组件封装集成
import components from './components'
// 注册过滤器
import * as filters from './filters'
for(let key in filters){
Vue.filter(key, filters[key])
}

Vue.use(components)

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 封装自定义指令
for(let key in directives)
Vue.directive(key, directives[key])
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})

