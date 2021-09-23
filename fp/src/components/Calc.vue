<template>
  <div class="calc">
    <div class="main">
      <input v-model="op1" type="number">
      <input v-model="op2" type="number">
      = {{result}}
    </div>
    <div class="keyboard">
      <button @click="
        result = +op1 + +op2
        warn = ''
      ">+</button>
      <button @click="Minus">-</button>
      <button @click="Multi(op1, op2)">*</button>
      <button @click="Div()">/</button>
    </div>
    <div class="addKeyboard">
      <button @click="Pow(op1, op2)">pow</button>
      <button @click="intDiv()">/ int</button>
    </div>

    <div class="warn">{{warn}}</div>

    <button v-for="(num, key) in nums" :key="key">{{num}}</button>

  </div>
</template>

<script>
export default {
  name: 'Calc',
  data () {
    return {
      op1: 0,
      op2: 0,
      result: 0,
      warn: '',
      divByZeroWarn: 'Can\'t divide by zero'
    }
  },
  methods: {
    Minus () {
      this.warn = ''
      this.result = +this.op1 - +this.op2
    },
    Multi (op1, op2) {
      this.warn = ''
      this.result = +op1 * +op2
    },
    Div () {
      const { op1, op2 } = this
      if (op2 === 0) {
        this.warn = this.divByZeroWarn
      } else {
        this.warn = ''
        this.result = +op1 / +op2
      }
    },
    Pow (op1, op2) {
      this.warn = ''
      this.result = Math.pow(op1, op2)
    },
    intDiv () {
      const { op1, op2 } = this
      if (op2 === 0) {
        this.warn = this.divByZeroWarn
      } else {
        this.warn = ''
        this.result = Math.floor(op1 / op2)
      }
    }
  },
  computed: {
    nums () {
      const numAr = []
      for (let i = 0; i <= 9; i++) numAr.push(i)
      return numAr
    }
  }
}
</script>

<style scoped lang="sass">
  .warn
    color: red
  .keyboard, .warn
    margin: 10px
  button
    margin: 5px
    padding: 5px 10px
</style>
