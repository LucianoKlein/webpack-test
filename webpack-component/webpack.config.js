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
                tets: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
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