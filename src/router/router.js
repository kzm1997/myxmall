import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('../pages/index.vue')
const Register=()=>import('../pages/login/register.vue')
const Login=()=>import('../pages/login/login.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/home',
      children: [{
          path: 'home',
          name: 'home',
          component: () => import('../pages/Home/home.vue')
        }
      ]
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})
