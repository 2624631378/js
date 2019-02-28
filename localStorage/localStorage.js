$(function () {
    $('.bur').click(function () {
        var _name = $('.name').val();
        var _msg = $('.message').val();
        if (_name == '' || _msg == "") {
            alert('请输入正确的值')
        } else {
            var ts = Math.round(new Date().getTime() / 10).toString()  //设置时间戳为10位数
            _name = ts + _name;  //避免key重复，覆盖之前的值，保持Key值唯一
            localStorage.setItem(_name, _msg);
            $('.name,.message').val("");
            showlist();

        }
    });

    function showlist() {
        var str = '';
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i), //获取键
                value = localStorage.getItem(key); //根据键获取值
            var key = key.substring(12, 1000);   //截取取出的数据，清除掉前10位的时间戳
            str += `                
            <li>${key} 说 ${value}</li>  
            ` //ES6语法，模板字符串，注意变量引用方式
        }
        $(".ms").html(str);
    };

    $(".view").click(function () {
        showlist();
    });

    $(".ded").click(function () {
        localStorage.clear(); //清空所有的本地存储数据
        $(".ms").html('');
    });



    //注意事件委托的处理，保守做法所有的方法绑定皆可用on的方式绑定即可；
    $(".sfdg").on("click", ".del", function () {
        var name = $(this).parent().attr('data-name'); // .attr()获取自定义属性
        localStorage.removeItem(name); //根据键值删除本地存储数据
        $(this).parent().remove();
    });


})