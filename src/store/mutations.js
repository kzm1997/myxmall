import { getStore } from '../utils/store'
import {
    INIT_BUYCART,
    ADD_CART,
    GET_USERINFO,
    RECORD_USERINFO,
    ADD_ANIMATION,
    SHOW_CART,
    REDUCE_CART,
    EDIT_CART
  } from './mutation-types'

  export default {
      //网页初始化时从本地获取购物车数据
      [INIT_BUYCART](state){
         let initCart=getStore('buyCart');
         if(initCart){
             state.cartList=JSON.parse(initCart);
         }
      }
  }
