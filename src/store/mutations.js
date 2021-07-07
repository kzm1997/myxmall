import { getStore, setStore } from '../utils/store.js'
import {
    INIT_BUYCART,
    ADD_CART,
    RECORD_USERINFO,
    SHOW_CART
  } from './mutationType.js'

  export default {
      //网页初始化时从本地获取购物车数据
      [INIT_BUYCART](state){
         let initCart=getStore('buyCart');
         if(initCart){
             state.cartList=JSON.parse(initCart);
         }
      },
      //加入购物车
      [ADD_CART](state,{productId,salePrice,productName,productImg,productNum=1}){
          let cart=state.cartList;
          let flag=true;
          let goods={
              productId,
              salePrice,
              productName,
              productImg
          }
          if(cart.length){
              cart.forEach(element => {
                  if(element.productId==productId){
                      if(element.productNum>=0){
                          flag=false;
                          element.productNum+=productNum;
                      }
                  }
              });
          }

          if(!cart.length||flag){
              goods.productNum=productNum
              goods.checked='1'
              cart.push(goods);
          }

          state.cartList=cart;
          //存入localStorage
          setStore('buyCart',cart);
      },
      //记录用户信息
      [RECORD_USERINFO](state,info){
          state.userInfo=info;
          state.login=true;
          setStore('userInfo',info);
      },
      [SHOW_CART](state,{showCart}){
          state.showCart=showCart;
      }  
  }


