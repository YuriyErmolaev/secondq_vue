<template>
  <div class="form">
    <input placeholder="Date" v-model="date" />
    <input placeholder="Amount" v-model="value" />
    <select v-model="category">
      <option v-for="(categoryName, idx) in categoryList" :key="idx">
        {{ categoryName }}
      </option>
    </select>
    <button @click="onSaveClick" >Save!</button>
  </div>
</template>

<script>
export default {
  name: 'AddPaymentForm',
  props: {
    categoryList: {
      type: Array,
      default: () => []
    }
  },
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
        value: Number(this.value)
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
