import http from './public'

//首页接口
export const productHome=(params)=>{
    return http.doGet('/goods/home',params);
}

//用户信息 
export const userInfo=(params)=>{
    return http.doGet('/user/checkLogin',params);
}
