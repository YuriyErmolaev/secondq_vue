import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: []
  },
  mutations: {
    setPaymentsListData (state, payload) {
      state.paymentsList = payload
    },
    addItemToPaymentList (state, payload) {
      state.paymentsList.push(payload)
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getPaymentsListSum: state => state.paymentsList.reduce((sum, cur) => sum + cur.value, 0)
  },
  actions: {}
})
