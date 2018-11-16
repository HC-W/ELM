import Vue from 'vue'
import Vuex from 'vuex'
import City from './city'
import Shop from './shop'
Vue.use(Vuex)

export default new Vuex.Store({
    // vuex严格模式
    // strict: true,
    modules: {
        City,
        Shop
    }
})