<template>
  <div class="StoreTest">
      {{data}}
  </div>
</template>

<script>
export default {
  name: 'StoreTest',
  components: {},
  data () {
    return {
      data:'一个store的测试。请打开谷歌调试'
    };
  },
  computed: {
      testData(){
          return this.$store.getters.getTest
      }
  },
  watch: {},
  methods: {},
  created () {},
  mounted () {
      console.log(this.$stores)
      this.$store.dispach(testAction,{name:'testAction',des:'一个action测试'})
  },
  updated () {},
  destroyed () {}
}
</script>

<style scoped>
</style>