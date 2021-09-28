<template>
  <div id="app">
    <div class="header">My personal costs</div>
    <main>
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

export default {
  name: 'App',
  components: {
    AddPaymentForm,
    PaymentDisplay
  },
  data: () => ({
    paymentsList: [],
    showForm: false
  }),
  methods: {
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
      this.paymentsList = [...this.paymentsList, data]
    }
  },
  created () {
    this.paymentsList = this.fetchData()
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

.header
  color: red

</style>
