import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const allFiles = require.context('.',false,/\.router\.js$/);
const routerList = [];
allFiles.keys().forEach((fileName, index, array) => {
    routerList.push(allFiles(fileName).default)
})

export default new Router({
    routes:[
        {
            path: '/',
            redirect: 'index',
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('../components/Home.vue'),
            children: [
                ...routerList,
            ],
        },
        
    ]
})