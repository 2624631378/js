var timer;
var per = 0;
timer = setInterval(function () {
    $('.bar').css('width', per + '%')
    per += 1;
    if (per > 100) {
        clearInterval(timer)
        $('.pageLoading').addClass('complate');
        setTimeout(() => {
            $('.monsterText').html('<h2>hahah </h2>')
        }, 3000);
    }
}, 30)