# Webpack深入与实战

## Webpack基本介绍

webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

webpack是高度可配置的，但配置前需要先理解四个核心概念：

1. 入口（entry）
1. 输出（output）
1. 文件处理器（loader）
1. 插件（plugins）

而使用webpack，则是为了达到以下目标：

1. 通过webpack打包处理，任何静态的资源都可以被视为一个模块，在项目中引用
1. weiback会切分代码中依赖树，会把依赖树切分到不同的代码块中， 按序加载这些依赖
1. webpack整合了第三方类库并且把第三方的类库也当做它的模块，从而通过webpack在项目中直接引用
1. webpack使得项目保持初始化的时间更少
1. webpack是高度配置的，所以适合大型项目

webpack相对于其他打包工具的不同之处在于：

1. webpack可进行代码分割
1. webpack有着极其丰富的loader生态
1. webpack支持模块热更新，极大地提升了开发和调试效率

[webpack官网](webpack.github.io/docs/what-is-webpack.html)
[webpack的GitHUb](github.com/webpack/webpack)

## Webpack 安装和命令行

在看了webpack的基本介绍后，相信你一定对webpack有了一定的认识。那么这一个章节里，我们就尝试使用npm来安装webpack。（ps：我的命令行环境是 window10 + git bash + VsCode,可自行配置）

1. 进入 git bash 命令行窗口，使用`npm i -g webpack`,全局安装webpack(参数-g的含义是代表安装到全局环境里面)
1. 安装完以后，运行`webpack --help`,如果看到类似下面的信息，说明安装成功

```.bash
webpack 1.14.0
Usage: https://webpack.github.io/docs/cli.html
...
...
--display-cached-assets
--display-reasons, --verbose, -v
```

1. 进入一个安全目录，比如`~/Desktop/weppack`,新建一个webpack测试文件夹`mkdir webpack-test`,并进入这个文件夹`cd webpack-tets`
1. 进入webpack-test文件夹后，输入`npm init`，初始化npm
1. 在webpack-test文件中安装webpack`npm install webpack --save-dev`(参数--save-dev的含义是代表把你的安装包信息写入package.json文件的devDependencies字段中)

通过以上命令，你就成功安装webpack了，可以配置webpack来测试它的打包功能了

## Webpack 初体验

在安装完webpack后，现在我们可以使用`webpack`来打包文件了

1. 使用VsCode打开webpack-test文件夹，新建一个`hello.js`的js文件,ji文件内容随意写入一个函数即可
1. 在webpack-test文件夹处打开命令行，输入`webpack hello.js hello.bundle.js`(前面是要打包的文件名字，后面是打包后输出的文件名字),命令执行后，看到`hello.js`文件已经被webpack处理了

