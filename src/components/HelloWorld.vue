<template>
  <div class="directory">
    {{msg}}
    <router-link :to="{path:'/test',query:{id:'1'}}">一个跳转</router-link>
    <div class="red">
      <div class="green" style="height:200px"></div>
      <div class="yellow" style="height:100%">
        <div style="height:100%; width:100% bacground:transparent">

        </div>
      </div>
    </div>
    <div>
      <!-- <iframe src="../../static/ThreeExample.js-gh-pages/practice.html" frameborder="0" style="width:100%;height:800px"></iframe> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'directory',
  data () {
    return {
      msg: '这是我的一个目录',
      name: '声明一下，但是我不用看下错不错'
    }
  },
  mounted(){
    // console.log(this.$store.state,this.$store)
    // a()
    // var a = function(){
    //   console.log(1)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .red{
    background: red;
    overflow: hidden;
  }
  .red>div{
    float: left;
    width: 50%;
  }
  .green{
    background: green;
  }
  .yellow{
    background: yellow;
  }
</style>
