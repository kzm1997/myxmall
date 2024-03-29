import http from './public'

//首页接口
export const productHome=(params)=>{
    return http.doGet('/goods/home',params);
}

//用户信息 
export const userInfo=(params)=>{
    return http.doGet('/user/checkLogin',params);
}

//注册
export const register=(params)=>{
    return http.doPost('/member/register',params);
}


export const userLogin=(params)=>{
    return http.doPost('/member/login',params);
}

export const loginOut=(params)=>{
    return http.doGet('/member/loginOut',params);
}


