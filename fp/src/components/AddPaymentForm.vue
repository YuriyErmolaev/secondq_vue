<template>
  <div class="form">
    <input placeholder="Date" v-model="date" name="date" />
    <input placeholder="Amount" v-model="value" name="amount" />
    <select v-model="category" name="category">
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
    },
    edit: {
      type: Boolean,
      default: false
    },
    itemId: {
      type: Number
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
      console.log('this.edit', this.edit)
      if (this.edit) {
        // this.$emit('changePayment', this.itemId, data)
        const complexData = {
          itemId: this.itemId,
          data: data
        }
        this.$store.commit('changeItemInPaymentList', complexData)
      } else {
        this.$emit('addNewPayment', data)
      }
    },
    fillForm () {
      const category = this.$route.params.category
      const value = this.$route.query.value
      if (category || value) {
        this.category = category
        this.value = value
        this.date = this.getCurrentDate
      }
      if (category && value) {
        this.onSaveClick()
      }
    }
  },
  computed: {
    getCurrentDate () {
      const today = new Date()
      const d = today.getDate()
      const m = today.getMonth() + 1
      const y = today.getFullYear()
      return `${d}.${m}.${y}`
    }
  },
  watch: {
    $route (to, from) {
      this.fillForm()
    }
  }
}
</script>

<style scoped>

</style>
