<template>
  <div>
    <div v-for="(item, idx) in items" :key="idx">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDisplay',
  props: {
    items: {
      type: Array,
      default: () => {}
    },
    showItems: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
