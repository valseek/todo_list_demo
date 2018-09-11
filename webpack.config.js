let path = require('path')
let webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: "development",
    entry: __dirname + "/frontend/main.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/static/dist",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            }
        ]
    },
    devServer: {
        contentBase: [path.join(__dirname , 'static/dist')],
        compress: true,
        port: 9123,
        open:"Google Chrome",
        openPage:'index.html'
    },
    resolve: {
        extensions: ['.js', '.css', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                vue: {
                    postcss: [
                        require('autoprefixer')(),
                    ]
                },
                postcss: [
                    require('autoprefixer')(),
                ],
            }
        }),
        new VueLoaderPlugin()
    ]
}