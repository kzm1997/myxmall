import http from './public'

export const productDet=(params)=>{  
  return http.doGet('/goods/productDet',params);
}
//获取购物车列表
export const getCartList=(params)=>{
    return http.doPost('/goods/cartList',params);
}
//删除整个购物车
export const cartDel=(params)=>{
    return http.doGet('/goods/cartDel',params);
}
//搜索
export const getQuickSearch=(params)=>{
    return http.doGet('/goods/quickSearch',params);
}

//添加购物车
export const addCart=(params)=>{
    return http.doPost('/user/addCart',params);
}

//全选
export const editCheckAll=(params)=>{
    return http.doGet('/goods/editCheckAll',params);
}

//编辑购物车

export const cartEdit=(params)=>{
    return http.doPost('/goods/cartEdit',params);
}


