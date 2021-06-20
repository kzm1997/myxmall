
import Vue from 'vue'
import Router from 'vue-router'
const Index=()=>import('../pages/index.vue')
const Home=()=>import('../pages/Home/home.vue')
Vue.use(Router)


export default new Router({
    routers:[
        {
           path:'/',
           component: Index,
           name: 'index',
           redirect:'/home',
           children:[
               {path:'home',component:Home}
           ]
        }
    ]
})