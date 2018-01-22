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
        loaders: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: 'latest'
                        }
                    },
                ],
                exclude: path.resolve(__dirname,'node_modules'),
                include: path.resolve(__dirname,'src'),
                //旧版本webpack 2.0
                //exclude: __dirname + '/node_modules/',
                //include: __dirname + '/src/',
                //loader: 'babel-loader',
                //query: {
                    //presets: ['latest'] //babel处理语法的规则
                //}
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            //postcss-loader的插件的引用
                            plugins: [
                                require('postcss-import'),//使css文件可以使用@import语法进行引入
                                require('autoprefixer')({
                                    browsers: ['last 5 versions']//自动添加浏览器css属性的浏览器前缀
                                })
                            ]
                        }
                    }
                ]
                //loader: 'style-loader!css-loader!postcss-loader'
                //loaders: ['style-loader','css-loader','postcss-loader']
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