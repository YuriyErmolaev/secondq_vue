<template>
  <div>
    <button @click="changePage(buttonNum)" v-for="(buttonNum, idx) in buttons" :key="idx">{{buttonNum}}</button>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  data: () => ({
    buttons: [1, 2, 3],
    curPage: 1
  }),
  methods: {
    uploadPage () {
      this.$store.dispatch(
        'fetchData',
        {
          pageNum: this.curPage
        }
      )
    },
    changePage (buttonNum) {
      this.curPage = buttonNum
      this.uploadPage()
    }
  },
  created () {
    this.uploadPage()
  }
}
</script>

<style scoped lang="sass">
  button
    margin: 10px

</style>
