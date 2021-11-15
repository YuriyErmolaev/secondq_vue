<template>
<div class="wrapSubMenu">
  <h5 class="text--accent-6 ma-4">
    ITEM ID: {{itemId}}
  </h5>
  <v-btn @click="editItem">Edit</v-btn>
  <v-btn @click="deleteItem">Delete</v-btn>
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
      console.log('click edit')
      const title = 'Edit'

      const settings = {
        modalWindowContent: 'AddPaymentForm',
        itemId: this.itemId,
        edit: true,
        categoryList: this.getCategoryList
      }
      setTimeout(() => {
        this.$modal.show(title, true, settings)
      }, 1000)
      // this.$modal.show(title, true, settings)
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
  .wrapSubMenu
    display: flex
    flex-direction: column
</style>
