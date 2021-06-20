const path = require("path");
module.exports = {
    pluginOptions: {
        "style-resources-loader": {
          preProcessor: "less",
          patterns: [path.resolve(__dirname, "src/global.less")]
        }
      },
      devServer:{
        port: 10999
      }  
};