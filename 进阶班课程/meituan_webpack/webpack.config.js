const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: './src/js/meituan.js',
        info: './src/js/info.js'
    },
    output: {
        filename: 'js/[name][hash:5].js',
        path: path.resolve(__dirname, 'dist'),

    },
    plugins: [


        new HtmlWebpackPlugin({
            filename: 'index.html', // 打包之后的文件名字
            template: './src/index.html', // 打包的模板文件
               minify:{   // 压缩html文件
                 removeComments:true, // 清理注释
                //  collapseWhitespace: true, // 清理空格
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'meituan-detail.html', // 打包之后的文件名字
            template: './src/meituan-detail.html', // 打包的模板文件
            minify:{   // 压缩html文件
                removeComments:true, // 清理注释
               //  collapseWhitespace: true, // 清理空格
           }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg|woff|eot|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[name][hash:5].[ext]',
                        outputPath: 'img'

                    }
                }, ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }

                }]

            }
        ]

    },
    mode: 'development',
    devServer: {
        // contentBase:path.resolve(__dirname,'dist'),
        port: '8989',
        hot: true,
        open: true
    }
}