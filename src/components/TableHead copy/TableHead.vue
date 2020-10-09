<template>
  <div class="TableHead">
    <plugin-div :pluginData="pluginData"></plugin-div>
  </div>
</template>

<script>
import plugin from "./Plugin"
export default {
  name: "TableHead",
  components: {
    "plugin-div":plugin
  },
  data() {
    return {
      pluginData:[
        {
          name:"序号"
        },{
          name:"动物",
          children:[
            {
              name:"猫科",
              children:[{name:"老虎"},{name:"狮子"}]
            },{
              name:"犬科",
              children:[{name:"豺狼"},{name:"土狗"}]
            }
          ]
        },{
          name:"行星",
          children:[
            {
              name:"金星"
            },{
              name:"火星"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {

  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style scoped>
.TableHead{
  position: relative;
}
.TableHead::before{
    content: "";
    height: 100%;
    width: 1px;
    position: absolute;
    right: 1px;
    top: 0;
    background: black;
}
.TableHead::after{
    content: "";
    height: 1px;
    width:100%;
    position: absolute;
    bottom: 1px;
    left: 0;
    background: black;
}
</style>