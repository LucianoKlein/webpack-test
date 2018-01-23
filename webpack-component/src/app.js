import './css/common.css' //引用公共样式
import Layer from './components/layer/layer.js' //引用组件
const App = function () {
   var dom = document.getElementById('app')
   console.dir(dom)
   var layer = new Layer()
   dom.innerHTML = layer.tpl({
       'name': 'ejs-loader',
       'arr':['wjm','mjw','zzz'],
       'object': {
           's-name': 'wjm',
           's-age': 18
       }
    })
}
new App()