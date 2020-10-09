<template class='slot'>
  <div>
      <SlotChild>
          <template v-slot:test="slotScop">
              <div>{{outData}}</div>
              <div>{{slotScop.innerData}}</div>
          </template>
      </SlotChild>
  </div>
</template>

<script>
import SlotChild from './components/SlotChild'
export default {
  name: 'slot',
  components: {
    SlotChild
  },
  data () {
    return {
      outData:"外面的数"
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

<style scoped>
</style>