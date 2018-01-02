// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from  'axios'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import * as utils from './assets/js/utils'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

var instance = Axios.create({
  baseURL: 'http://localhost:3000/'
});

Vue.config.productionTip = false;

Vue.prototype.$http = instance;
Vue.prototype.$utils = utils;

//重置css
import './assets/css/normalize.css'
import './assets/css/style.css'
import  './assets/css/beautify.scss'
import './assets/css/highlight.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
