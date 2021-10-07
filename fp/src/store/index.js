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
      return new Promise((resolve, reject) => {
        const url = 'https://raw.githubusercontent.com/YuriyErmolaev/share/main/costs.json'
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'json'
        xhr.onload = function () {
          if (this.status === 200) {
            resolve(this.response)
          } else {
            var error = new Error(this.statusText)
            error.code = this.status
            reject(error)
          }
        }
        xhr.onerror = function () {
          reject(new Error('Network Error'))
        }
        xhr.send()
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
