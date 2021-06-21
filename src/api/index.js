import http from './public'

//首页接口
export const productHome=(params)=>{
    return http.doGet('/goods/home',params);
}