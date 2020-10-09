<template>
  <div class="TableHeadPlugin">
    <div
      class="colum"
      v-for="(item,index) in pluginData"
      :key="index"
      :style="{'width':100/pluginData.length+'%'}"
    >
      <div
        class="cell"
        :style="{height:(NestedLength - numArr[index])*40+'px',
      lineHeight:(NestedLength - numArr[index])*40+'px'}"
      >{{item.name}}</div>
      <!-- 这里通过计算设置高度 -->
      <div v-if="item.children&&item.children.length" style="width:100%">
        <TableHeadPlugin :pluginData="item.children"></TableHeadPlugin>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableHeadPlugin",
  props: {
    pluginData: {
      type: Array
    }
  },
  components: {},
  data() {
    return {
      numArr: [], //嵌套层数接收器
    };
  },
  computed: {
    NestedLength() {
      return this.getMaxFloor(this.pluginData)
    } //计算出嵌套的最大长度
  },
  watch: {},
  methods: {
    NestedNumGet(arr) {
      let numArr = [];
      arr.forEach(item => {
        let val = this.itemDeal(item.children);
        this.numArr.push(val);
      });
      // this.numArr.sort()
      console.log(this.numArr);
    },
    itemDeal(item) {
      return this.getMaxFloor(item)
    },
    getMaxFloor(treeData) {
      let floor = 0;
      let max = 0;
      function each(data, floor) {
        Array.isArray(data)&&data.forEach(e => {
          e.floor = floor;
          if (floor > max) {
            max = floor;
          }
          if (e.children&&e.children.length > 0) {
            each(e.children, floor + 1);
          }
        });
      }
      each(treeData, 1);
      return max;
    }
  },
  created() {
    this.NestedNumGet(this.pluginData);
  },
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style scoped>
.TableHeadPlugin {
  width: 100%;
  position: relative;
}
.colum {
  display: inline-block;
  vertical-align: middle;
}
.cell {
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 14px;
  border-left: 1px solid;
  border-top: 1px solid;
}
</style>