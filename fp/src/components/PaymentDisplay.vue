<template>
  <v-container>
    <v-row>
      <v-col :cols="1">№</v-col>
      <v-col :cols="4">Date</v-col>
      <v-col :cols="4">Category</v-col>
      <v-col :cols="2">Amount</v-col>
      <v-col :cols="1">Edit</v-col>
    </v-row>
    <v-row v-for="(item, idx) in items" :key="idx">
      <v-col :cols="1">
        {{item.id}}
      </v-col>
      <v-col :cols="4">
        {{item.date}}
      </v-col>
      <v-col :cols="4">
        {{item.category}}
      </v-col>
      <v-col :cols="2">
        {{item.value}}
      </v-col>
      <v-col :cols="1">
        <div class="dotsMenu mt-" @click="showMenu(item.id)">
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
    width: 30px
    align-items: center
    .dot
      display: inline-block
      font-size: 25px
      line-height: 2px
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
