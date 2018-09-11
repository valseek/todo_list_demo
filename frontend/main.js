import app from './apps/index'
import Vue from 'vue'
import './style/common.css'
import VueRouter from 'vue-router'
import Edit from './apps/edit'
import List from './apps/list'
import VueSvgicon from 'vue-svgicon'

let routers = [
    {
        path:"/edit",
        component:Edit
    },
    {
        path:"/list",
        component:List
    }
];

let router = new VueRouter({routes:routers});

Vue.use(VueRouter)
Vue.use(VueSvgicon,{
    tagName:'svgicon'
})

new Vue({
    el:"#vue-app",
    router,
    render:h=>h(app)
})
