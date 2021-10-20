<template>
  <div class="popup">
    <component
      :is="modalWindowSettings.modalWindowContent"
      :itemId="modalWindowSettings.itemId"
      :edit="modalWindowSettings.edit"
      :category-list="modalWindowSettings.categoryList"
    />
    <button class="close" @click="$modal.hide()">close</button>
  </div>
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
    modalWindowSettings: Object
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
