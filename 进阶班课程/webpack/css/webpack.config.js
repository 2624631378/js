const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash:5].bundle.js'
    },
    module: {
        rules: [
            //     {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader
            //           },
            //     //     {
            //     //     loader: 'style-loader'
            //     //   },
            //      {

            //         loader: 'css-loader'
            //     }]
            // }

            {
                test: /\.less$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    //     {
                    //     loader: 'style-loader'  // 注意如果使用此模式，则在html中需要引用编译后的js文件
                    //   },
                    {

                        loader: 'css-loader'
                    },
                    {

                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                // require('cssnano')()
                            ]
                        }
                    },
                    {

                        loader: 'less-loader'
                    }

                ]
            }
        ]


    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash:5].css' // 抽离出来的css文件命名
        }),
        new HtmlWebpackPlugin({
            title:'my html',
      
            
           
            minify:{   // 压缩html文件
                 removeComments:true, // 清理注释
                //  collapseWhitespace: true, // 清理空格
            }
        }),
        new CleanWebpackPlugin()  // 清理之前生成的文件

    ],
    mode: 'development'


}