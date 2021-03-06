// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import qs from 'qs';
import router from './router/router';
import store from './store';
import moment from 'moment';
Vue.prototype.$moment = moment;
Vue.prototype.$qs = qs

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import global from '@/components/utils/global';
Vue.use(global);
//import axios from 'axios';
import axios from './http';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

import App from './App';
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})