<template>
  <v-app>
    <v-main>
        <div class="header container">My personal costs</div>
        <main class="container">
          <div>
            Total summ: {{totalSumm}}
          </div>
          <button @click="showForm = !showForm">
            ADD NEW COST <span v-show="!showForm">+</span> <span v-show="showForm">-</span>
          </button>
          <div v-show="showForm">
            <add-payment-form
              @addNewPayment="addNewPayment"
              @changePayment="changePayment"
              :category-list="getCategoryList"
              :pdate="sendDate"
              :pcategory="sendCategory"
              :pvalue="sendValue"
            />
          </div>
          <Popup
            v-show="showPopup"
            :ModalWindoW="ModalWindoW"
            :modalWindowSettings="modalWindowSettings"
          />
          <test-component
            message="Hello from test component! )"
          ></test-component>
          <div class="autoAddLinks">
            <v-btn to="/add/payment/Food?value=200">Add 200 Food</v-btn>
            <v-btn to="/add/payment/Transport?value=50">Add 50 Transport</v-btn>
            <router-link to="/add/payment/Entertainment?value=2000">Add 2000 Entertainment</router-link>
            <router-link to="/add/payment/Food">Add Food</router-link>
            <router-link to="/add/payment?value=200">Add 200</router-link>
          </div>
          <PaymentDisplay
            :show-items="true"
            :items="paymentsList"
          />
          <Pagination/>
        </main>
    </v-main>
  </v-app>
</template>

<script>
import PaymentDisplay from './components/PaymentDisplay'
import AddPaymentForm from './components/AddPaymentForm'
import Pagination from './components/Pagination'
import Popup from './components/Popup'

import { mapMutations, mapGetters } from 'vuex'
import TestComponent from './components/TestComponent'

export default {
  name: 'App',
  components: {
    TestComponent,
    AddPaymentForm,
    PaymentDisplay,
    Pagination,
    Popup
  },
  data: () => ({
    showForm: false,
    pageNum: 1,
    sendDate: '',
    sendCategory: '',
    sendValue: '',
    showPopup: false,
    ModalWindoW: '',
    modalWindowSettings: {}
  }),
  computed: {
    totalSumm () {
      return this.$store.getters.getPaymentsListSum
    },
    paymentsList () {
      return this.$store.getters.getPaymentsList
    },
    ...mapGetters([
      'getPaymentsList',
      'getCategoryList'
    ])
  },
  methods: {
    ...mapMutations(
      {
        addData: 'setPaymentsListData'
      }
    ),
    addNewPayment (data) {
      this.$store.commit('addItemToPaymentList', data)
    },
    changePayment (itemId, data) {
      console.log('data', data)
      this.$store.commit('changeItemInPaymentList', itemId, data)
    },
    addItem () {
      const category = this.$route.params.category
      const value = this.$route.query.value
      if (category || value) {
        this.showForm = true
      }
    },
    onShown (settings) {
      this.showPopup = true
      this.ModalWindoW = settings.name
      this.modalWindowSettings = settings
    },
    onHide () {
      this.showPopup = false
      this.ModalWindoW = ''
      this.modalWindowSettings = {}
    }
  },
  watch: {
    $route (to, from) {
      this.addItem()
    }
  },
  mounted () {
    this.$modal.EventBus.$on('shown', this.onShown)
    this.$modal.EventBus.$on('hide', this.onHide)
  },
  created () {
    this.$store.dispatch('fetchCategoryList')
  }
}
</script>

<style lang="sass">
.autoAddLinks
  display: flex
  flex-direction: column

.container
  margin: 0 auto
  max-width: 1100px

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

button
  cursor: pointer

.header
  color: red

</style>
