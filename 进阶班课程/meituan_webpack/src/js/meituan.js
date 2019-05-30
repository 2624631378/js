import '../css/reset.css';
import '../webfont/iconfont.css';
import '../css/meituanIndex.css';
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import $ from 'jquery';
var url = require('./ajax');


$(function () { 
    //初始化插件实例
    var swiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true,
        // 父级
        pagination: {
            el: '.swiper-pagination',
          },
        // 3D轮播
        effect: 'cube',
        cube: {
            // 下侧阴影
            shadow: false,
            // 每一个轮播区域的阴影
            slideShadows: false,
        }
    });
});

function getData() {

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url.index,
        success: function (data) {
            console.log('123');
            
            addDom(data);
        },
        error: function () {
            alert('error')
        }
    })
}
getData();

function addDom(data) {
    var dataArr = data.list;
    var str = '';
    dataArr.forEach(ele => {
        str += `<li class="foodspic">
    <a href="./meituan-detail.html?id=${ele.id}" class="clearfix">
        <img src="${ele.info.imgurl}" alt="">
        <dl>
            <dt>${ele.info.name}</dt>
            <dd>
                <p class="foodtitle">${ele.info.des}</p>
                <p class="price">
                    <span><strong>${ele.info.price}</strong><i>元</i></span>
                    <span>${ele.info.newUser}</span>
                    <span>${ele.info.sale}</span>
                </p>
            </dd>
        </dl>
    </a>
</li>`
    });
    $(".list").html(str);
}

window.onscroll = function () {
    var top = $(window).scrollTop();
    if (top > 200) {
        $('#gotop').slideDown();
    } else {
        $('#gotop').slideUp();
    }
}

$('#gotop').on('click',function(){
    $('html,body').animate({
        scrollTop:0
    },1000)
})