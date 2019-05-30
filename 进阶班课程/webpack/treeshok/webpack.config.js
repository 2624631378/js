const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob-all');
const path = require('path');
const  PurifyCSSPlugin = require("purifycss-webpack");

module.exports = {


    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader'
                }]
            },
       
        ],

    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            // chunkFilename: '[id].css',
        }),
        new PurifyCSSPlugin({
            paths: glob.sync([path.join(__dirname, './*.html'),path.join(__dirname, './src/*.js')]), //此处添加数据 匹配js中动态生成的标签样式  故glob应该用 glob-all  则需要先安装 npm install glob-all
        }),
        new WebpackDeepScopeAnalysisPlugin(),
       
    ]
}