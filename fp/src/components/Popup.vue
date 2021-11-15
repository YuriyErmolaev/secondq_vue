<template>
  <v-dialog v-model="dialog2" width="500">
      <v-card class="pa-8">
        <component
          :is="modalWindowSettings.modalWindowContent"
          :itemId="modalWindowSettings.itemId"
          :edit="modalWindowSettings.edit"
          :category-list="modalWindowSettings.categoryList"
        />
        <v-btn class="ma-6" @click="dialog2 = false">Cancel popup</v-btn>
      </v-card>
    </v-dialog>
</template>

<script>
import SubMenu from './SubMenu'
import AddPaymentForm from './AddPaymentForm'

export default {
  name: 'Popup',
  components: {
    AddPaymentForm,
    SubMenu
  },
  props: {
    ModalWindoW: String,
    showDialog: Boolean,
    modalWindowSettings: Object
  },
  data: () => ({
    dialog2: false
  }),
  watch: {
    showDialog (newShowDialog, oldShowDialog) {
      console.log('click from list')
      console.log('modalWindowSettings to popup', this.modalWindowSettings)
      this.dialog2 = newShowDialog

      if (this.modalWindowSettings.edit) {
        console.log('popup edit')
        // this.$modal.hide()
        // this.dialog = true

        this.dialog2 = false
        console.log('modalWindowSettings to popup', this.modalWindowSettings)
        this.$modal.show()
      }
    }
  }
}
</script>

<style scoped lang="sass">
  .popup
    padding: 20px
    background-color: azure
    border-radius: 5px
    overflow: hidden
    position: absolute
    top: 50%
    left: 50%
    min-width: 200px
    min-height: 100px
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2)
    border: 1px solid darkcyan
  .close
    position: absolute
    left: 50%
    bottom: 3px
</style>
