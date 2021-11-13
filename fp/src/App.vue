<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col md="6">
            <div class="header container">My personal costs</div>
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
          </v-col>
          <v-col md="6">
            <div class="chart-container">
              <Chart
              :chartdata="chartDataSend"
              :options="chartOptions"
            ></Chart>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
import Chart from './components/Chart'

export default {
  name: 'App',
  components: {
    Chart,
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
    modalWindowSettings: {},
    chartDataSend: [0, 0, 0, 0],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    }
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
    },
    getCategorySumm (category) {
      const paymentsList = this.$store.getters.getPaymentsList
      const summ = paymentsList
        .filter(item => item.category === category)
        .reduce((acc, currentValue) => {
          return acc + currentValue.value
        }, 0)
      return summ
    },
    updateChartData () {
      const arDataChart = []
      arDataChart[0] = this.getCategorySumm('Food')
      arDataChart[1] = this.getCategorySumm('Education')
      arDataChart[2] = this.getCategorySumm('Sport')
      arDataChart[3] = this.getCategorySumm('Entertaiment')
      this.chartDataSend = [...arDataChart]
    }
  },

  watch: {
    $route (to, from) {
      this.addItem()
    },
    paymentsList () {
      this.updateChartData()
    }
  },
  mounted () {
    this.$modal.EventBus.$on('shown', this.onShown)
    this.$modal.EventBus.$on('hide', this.onHide)
    this.updateChartData()
  },
  created () {
    this.$store.dispatch('fetchCategoryList')
    this.updateChartData()
  }
}
</script>

<style lang="sass">

.chart-container

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
