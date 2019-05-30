(function ($, root) {
    var dur;
    var curTimer;
    var per;
    var frameId;
    var startTime;

    // 当前时间 进度条 总时间


    // 渲染总时间
    function renderAllTime(time) {

        dur = time;
        time = formaTime(time);
        $('.all-time').html(time);
    }


    // 工具方法，格式化时间
    function formaTime(time) {
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var s = time % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }

    // 
    function start() {
        curTimer = setInterval(function () {
            var currentTime = audio.audio.currentTime;
            per = currentTime / dur;  
            $('.pro-top').width(per * 100 + "%");     
            $(".cur-time").html(formaTime(currentTime));
        }, 1000);
    };

    function stop() {
        if (audio.status == "pause") {
            clearInterval(curTimer)
        }
    }


    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop
    }

})(window.Zepto, window.player || (window.player = {}))