const path = require('path')

function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
    css: {
        requireModuleExtension: true,
        sourceMap: true
    },
    devServer: {
        port: 10999
    },
    chainWebpack:(config)=>{
        config.resolve.alias
        //set第一个参数：设置的别名，第二个参数：设置的路径
        .set('@',resolve('./src'))
　　　　
    }
}
