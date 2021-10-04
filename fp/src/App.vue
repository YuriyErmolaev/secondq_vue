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
        <add-payment-form @addNewPayment="addNewPayment" />
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
      'getPaymentsList'
    ])
  },
  methods: {
    ...mapMutations(
      // ['setPaymentsListData']
      { addData: 'setPaymentsListData' }
    ),
    fetchData () {
      return [
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
      ]
    },
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
    this.addData(this.fetchData())
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
