// webpack --config 配置文件名   指定webpack配置文件
var htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        main: __dirname + '/src/script/main.js',
        test: __dirname + '/src/script/test.js'
    },
    output: {
        //name hash chunkhash==>可视为文件的版本号，当文件发生改变时，这个值会发生变化
        path: __dirname + '/dist/js',
        filename: '[name]-[chunkhash].js'
    },
    plugins: [
        new htmlWebpackPlugin()
    ]
}