import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('../pages/index.vue')
const Register=()=>import('../pages/login/register.vue')
const Login=()=>import('../pages/login/login.vue')
const goodsDetails=()=>import('../pages/Goods/goodsDetails.vue')
const checkout=()=>import('../pages/Checkout/checkout.vue')
const cart=()=>import('../pages/Cart/cart.vue')

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
        },
        {
          path:'goodsDetails',
          name:'goodsDetails',
          component:goodsDetails
        },
        {
          path:"/checkout",
          name:'checkout',
          component:checkout
        },
        {
          path:'/cart',
          name:'cart',
          component:cart
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
