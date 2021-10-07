<template>
  <div id="app" >
    <div class="header container">My personal costs</div>
    <main class="container">
      <div>
        Total summ: {{totalSumm}}
      </div>
      <button @click="showForm = !showForm">
        ADD NEW COST <span v-show="!showForm">+</span> <span v-show="showForm">-</span>
      </button>
      <div v-show="showForm">
        <add-payment-form @addNewPayment="addNewPayment" :category-list="getCategoryList"/>
      </div>
      <PaymentDisplay
        :show-items="true"
        :items="paymentsList"
      />
    </main>
  </div>
</template>

<script>
import PaymentDisplay from './components/PaymentDisplay'
import AddPaymentForm from './components/AddPaymentForm'
// import { mapMutations } from 'vuex'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    AddPaymentForm,
    PaymentDisplay
  },
  data: () => ({
    showForm: false
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
      // ['setPaymentsListData']
      {
        addData: 'setPaymentsListData'
      }
    ),
    addNewPayment (data) {
      // this.paymentsList.push(data)
      // this.paymentsList = [...this.paymentsList, data]
      this.$store.commit('addItemToPaymentList', data)
    }
  },
  created () {
    // this.paymentsList = this.fetchData()
    // this.$store.commit('setPaymentsListData', this.fetchData())
    // this.setPaymentsListData(this.fetchData())
    // this.addData(this.fetchData())
    this.$store.dispatch('fetchData')
    this.$store.dispatch('fetchCategoryList')
  }
}
</script>

<style lang="sass">
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
