require('./world.js')
require('style-loader!css-loader!./style.css')
function hello(str){
    alert(str);
}
hello('hello-web')

//npm install css-loader style-loader --save-dev