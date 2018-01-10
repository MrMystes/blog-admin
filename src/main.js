// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from  'axios'
import App from './App'
import router from './router'
import {Table,TableColumn,Message,Upload,Button,Pagination,Loading,MessageBox} from 'element-ui'
import * as utils from './assets/js/utils'

Vue.use(Table)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Loading.directive)
Vue.use(TableColumn)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

var instance = Axios.create({
  baseURL: 'http://api.ayuki.ink/'
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
