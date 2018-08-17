import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
