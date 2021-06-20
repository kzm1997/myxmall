import axios from 'axios'
axios.defaults.timeout=30000
export default {
    doGet(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,params).then(res=>{
                resolve(res.data)
            }).catch(error=>{
                reject(error);
            })
        })
    },
    doPost(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.post(url,params).then(res=>{
                resolve(res.data)
            }).catch(error=>{
                reject(error);
            })
        })
    }
}