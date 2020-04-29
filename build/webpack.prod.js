const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const Optimizecss = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require("webpack")
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

const pkg = require("../package.json")
const banner = `${pkg.name}
${pkg.description}\n
@version v${pkg.version}
@repository ${pkg.repository.url}\n
(c) 2019 ${pkg.author}
Released under the ${pkg.license} License.`


module.exports = merge({
        mode: 'production',
        output: {
            filename: 'js/[name].[contenthash].js',
            chunkFilename: 'js/[name].[contenthash].js'
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [{
                            loader: MinCssExtractPlugin.loader,
                            options: {
                                filename: '[name].css',
                                chunkFilename: '[name].css',
                                publicPath: '../'
                            }
                        },
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
                    use: [{
                            loader: MinCssExtractPlugin.loader,
                            options: {
                                filename: '[name].css',
                                chunkFilename: '[name].css',
                                publicPath: '../'
                            }
                        },
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
                                resources: path.resolve(__dirname, "../src/lib/style/base.scss"),
                            },
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [{
                            loader: MinCssExtractPlugin.loader,
                            options: {
                                filename: '[name].css',
                                chunkFilename: '[name].css',
                                publicPath: '../'
                            }
                        },
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
        optimization: {
            minimizer: [
                new TerserPlugin({ // 压缩js代码
                    cache: true, // 启用文件缓存
                    parallel: true, // 使用多进程并行执行任务来提高构建效率
                    sourceMap: true, // 将错误消息位置映射到模块
                    terserOptions: {
                        drop_console: true, // 打包时剔除所有console.log
                        drop_debugger: true // 打包时剔除所有debugger
                    }
                }),
            ]
        },
        plugins: [
            new MinCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
                chunkFilename: 'css/[name].[contenthash].chunk.css'
            }),
            new Optimizecss(),
            new CleanWebpackPlugin(),
            new webpack.BannerPlugin(banner)
        ]
    },
    base)