![](http://photo.weibo.com/5143871593/photos/detail/photo_id/4199330977339665)

1. 打包成功后，我们可以看到已经有`hello.bundle.js`的文件生成，而里面的内容正是`hello.js`经过webpack流处理过的

通过`webpack hello.js hello.bundle.js`我们可以知道，webpack可以打包单个js文件，那如果需要打包的单个js文件依赖其他js文件，webpack是否也可以将这些依赖也打包处理呢？

1. 打开webpack-test文件夹，再建一个`world.js`的js文件,文件内容随意
1. 在`hello.js`中写入`require('./world.js')`(ps:webpack支持三种模块化方式：md，commonJs, es6.而require(‘.world.js’)的写法是commonJs的)
1. 再次运行`webpack hello.js hello.bundle.js`,可以看到这次打包加载了两个文件，分别是`hello.js`和`world.js`，说明单个js文件被webpack打包时，其依赖的其他js文件也会被打包处理

![](http://photo.weibo.com/5143871593/photos/detail/photo_id/4199331455498781)

那既然所依赖的js文件会被webpack流处理，我们很容易想到css文件是不是同样也会被处理呢？事实上，所依赖css文件同js文件一样会被打包处理，但由于webpack原生不支持css类型的文件，如果要处理css文件，就必须依赖loader

1. 在webpack-test文件夹处打开命令行，输入`npm install css-loader style-loader --save-dev`(安装css-loader以及style-loader)
1. 打开webpack-test文件夹，再建一个`style.css`的css文件,文件内容随意
1. 在`hello.js`中写入`require('./style.css');require('style-loader!css-loader!./style.css')`
1. 再次运行`webpack hello.js hello.bundle.js`,可以看到这次打包加载了三个文件，分别是`hello.js`、`world.js`和`style.css`

![](http://photo.weibo.com/5143871593/photos/detail/photo_id/4199334756395848)

通过以上命令，我们就已经初步了解并使用了webpack的打包功能。

此外`webpack hello.js hello.bundle.js`该命令还可增加参数，来达到不同的使用效果，常见的有：

- 监听文件变动自动打包：`webpack hello.js hello.bundle.js --watch`
- 查看打包的模块:`webpack hello.js hello.bundle.js --display-moudles`
- 查看打包的进度:`webpack hello.js hello.bundle.js --progress`

## 自定义Webpack配置文件

在Webpack初体验里，你一定注意到了，虽然我们利用webpack对js文件、css文件做了处理，但是并没有使用webpack配置文件，而是通过命令行手动输入需要打包处理的文件和处理后输出的文件名。这一章节里，我们就通过自定义webpack的配置文件，来进行打包处理

以下为准备工作

1. 进入`~/Desktop/weppack`，建立一个新的文件夹`mkidr webpack-demo`
1. 进入webpack-demo文件夹后，输入`npm init`，初始化npm
1. 在webpack-demo文件中安装webpack`npm install webpack --save-dev`
1. 在webpack-demo处打开命令行，一般而言，我们通常会在项目里创建一个存放源码的文件夹`mkdir src`，创建一个存放打包后代码的文件夹`mkidr dist`
1. 在`/webpack-demo/src`下新建script文件夹
1. 在`/webpack-demo/src/script`下新建main.js、a.js、b.js和c.js这几个js文件，文件内容随意
1. 在项目根目录`/webpack-demo`下，新建模板文件`index.html`，`index.html`可参考以下代码：

```html
!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <script type="text/javascript">
    <%= 
    compilation.assets[htmlWebpackPlugin.files.chunks.main.entry
    .substr(htmlWebpackPlugin.files.publicPath.length)].source()
    %>
    </script>
</head>
<body>
        <% for (var key in htmlWebpackPlugin.files.chunks) { %>
            <% if (key !== 'main') { %>
            <script type="text/javascript"
            src="<%= htmlWebpackPlugin.files.chunks[key].entry %>"></script>
            <% } %>
        <% } %>
</body>
</html>
```

然后我们开始书写webpack的配置文件.

webpack的配置文件有两种创建方式

1. 在项目根目录下创建webpack.config.比如我们的测试例，直接在webpack-demo目录下新建`webpack.config.js`，在该文件里填写好相应配置后，在命令行直接运行webpack即可。
1. 在项目根目录下自定义一个配置文件,比如`webpack.dev.config.js`，文件内容参考`webpack.config.js`，打包时命令行输入`webpack —config webpack.dev.config.js`
1. `webpack.config.js`中的配置内容如下：

```js
module.exports = {
    //entry为打包入口，需要打包的文件都可在这配置
    entry: {
        main: __dirname + '/src/script/main.js',
        a: __dirname + '/src/script/a.js',
        b: __dirname + '/src/script/b.js',
        c: __dirname + '/src/script/c.js',
    },
    //output为输出配置，输出路径、文件名、上线地址都可在这里配置
    output: {
        //[name] [hash] [chunkhash]==>可视为文件的版本号，当文件发生改变时，这个值会发生变化
        path: __dirname + '/dist',
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://cdn.com'//   线上地址，满足上线需求
    }
    plugins: [
        //多页面应用配置
        new htmlWebpackPlugin({
            filename: 'a.html',//index-[hash].html
            template: 'index.html',
            inject: false,//head body false
            title: 'A is good',
            date: new Date(),
            //压缩配置
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
```

通过以上步骤，你可以自动化生成html页面