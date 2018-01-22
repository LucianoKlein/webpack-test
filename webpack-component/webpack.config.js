var htmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
module.exports = {
    entry: {
        app: __dirname + '/src/app.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].bundle.js'
    },
    //配置loader
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: __dirname + '/node_modules/',
                //exclude: path.resolve(__dirname,'node_modules'),
                include: __dirname + '/src/',
                //include: path.resolve(__dirname,'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['latest'] //babel处理语法的规则
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html',
            title: 'App',
            inject: 'body'
        })
    ]
}