<template>
  <div class="calc">
    <div class="main">
      <input v-model="op1" type="number">
      <input v-model="op2" type="number">
      = {{result}}
    </div>
    <div class="keyboard">
      <button @click="result = +op1 + +op2">+</button>
      <button @click="Minus">-</button>
      <button @click="Multi(op1, op2)">*</button>
      <button>/</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Calc',
  data () {
    return {
      op1: 0,
      op2: 0,
      result: 0
    }
  },
  methods: {
    Minus () {
      this.result = +this.op1 - +this.op2
    },
    Multi (op1, op2) {
      this.result = +op1 * +op2
    }
  }
}
</script>

<style scoped>

</style>
