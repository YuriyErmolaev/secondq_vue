export default {
  install (Vue) {
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.prototype.$modal = {
      EventBus: new Vue(),
      show (title, showDialog, settings) {
        this.EventBus.$emit('shown', { title, showDialog, settings })
      },
      hide () {
        this.EventBus.$emit('hide')
      }
    }
  }
}
