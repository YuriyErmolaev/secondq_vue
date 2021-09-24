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

    <div class="addPanel">

      <input type="checkbox" id="checkbox" v-model="checked">
      <label for="checkbox">
        <span v-show="!checked">Show</span>
        <span v-show="checked">Hide</span>
        num keyboard
      </label>

      <div v-show="checked" class="numKeyboard">
        <div class="buttonsNums">
          <button v-for="(num, key) in nums" @click="changeCurNum(num)" :key="key">{{num}}</button>
          <button @click="changeCurNum()">&larr;</button>
        </div>
        <input type="radio" id="one" value="op1" v-model="curOperand">
        <label for="one">First operand</label>

        <input type="radio" id="two" value="op2" v-model="curOperand">
        <label for="two">Second operand</label>
      </div>

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
      result: 0,
      warn: '',
      divByZeroWarn: 'Can\'t divide by zero',
      checked: false,
      curOperand: ''
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
    },
    changeCurNum (num) {
      const opName = this.curOperand
      let opVal = this[opName]
      opVal = opVal + ''

      if (num === undefined) {
        opVal = opVal.slice(0, -1)
      } else {
        if (opVal === '0') opVal = ''
        opVal += num
      }

      this[opName] = +opVal
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
  .calc
    max-width: 700px
    margin: 0 auto
  .addPanel
    width: 600px
    height: 200px
    margin: 0 auto
  .warn
    color: red
  .keyboard, .warn
    margin: 10px
  button
    margin: 5px
    padding: 5px 10px
  button, input[type=checkbox], label
    cursor: pointer
</style>
