import { getStore } from '../utils/store.js'
import {
    INIT_BUYCART
  } from './mutationType.js'

  export default {
      //网页初始化时从本地获取购物车数据
      [INIT_BUYCART](state){
         let initCart=getStore('buyCart');
         if(initCart){
             state.cartList=JSON.parse(initCart);
         }
      }
  }
