
import { getStore, setStore } from '../utils/store.js'
import {
    INIT_BUYCART,
    ADD_CART,
    RECORD_USERINFO,
    SHOW_CART,
    ADD_ANIMATION,
    EDIT_CART
} from './mutationType.js'

export default {
    //网页初始化时从本地获取购物车数据
    [INIT_BUYCART](state) {
        let initCart = getStore('buyCart');
        if (initCart) {
            state.cartList = JSON.parse(initCart);
        }
    },
    //加入购物车
    [ADD_CART](state, { productId, salePrice, productName, productImg, productNum = 1 }) {
        let cart = state.cartList;
        let flag = true;
        let goods = {
            productId,
            salePrice,
            productName,
            productImg
        }
        console.log(goods);
        if (cart.length) {
            cart.forEach(element => {
                if (element.productId == productId) {
                    if (element.productNum >= 0) {
                        flag = false;
                        element.productNum += productNum;
                    }
                }
            });
        }

        if (!cart.length || flag) {
            goods.productNum = productNum
            goods.checked = '1'
            cart.push(goods);
        }

        state.cartList = cart;
        //存入localStorage
        setStore('buyCart', cart);
    },
    //记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        state.login = true;
        setStore('userInfo', info);
    },
    [SHOW_CART](state, { showCart }) {
        state.showCart = showCart;
    },
    // 加入购物车动画
    [ADD_ANIMATION](state, { moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart }) {
        state.showMoveImg = moveShow
        if (elLeft) {
            state.elLeft = elLeft
            state.elTop = elTop
        }
        state.moveImgUrl = img
        state.receiveInCart = receiveInCart
        if (cartPositionT) {
            state.cartPositionT = cartPositionT
            state.cartPositionL = cartPositionL
        }
    },
    [EDIT_CART](state,{productId,productNum,checked}){
        let cart=state.cartList;
        if(productNum){
            cart.forEach((item)=>{
                if(item.productId==productId){
                    item.productNum=productNum;
                    item.checked=checked;
                }
            })
        }else if(productId){
            cart.forEach((item, i) => {
                if (item.productId === productId) {
                  cart.splice(i, 1)
                }
              })
        }else{
            cart.forEach((item) => {
                item.checked = checked ? '1' : '0'
              })
        }
        state.cartList=cart;
        setStore('buyCart',state.cartList);
    }
}


