<template>
  <div>
      <div @click="clickContanier" :class="{cantClick:!cantClick}">是否点赞：{{LikeItText}}</div>   
      <div>点赞数：{{num}}</div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
      id:{
        type:Number,
        require:true,
      }
  },
  components: {},
  data () {
    return {
      LikeIt:false,
      num:0,
      cantClick:true
    };
  },
  computed: {
    LikeItText(){
        return LikeIt?'赞':'没赞'
    }
  },
  watch: {
    LikeIt(val){
        val?this.postAdd():this.postDecrease()
    }
  },
  methods: {
      clickContanier(){
        this.LikeIt = !this.LikeIt;
      },
      postAdd(){
        this.cantClick = false; //那这样做个节流吧
        this.$axios('请求地址',{id:this.id}).then(res=>{
            this.getData();
            this.cantClick = true;
        })
      },
      postDecrease(){
        this.cantClick = false;
        this.$axios('请求地址',{id:this.id}).then(res=>{
            this.getData();
            this.cantClick = true;
        })
      },
      getData(){
        this.$axios.get('请求地址').then(res=>{
            this.num = res
        })
      }
  },
  created () {
      this.getData()
  },
  mounted () {},
  updated () {},
  destroyed () {}
}
</script>

<style scoped>
    .cant-click{
        pointer-events: none;
    }
</style>