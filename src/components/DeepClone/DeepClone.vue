<template>
  <div class="DeepClone">
    来个深复制
    <div>{{DeepClone(targetObject)}}</div>
  </div>
</template>

<script>
export default {
  name: "DeepClone",
  components: {},
  data() {
    return {
      targetObject: {
        a: 1,
        b: [1, 2, 3, { a: 1, b: 2 }],
        c: { a: 1 }
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    DeepClone(target) {
      if (typeof target == "object") {
        if (Array.isArray(target)) {
          let arr = [];
          for (let key = 0; key < target.length; key++) {
            typeof target[key] == "object"
              ? arr.push(this.DeepClone(target[key]))
              : arr.push(target[key]);
          }
          return arr;
        } else {
          let obj = {};
          for (let key in target) {
            if (typeof target[key] == "object") {
              obj[key] = this.DeepClone(target[key]);
            } else {
              obj[key] = target[key];
            }//写着写着完了前面的想法了。 做啥子判断，直接 obj[key] = this.DeepClone(target[key]) 就好了
          }
          obj._proto_ = target._proto_;
          return obj;
        }
      } else {
        return target;
      }
      //let const 无变量提升 js 执行  var 声明变量是在编译阶段申明的。 js代码先编译再执行。
      //所以会有变量提升的问题。 但是let 等es6 非编译阶段声明。无问题。
      //v-for 因为 闭包问题 函数执行完毕后返回
    },
    ShallowCopy(){ //浅复制因为直接赋值,对象的赋值只是引用并不是新建了新的对象。所以导致了 联动的对象修改。 这个会影响使用
      if (typeof target == "object") {
        if (Array.isArray(target)) {
          let arr = [];
          for (let key = 0; key < target.length; key++) {
            arr.push(target[key]);
          }
          return arr;
        } else {
          let obj = {};
          for (let key in target) {
            obj[key] = target[key];
          }
          return obj;
        }
      } else {
        return target;
      }
    },
    box() {
      var arr = [];
      for (var i = 0; i < 5; i++) {
        arr[i] = function() {
          return i;
        };
      }//因为闭包问题。会导致for循环完成后返回一堆函数给数组。 数组再调取函数作用域里的i, i已经成为5了；  函数自执行。不要返回函数吗。   另一种就是使用块级作用域的let了
      return arr;
    }
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style scoped>
</style>