import Vue from 'vue'
import App from './App.vue'
import socket from './utils/socket'
import Notifications from 'vue-notification'
import store from './store'
// import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.prototype.socket = socket


// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://metinseylan.com:1992',
//   vuex: {
//       store,
//       actionPrefix: 'SOCKET_',
//       mutationPrefix: 'SOCKET_'
//   },
//   options: { path: "/my-app/" } //Optional options
// }))
Vue.use(Notifications)


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
