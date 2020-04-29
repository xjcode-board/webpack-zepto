const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const base = require('./webpack.base')


module.exports = merge({
    mode:'development',
    devtool: 'source-map',
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'sass-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: path.resolve(__dirname,"../src/lib/style/base.scss"),
                        },
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'less-loader',
                    'postcss-loader' 
                ]
            },
        ]
    },
    devServer: {
        port:'8081',
        historyApiFallback:true,
        contentBase:'../dist',
        open:true,
        hot:true,
        proxy:{
            index:'',
            'api/':{
                target:'https://api.com',
                secure:false,
                changeOrigin:true
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    output:{
        filename:'[name].js',
        chunkFilename:'[name].js'
    }
},base)