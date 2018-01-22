var htmlWebpackPlugin = require('html-webpack-plugin')
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
        loaders: [
            {
                test: /\.js$/,
                exclude: __dirname + '/node_modules/',
                include: __dirname + '/src/',
                loader: 'babel-loader',
                // query: {
                //     presets: ['latest']
                // }
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