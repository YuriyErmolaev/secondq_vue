<template>
  <v-app>
    <v-main>
      <v-container>
        <v-app-bar app>
          <v-row>
            <v-col>
              <v-btn to="/add/payment/Food?value=200">Add 200 Food</v-btn>
            </v-col>
            <v-col>
              <v-btn to="/add/payment/Transport?value=50">Add 50 Transport</v-btn>
            </v-col>
            <v-col>
              <v-btn to="/add/payment/Entertainment?value=2000">Add 2000 Entertainment</v-btn>
            </v-col>
            <v-col>
              <router-link to="/add/payment/Food">Add Food</router-link>
            </v-col>
            <v-col>
              <router-link to="/add/payment?value=200">Add 200</router-link>
            </v-col>
          </v-row>
        </v-app-bar>
        <v-row>
          <v-col>
            <h1 class="text-md-h3">My personal costs</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2 class="text--accent-4 ma-8">Total summ: {{totalSumm}}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-8" md="6">
            <add-payment-form
              @addNewPayment="addNewPayment"
              @changePayment="changePayment"
              @visibilityAddPaymentForm="visibilityAddPaymentForm"
              :category-list="getCategoryList"
              :pdate="sendDate"
              :pcategory="sendCategory"
              :pvalue="sendValue"
            />
            <Popup
              :ModalWindoW="ModalWindoW"
              :showDialog="showDialog"
              :modalWindowSettings="modalWindowSettings"
            />
            <PaymentDisplay
              :show-items="true"
              :items="paymentsList"
            />
            <Pagination/>
          </v-col>
          <v-col class="pa-8" md="6">
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
import Chart from './components/Chart'

export default {
  name: 'App',
  components: {
    Chart,
    AddPaymentForm,
    PaymentDisplay,
    Pagination,
    Popup
  },
  data: () => ({
    pageNum: 1,
    sendDate: '',
    sendCategory: '',
    sendValue: '',
    showPopup: true,
    ModalWindoW: '',
    showDialog: false,
    modalWindowSettings: {},
    chartDataSend: [],
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
    visibilityAddPaymentForm (visibility) {
      this.dialog2 = visibility
    },
    changePayment (itemId, data) {
      console.log('data', data)
      this.$store.commit('changeItemInPaymentList', itemId, data)
    },
    onShown (data) {
      this.ModalWindoW = data.title
      this.showDialog = data.showDialog
      this.modalWindowSettings = data.settings
    },
    onHide () {
      this.ModalWindoW = ''
      this.modalWindowSettings = {}
      this.showDialog = false
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
      arDataChart[4] = this.getCategorySumm('Transport')
      this.chartDataSend = [...arDataChart]
    }
  },
  watch: {
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

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

button
  cursor: pointer

</style>
