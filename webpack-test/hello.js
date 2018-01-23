require('./world.js')
require('style-loader!css-loader!./style.css')
require('./style.css')
//css-loader使得webpack可以处理css文件
//style-loader使得webpack可以将处理过css文件以style标签的形式插入页面
//命令行指定css文件处理需要的loader
//webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader' 
//指定处理某类文件需要的loader --module-bind 'css=style-loader!css-loader'
//监听文件变化 自动打包 --watch
//打包过程 --progress
//打包模块 --display-modules
//显示打包模块的原因 --display-reasons
function hello(str){
    alert(str);
}
hello('hello-web')

//npm install css-loader style-loader --save-dev