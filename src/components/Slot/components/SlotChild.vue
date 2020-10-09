<template class='SlotChild'>
  <div>
      <span>我是在里面</span>
      <slot name="test" :innerData="innerData"></slot>
  </div>
</template>

<script>
export default {
  name: 'SlotChild',
  components: {},
  data () {
    return {
        innerData:"里面的数据给外面用"
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  updated () {},
  destroyed () {}
}
</script>

<style  scoped>
</style>