import './index.css';
console.log(123);

//引入data.json方法一
// var json = require('./data.json');
// console.log(json);

//引入data.json方法二 利用jquery的ajax方法
import $ from 'jquery'
// $.ajax({
//     url:'http://localhost:8080/data.json',
//     success:function(res){
//         console.log(res);      

//     },
//     error:function(){
//         console.log('error');
        
//     }
 

// })

var oButton = $('button')[0];
oButton.onclick=function(){
    console.log(oButton)
}



