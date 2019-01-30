import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
     api:'http://admin.recruitment.cdpit.com',
   // api:'http://192.168.0.112:10280',
     viewConfig:{}
}

// 定义所需的 mutations
const mutations = {
    VIEWCONFIG(state,obj){
       state.viewConfig=obj
    },
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})