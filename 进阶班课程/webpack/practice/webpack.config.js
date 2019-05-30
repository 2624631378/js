
const path = require('path');  // node里面的提供的方法
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装

module.exports = {
    // entry: './src/index.js', // 入口是字符串形式
    
    entry:{   // 对象形式入口
      index:'./src/index.js',
      app:'./src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),  //paht是node提供的  --dirname 找到当前文件目录 
        // filename: 'my-first-webpack.bundle.js',  //输出的文件名字为固定名字

        filename:'[name].bundle.js'  // 以打包的文件名字命名输出的文件
    },
    module: {
        rules: [
          { test: /\.less$/, use: ['style-loader','css-loader','less-loader'] }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin()
      ],
    mode:'development'
}