// webpack --config 配置文件名   指定webpack配置文件
module.exports = {
    entry: __dirname + '/src/script/main.js',
    output: {
        path: __dirname + '/dist/js',
        filename: 'bundle.js'
    }
}