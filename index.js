$(function(){

    const map = new Map();

    $('.bur').click(function () {
        var _name = $('.name').val();
        var _msg = $('.message').val();
        map.set( _name,_msg);
        listshow();
    })

    let listshow =() =>{
        var str = '';
        for(let [key ,value] of map){

            str += `                
            <li>${key} 说 ${value}</li>  
            ` //ES6语法，模板字符串，注意变量引用方式
        };
        $(".ms").html(str);
    }



})