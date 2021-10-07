import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: []
  },
  mutations: {
    setPaymentsListData (state, payload) {
      state.paymentsList = payload
    },
    setCategoryList (state, payload) {
      state.categoryList = payload
    },
    addItemToPaymentList (state, payload) {
      state.paymentsList.push(payload)
    }
  },
  actions: {
    fetchData ({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              date: '28.03.2020',
              category: 'Food',
              value: 169
            },
            {
              date: '24.03.2020',
              category: 'Transport',
              value: 360
            },
            {
              date: '24.03.2020',
              category: 'Food',
              value: 532
            }
          ])
        }, 1000)
      }).then(res => {
        commit('setPaymentsListData', res)
      })
    },
    fetchCategoryList ({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            'Food', 'Transport', 'Education', 'Sport'
          ])
        }, 1000)
      }).then(res => {
        commit('setCategoryList', res)
      })
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getPaymentsListSum: state => state.paymentsList.reduce((sum, cur) => sum + cur.value, 0),
    getCategoryList: state => state.categoryList
  }
})
