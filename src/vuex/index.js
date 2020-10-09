import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app
    },
    state: {
        test:null,
    },
    mutations: {
        setTest(state, val) {
            state.test = val
        }
    },
    getters: {
        getTest(state){
            return state.test
        }
    },
    actions: {
        testAction(context,payload){//context 指向当前vuex实例，payload 参数与上文的val类似，不过推荐使用对象obj
            context.commit('setTest',payload.des)
        }
    },
})

export default store