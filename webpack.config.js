var path = require('path')
var webpack = require('webpack')
const vueLoaderConfig = require('./build/vue-loader.conf.js')
const utils = require('./build/utils.js')
    // const ExtractTextPlugin = require("extract-text-webpack-plugin");
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: './src/main.js', // 打包发布时入口
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        // filename: 'build.js', // 打包后输出的文件名
        filename: 'mszj.js', // 我们可不想打包后叫build 多low啊 起一个与项目相对应的
        library: 'mszj', // library指定的就是你使用require时的模块名，这里便是require("ScadaDisplay")
        libraryTarget: 'umd', //libraryTarget会生成不同umd的代码，例如可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
        umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
    },
    module: { // loader
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(less)$/,
                loader: "less-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath('less/[name].[hash:7].[ext]')
                }
            },
            // {
            //     test: /\.(less|css)$/,
            //     use: [
            //         { loader: "css-loader" },
            //         { loader: "less-loader" }
            //     ],
            // },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map' // 生成map文件方便调试
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}