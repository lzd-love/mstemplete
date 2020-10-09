// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// require(['./vuex/index.js'], function(vuex) {
//   console.log(vuex)
// });
// node_modules文件下默认使用node标准 commonjs规范。 而非node_modules 目录下 默认使用 es6 的import export 规范。
// 对webpack打包的文件非引用目录使用可如此引入。
