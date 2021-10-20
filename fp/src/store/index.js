import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    paymentsListAll: {},
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
    },
    delItemFromPaymentList (state, itemId) {
      const item = state.paymentsList.find(element => element.id === itemId)
      const indexItem = state.paymentsList.indexOf(item)
      state.paymentsList.splice(indexItem, 1)
    },
    changeItemInPaymentList (state, data) {
      const itemId = data.itemId
      const payload = data.data

      payload.id = itemId

      console.log('itemId', itemId)
      console.log('payload', payload)

      const item = state.paymentsList.find(element => element.id === itemId)
      const indexItem = state.paymentsList.indexOf(item)
      console.log('indexItem for change: ', indexItem)

      console.log('state.paymentsList[indexItem]: ', state.paymentsList[indexItem])
      // state.paymentsList[indexItem] = payload
      Vue.set(state.paymentsList, indexItem, payload)
    },
    addItemToPaymentListAll (state, payload) {
      state.paymentsListAll[payload.pageNum] = payload.list
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getPaymentsListAll: state => state.paymentsListAll,
    getPaymentsListSum: state => state.paymentsList.reduce((sum, cur) => sum + cur.value, 0),
    getCategoryList: state => state.categoryList
  },
  actions: {
    fetchData ({ commit, getters }, { pageNum }, state) {
      return new Promise((resolve, reject) => {
        // console.log('getPaymentsListAll', getters.getPaymentsListAll)
        const pageName = 'page' + pageNum
        // if (getters.getPaymentsListAll.hasOwnProperty(pageName)){
        if (Object.prototype.hasOwnProperty.call(getters.getPaymentsListAll, pageName)) {
          resolve(getters.getPaymentsListAll[pageName])
        } else {
          const url = 'https://raw.githubusercontent.com/YuriyErmolaev/share/main/costs.json'
          const xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)
          xhr.responseType = 'json'
          xhr.onload = function () {
            if (this.status === 200) {
              const listItem = {
                pageNum: pageNum,
                list: this.response[pageName]
              }
              commit('addItemToPaymentListAll', listItem)
              resolve(this.response[pageName])
            } else {
              const error = new Error(this.statusText)
              error.code = this.status
              reject(error)
            }
          }
          xhr.onerror = function () {
            reject(new Error('Network Error'))
          }
          xhr.send()
        }
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
  }

})
