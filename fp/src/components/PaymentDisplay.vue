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
        {{item.id}}
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
      <td>
        <div class="dotsMenu" @click="showMenu(item.id)">
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </div>
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
  },
  methods: {
    showMenu (id) {
      const title = 'Menu'
      const settings = {
        modalWindowContent: 'SubMenu',
        itemId: id
      }
      this.$modal.show(title, settings)
    }
  }
}
</script>

<style lang="sass" scoped>
  .dotsMenu
    display: flex
    flex-direction: column
    cursor: pointer
    width: 20px
    height: 50px
    align-items: center
    .dot
      display: inline-block
      font-size: 25px
      height: 7px

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
