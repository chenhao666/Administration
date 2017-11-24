// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入UI样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入通用样式
import '../static/css/comm.css'
//引入jq
import $ from 'jquery'
import '../static/js/jquery.particleground.min.js'
//引入axios
import Axios from 'axios'
//引入状态管理器
import store from './store.js'

//修改原型链
Vue.prototype.$ajax = Axios

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
