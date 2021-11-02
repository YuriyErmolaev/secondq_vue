<template>
<div class="wrapSubMenu">
  itemId: {{itemId}}
  <button @click="editItem">Edit</button>
  <button @click="deleteItem">Delete</button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SubMenu',
  props: {
    itemId: Number
  },
  methods: {
    editItem () {
      this.$modal.hide()
      const title = 'Edit'
      const settings = {
        modalWindowContent: 'AddPaymentForm',
        itemId: this.itemId,
        edit: true,
        categoryList: this.getCategoryList
      }
      this.$modal.show(title, settings)
    },
    deleteItem () {
      this.$store.commit('delItemFromPaymentList', this.itemId)
      this.$modal.hide()
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentsList',
      'getCategoryList'
    ])
  }
}
</script>

<style scoped lang="sass">
  button
    margin: 10px
</style>
