import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        keywords:''
    },
    mutations: {
        changeKeyWords(state,data){
            state.keywords=data;
        },
    },
})
export default store
    
