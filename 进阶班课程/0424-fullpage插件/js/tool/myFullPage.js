$.fn.extend({
    myFullPage: function (config) {
        var colosArray = config.colorArray;
        var $W = $(this);
        var $Section = $W.find('.section');
        var commonStyle = {
            width: '100%',
            height: '100%',
        }
        var clientWidth = $(window).outerWidth();
        var clientHeight = $(window).outerHeight();
        console.log(clientHeight);

        var curIndex = 0;
        var lock = true;

        //初始化样式
        $('html').add('body').css({
            position: 'relative',
            margin: 0,
            overflow: 'hidden',
        }).add($W).add($Section).css(commonStyle);
        $W.css({
            position: 'absolute',
            top: 0,
            left: 0,
        }).find('.section').each(function (index, ele) {
            $(ele).css({
                backgroundColor: colosArray[index],
                position: 'relative',
            }).find('.slide').css({
                float: 'left',
                height: clientHeight,
                width: clientWidth,
            }).wrapAll(' <div class="slideWrapper"></div>')
        })

        $Section.find('.slideWrapper').each(function (index, ele) {
            $(ele).css({
                width: $(ele).find('.slide').size() * clientWidth,
                height: clientHeight,
            })
        })


        // js控制移动
        // active
        // 先给第一section active
        // 给每一个section 下面的slide innerActive
        $Section.eq(0).addClass('active').end().find('.slideWrapper').css({
            position: 'absolute',
            top: 0,
            left: 0,
        }).each(function (index, ele) {
            $(ele).find('.slide').eq(0).addClass('innerActive');
        })

        // js控制移动
        $(document).on('keydown', function (e) {
            if (e.keyCode == 38 || e.keyCode == 40) {
                //垂直移动 $w
                if (lock) {
                    lock = false;
                    var newTop = $W.offset().top;
                    var direction = '';
                    if (e.keyCode == 38 && curIndex != 0) {
                        direction = 'top';
                        config.onLeave(curIndex,direction);
                        curIndex--;
                        newTop += clientHeight;
                       
                    } else if (e.keyCode == 40 && curIndex != ($Section.size() - 1)) {
                        direction = 'bottom';
                        config.onLeave(curIndex,direction);
                        curIndex++;
                        newTop -= clientHeight;
                       
                    }
                    $W.animate({
                        top: newTop
                    }, 350, 'swing', function () {
                        lock = true;
                        $Section.eq(curIndex).addClass('active');
                        if (direction == 'top') {
                            $Section.eq(curIndex + 1).removeClass('active')
                        } else {
                            $Section.eq(curIndex - 1).removeClass('active')
                        }
                        config.afterLoad(curIndex,direction);
                    })
                }
            }

            if (e.keyCode == 37 || e.keyCode == 39) {
                if (lock) {
                    lock = false;
                    //水平移动 
                    var $SW = $('.active').find('.slideWrapper')
                    var curShowDom = $SW.find('.innerActive');
                    var newLeft = $SW.offset().left;
                    var direction = '';
                    if (e.keyCode == 37 && curShowDom.index() != 0) {
                        newLeft += clientWidth
                        direction = 'left';
                    } else if (e.keyCode == 39 && curShowDom.index() != $SW.find('.slide').size() - 1) {
                        newLeft -= clientWidth;
                        direction = 'right';
                    }
                    $SW.animate({
                        left: newLeft
                    }, 20, 'swing', function () {
                        lock = true;
                        direction == null ? '' : curShowDom.removeClass('innerActive');
                        if (direction == 'left') {
                            curShowDom.prev().addClass('innerActive')
                        } else {
                            curShowDom.next().addClass('innerActive')
                        }
                    })
                }
            }
        })
    }
})