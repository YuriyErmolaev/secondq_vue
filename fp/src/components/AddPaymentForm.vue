<template>
  <div class="form">
    <input placeholder="Date" v-model="date" />
    <input placeholder="Category" v-model="category" />
    <input placeholder="Amount" v-model="value" />
    <button @click="onSaveClick" >Save!</button>
  </div>
</template>

<script>
export default {
  name: 'AddPaymentForm',
  data () {
    return {
      date: '',
      category: '',
      value: ''
    }
  },
  methods: {
    onSaveClick () {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value
      }
      this.$emit('addNewPayment', data)
    }
  },
  computed: {
    getCurrentDate () {
      const today = new Date()
      const d = today.getDate()
      const m = today.getMonth() + 1
      const y = today.getFullYear()
      return `${d}${m}${y}`
    }
  }
}
</script>

<style scoped>

</style>
