// webpack --config 配置文件名   指定webpack配置文件
var htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        main: __dirname + '/src/script/main.js',
        //test: __dirname + '/src/script/test.js',
        a: __dirname + '/src/script/a.js',
        b: __dirname + '/src/script/b.js',
        c: __dirname + '/src/script/c.js',
    },
    output: {
        //[name] [hash] [chunkhash]==>可视为文件的版本号，当文件发生改变时，这个值会发生变化
        path: __dirname + '/dist',
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://cdn.com'//   线上地址，满足上线需求
    },
    plugins: [
        //多页面应用配置
        new htmlWebpackPlugin({
            filename: 'a.html',//index-[hash].html
            template: 'index.html',
            inject: false,//head body false
            title: 'A is good',
            date: new Date(),
            minify: {
                removeComments: true,
                //collapseWhitespace: true
            },
            //excludeChunks: ['b','c'],
            chunks: ['main', 'a']
        }),
        new htmlWebpackPlugin({
            filename: 'b.html',//index-[hash].html
            template: 'index.html',
            inject: false,//head body false
            title: 'B is good',
            date: new Date(),
            minify: {
                removeComments: true,
                //collapseWhitespace: true
            },
            //excludeChunks: ['a','c'],
            chunks: ['main', 'b']
        }),
        new htmlWebpackPlugin({
            filename: 'c.html',//index-[hash].html
            template: 'index.html',
            inject: false,//head body false
            title: 'C is good',
            date: new Date(),
            minify: {
                removeComments: true,
                //collapseWhitespace: true
            },
            //excludeChunks: ['a','b'],
            chunks: ['main', 'c']
        })
    ]
}

    // <% %> 为模板引擎的写法
    // <%= 变量名%> 这表示赋值操作
    // <%for(var key in object)%> 这是执行代码 

//link 内联形式引入webpack打包后的js资源
//     < script type = "text/javascript" >
//     <%=
// compilation.assets[htmlWebpackPlugin.files.chunks.main.entry
//     .substr(htmlWebpackPlugin.files.publicPath.length)].source()
//     %>
//     </script >