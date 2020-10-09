<template>
  <div class="TableHeadPlugin" >
    <tr>
      <td
        class="colum"
        v-for="(item,index) in pluginData"
        :key="index"
        :rowspan="item.children?1:(NestedLength - numArr[index])"
        :colspan="getTreeWidth(item)"
      >
        <div class="cell">{{item.name}}</div>
      </td>
    </tr>
    <TableHeadPlugin :pluginData="childrenPluginDataData" :inner="true"  v-if="childrenPluginDataData.length>0"></TableHeadPlugin>
  </div>
</template>

<script>
export default {
  name: "TableHeadPlugin",
  props: {
    pluginData: {
      type: Array
    },
    inner: {
      type: Boolean
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
    }, //计算出嵌套的最大长度
    childrenPluginDataData() {
      let arr = [];
      this.pluginData.forEach(item => {
        item.children&&(item.children.length>0)?(arr=arr.concat(item.children)):''
      })
      return arr
    }
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
      // console.log(this.numArr);
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
    },//获取目标深度
    getTreeWidth(data){
      let num = 0;
      function arrDeal(arr){
        if(arr.children&&arr.children.length > 0){
          arr.children.forEach(i=>{
            arrDeal(i)
          })
        }else{
          num+=1
        }
      }
      arrDeal(data)
      return num
    }//获取树的宽度
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
  /* display: inline-block; */
  vertical-align: middle;
}
.cell {
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 14px;
  /* border-left: 1px solid;
  border-top: 1px solid; */
}
th,td{
  border: 1px solid black;
}
</style>