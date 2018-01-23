//import tpl from './layer.html'
//html-loader处理后tpl.html文件，返回值为字符串，可直接插入
import tpl from './layer.tpl'
//ejs-loader处理后的tpl.tpl文件,返回值为可执行的函数
import './layer.less'
function layer() {
    return {
        'name': 'layer',
        'tpl': tpl//ejs-loader处理后，tpl为可执行函数，所以可在app.js执行
    }
}
export default layer