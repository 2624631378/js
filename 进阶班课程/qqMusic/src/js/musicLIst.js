(function ($, root) {
    

    function musicList(data) {
        var str = '';
        data.forEach(function(ele,index){
            str += '<li>'+(index+1)+ ele.singer+ ele.song+'</li>';
        });
        $(".musicList ul").html(str);

    }

    root.getList =  function(data){
        musicList(data);
    }

})(window.Zepto, window.player || (window.player = {}));