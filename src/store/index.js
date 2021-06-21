import mutations from './mutations.js'
import action from './action.js'
import Vuex from 'vuex'

const  state={
    login:false, //是否登录
    userInfo:null, //用户信息
    cartList:[], //加入购物车列表
    showMoveImg:false, //显示飞入图片
    elLeft:0,
    elTop:0,
    moveImgUrl:null,
    cartPositionT:0,//购物车位置
    cartPositionL:0,
    receiveIncart:false, //是否进入购物车
    showCart:false
}

export default new Vuex.Store({
    state,
    action,
    mutations
})