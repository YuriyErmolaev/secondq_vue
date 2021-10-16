<template>
  <table>
    <tr>
      <th>№</th>
      <th>Date</th>
      <th>Category</th>
      <th>Amount</th>
    </tr>
    <tr v-for="(item, idx) in items" :key="idx">
      <td>
        {{idx}}
      </td>
      <td>
        {{item.date}}
      </td>
      <td>
        {{item.category}}
      </td>
      <td>
        {{item.value}}
      </td>
    </tr>
  </table>
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

<style lang="sass" scoped>
  table
    margin: 50px auto
    border-collapse: collapse
    text-align: left
    tr
      border-bottom: 1px solid grey
    td, th
      padding: 20px
      padding-right: 50px

</style>
