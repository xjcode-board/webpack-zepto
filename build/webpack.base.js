const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const webpack = require('webpack')

//多入口
const entries = getEntries('src/view/**/index.js');
let htmlPlugins = []

function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach(function (filepath) {
        var split = filepath.split('/');
        var name = split[split.length - 2];

        entries[name] = './' + filepath;
    });

    return entries;
}

Object.keys(entries).forEach(function (name) {
    let plugin = new HtmlWebpackPlugin({
        filename: name + '.html',
        template: "src/view/" + name + "/index.html",
        inject: true,
        chunks: ['common', 'vender', name],
        minify: false
    });
    htmlPlugins.push(plugin)
})

module.exports = {
    entry: entries,
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@lib': path.resolve(__dirname, '../src/lib'),
        },
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            // html标签图片引入
            {
                test: /\.(htm|html)$/,
                use: [{
                    loader: 'html-loader',
                }, ],
            },
            //支持pug
            {
                test: /\.pug$/,
                loader: ['raw-loader', 'pug-html-loader']
            },
            //支持ts
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            //es6-->es5
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        outputPath: 'images/',
                        limit: 4096
                    }
                }, {
                    loader: 'img-loader',
                    options: {
                        plugins: [
                            require('imagemin-pngquant')({
                                floyd: 0.5,
                                speed: 2,
                                quality:[0.5,0.8]
                            })
                        ]
                    }
                }]
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            }

        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vender'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    name: 'common',
                    reuseExistingChunk: true
                }
            }
        },
        usedExports: true
    },
    plugins: [
        ...htmlPlugins,
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(require('./env.js')[process.env.NODE_ENV])
        })
    ]
}