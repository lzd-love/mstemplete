import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

let router = new Router({
  mode:'history',
  routes: [
    {
      path: '/redirect',
      redirect:'/'
    },
    {
      path: '/DeepClone',
      name:'DeepClone',
      component: resolve => require(['@/components/DeepClone/DeepClone'], resolve)
    },
    {
      path: '/Slot',
      name:'Slot',
      component: resolve => require(['@/components/Slot/Slot'], resolve)
    },
    {
      path: '/StoreTest',
      name:'StoreTest',
      component: resolve => require(['@/components/StoreTest/StoreTest'], resolve)
    },
    {
      path: '/TableHead',
      name:'StoreTest',
      component: resolve => require(['@/components/TableHead/TableHead'], resolve)
    },
    {
      path: '/',
      name: 'HelloWorld',
      meta:{
        requireAuth:false,
      },
      // component: () => import('@/components/HelloWorld')
      //这种方法会将全部的component 都打包在同一个js里项目进入首页就加载所有组件大致首页加载较慢。 使用requrie 将component打包成不同的js 提高首屏加载效率
      component: resolve => require(['@/components/HelloWorld'], resolve) //所以我们使用require写法
    }
  ],
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  // console.log(to,from)
  // let Timer = new Promise((resolve,reject)=>{
  //   setTimeout(()=>{
  //     resolve()
  //   },3000)
  // })
  // await Timer
  //在此处处理异步请求是不合理的
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (localStorage.getItem('username')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
      path: '/Register',
      query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
