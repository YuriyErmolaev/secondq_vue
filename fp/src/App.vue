<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
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
          <v-col>
            <Chart
              :chartdata="chartData"
              :options="chartOptions"
            ></Chart>
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
    chartData: {
      labels: ['Food', 'Education', 'Sport'],
      datasets: [
        {
          label: '# of Votes',
          data: [
            169,
            50,
            450
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    chartOptions: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
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
      console.log('paymentsList', paymentsList)
      const summ = paymentsList
        .filter(item => item.category === category)
        .reduce((acc, currentValue) => {
          return acc + currentValue.amount
        }, 0)
      console.log('summ', summ)
      if (summ === 0) return 169
      return summ
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
    this.chartData.datasets[0].data[0] = this.getCategorySumm('Food')
  },
  created () {
    this.$store.dispatch('fetchCategoryList')
    this.chartData.datasets[0].data[0] = this.getCategorySumm('Food')
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
