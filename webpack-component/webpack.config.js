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
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: 'latest'
                    }
                }, ],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
                //旧版本webpack 2.0
                //exclude: __dirname + '/node_modules/',
                //include: __dirname + '/src/',
                //loader: 'babel-loader',
                //query: {
                //presets: ['latest'] //babel处理语法的规则
                //}
            },
            //处理css文件需要安装的loader有：style-loader，css-loader，postcss-loader。
            //配合postcss-loader使用需要安装插件有：postcss-import，autoprefixer。
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 //表示在css-loader之后指定1个数量loader来处理@import进来的资源
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            //postcss-loader的插件的引用
                            plugins: [
                                require('postcss-import'), //使css文件可以使用@import语法进行引入
                                require('autoprefixer')({
                                    browsers: ['last 5 versions'] //自动添加浏览器css属性的浏览器前缀
                                })
                            ]
                        }
                    }
                ]
                //loader: 'style-loader!css-loader!postcss-loader'
                //loaders: ['style-loader','css-loader','postcss-loader']
            },
            //处理less文件中引入postcss-loader顺序， less> postcss>css>style
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 //表示在css-loader之后指定1个数量loader来处理@import进来的资源
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            //postcss-loader的插件的引用
                            plugins: [
                                require('postcss-import'), //使css文件可以使用@import语法进行引入
                                require('autoprefixer')({
                                    browsers: ['last 5 versions'] //自动添加浏览器css属性的浏览器前缀
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            //处理sass，同less配置原理可得
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 //表示在css-loader之后指定1个数量loader来处理@import进来的资源
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            //postcss-loader的插件的引用
                            plugins: [
                                require('postcss-import'), //使css文件可以使用@import语法进行引入
                                require('autoprefixer')({
                                    browsers: ['last 5 versions'] //自动添加浏览器css属性的浏览器前缀
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
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