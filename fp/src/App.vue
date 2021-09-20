<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld
        msg="Welcome to Your Vue.js App"
        :is-show-title="isShowTitle"
    />
    {{message}}
    <button v-on:click="c=a+b">Summ {{a}} and {{b}}</button>
    <button @click="doThat('Hello', $event)">Clear</button>
    {{c}}
    <Calc />

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Calc from './components/Calc'

export default {
  name: 'App',
  components: {
    Calc,
    HelloWorld
  },
  data: () => ({
    message: 'Hi! )',
    isShowTitle: false,
    c: 0,
    a: 1,
    b: 1
  }),
  methods: {
    doThat (str, event) {
      console.log(str, event)
      this.c = 0
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  cursor: pointer;
}
</style>
