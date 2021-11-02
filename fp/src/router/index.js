import Vue from 'vue'
import Router from 'vue-router'
// import AddPaymentForm from '../components/AddPaymentForm'
import App from '../App'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/add/payment/:category',
      name: 'addPayment',
      component: App
    }
  ]
})
