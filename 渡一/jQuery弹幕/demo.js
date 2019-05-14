$(function () {
    var boxDom = $('.boxDom');
    var btn = document.getElementById('btn');
    console.log(btn)

    var top, right;
    var pageWidth = parseInt($(document).width());
    var pageHeight = parseInt($(document).height());
    console.log(pageHeight)
    // $('#btn').bind("click", auto);
    // btn.addEventListener('click', function() {

    //     auto();
    // })

    btn.addEventListener('click', function () {
        auto();

    })

    document.onkeydown = function (e) {
        var e = e || windows.event;
        if (e.keyCode == 13) {
            auto();
        }
    }

    function auto() {
        var str = $('.text').val();
        if (str == '') {
            alert('请输入弹幕');
            return false;

        } else {
         
            var creatSpan = $('<span class="string"></span>');
            creatSpan.text(str);
            $('.text').val("");
            top = Math.floor(Math.random() * (pageHeight - 140));
            creatSpan.css({
                "top": top,
                "right": -400,
                "color": getcolor()
            })
            boxDom.append(creatSpan);
            var spandom = $("#boxDom>span:last-child");   //  此处last-child ？
            spandom.animate({
                    "right": pageWidth + 300
                },
                10000,
                function () {
                    $(this).remove();
                }
            )
        }
    }

    function getcolor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
        return color;


    }


})