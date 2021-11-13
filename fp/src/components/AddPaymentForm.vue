<template>
  <v-card class="pa-8">
    <v-text-field placeholder="Date" v-model="date" name="date"></v-text-field>
    <v-text-field placeholder="Amount" v-model="value" name="amount"></v-text-field>
    <v-select label="Category" v-model="category" :items="categoryList"></v-select>
    <v-card-actions>
      <v-btn @click="onSaveClick">Save</v-btn>
      <v-btn @click="closeForm">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
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
        const complexData = {
          itemId: this.itemId,
          data: data
        }
        this.$store.commit('changeItemInPaymentList', complexData)
      } else {
        this.$emit('addNewPayment', data)
      }
      this.closeForm()
    },
    closeForm () {
      this.$emit('closeAddPaymentForm')
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
