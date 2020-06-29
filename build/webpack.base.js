const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

let htmlPlugins = [],
    entries = {},
    entryFiles = glob.sync('src/view/**/*.js'),
    tplFiles = glob.sync('src/view/**/*.{html,pug}')

entryFiles.forEach(function (filepath) {
    let split = filepath.split('/');
    let name = split[split.length - 2];

    entries[name] = './' + filepath;
});

tplFiles.forEach(function (filepath) {
    let split = filepath.split('/');
    let name = split[split.length - 2];

    let plugin = new HtmlWebpackPlugin({
        filename: name + '.html',
        template: './' + filepath,
        inject: true,
        chunks: ['common', 'vender', name],
        minify: false
    });
    htmlPlugins.push(plugin)
})


module.exports = {
    entry: entries,
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@lib': path.resolve(__dirname, '../src/lib'),
            '@assets': path.resolve(__dirname, '../src/assets')
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
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
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