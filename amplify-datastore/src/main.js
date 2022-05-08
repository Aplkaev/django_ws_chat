import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import axios from 'axios'
import VueAxios from 'vue-axios'


import socket from './utils/socket'
import store from './store'
import './assets/style.css';

/**
 * https://bootstrap-vue.org/docs
 */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
/**
 * https://bootstrap-vue.org/docs
 */


/**
 * 
 * https://www.npmjs.com/package/vue-axios
 * 
 */
Vue.use(VueAxios, axios);
/**
 * 
 * https://www.npmjs.com/package/vue-axios
 * 
 */



// import VueSocketIO from 'vue-socket.io'
// TODO:внедрить SOCKETIO
// import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false;
Vue.prototype.socket = socket;

Vue.use(Notifications);


new Vue({
  socket,
  store,
  render: h => h(App),
}).$mount('#app')
