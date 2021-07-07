import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css';

import { userInfo } from './api'
import store from './store/index.js'
import {
Button, Pagination, Checkbox, Icon, Autocomplete, Loading, Message, Carousel, CarouselItem,
Notification, Steps, Step, Table, TableColumn, Input, Dialog, Select, Option
} from 'element-ui'
import { getStore } from './utils/store.js';
Vue.config.productionTip = false

const whiteList = ['/home', '/goods', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
     let params={
        token:getStore('token')
    } 
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next();
  }
    userInfo(params).then(
      res=>{
      if(res.result.state !==1){ //没登录
           if(whiteList.indexOf(to.path)!==-1){
             next();
           }else{
             next('/login')
           }
      }else{
        console.log(22223);
         store.commit('RECORD_USERINFO',{info:res.result})
         if(to.path==='/login'){ //跳转到
           next({path:'/'})
         }
         next()  
      }
    }
    ) 
})



Vue.use(Button)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(VueLazyload,
  {
    loading: '/static/images/load.gif'
  }
)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')




