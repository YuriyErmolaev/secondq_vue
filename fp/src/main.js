import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import store from './store'
import router from './router'
import modal from './plugins/modal'

Vue.config.productionTip = false
Vue.use(modal)
Vue.use(Vuetify)

new Vue({
  render: h => h(App),
  store,
  router,
  vuetify: new Vuetify()
}).$mount('#app')
