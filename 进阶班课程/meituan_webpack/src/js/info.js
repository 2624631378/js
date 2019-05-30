import '../css/reset.css';
import '../webfont/iconfont.css';
import '../css/meituanDetail.css';
import $ from 'jquery';
import qs from 'qs';
var url = require('./ajax');

function getData() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url.index,
        success: function (data) {
            getInfo(data);
        },
        error: function () {
            alert('error')
        }
    })

}

function getInfo(data) {
    var obj = qs.parse(window.location.search.substr(1));
    var id = obj.id;
    var dataArr = data.list;
    var len = dataArr.length;
    for (var i = 0; i < len; i++) {
        if (id == dataArr[i].id) {
            console.log(dataArr[i]);
            addDom(dataArr[i]);
            return;
        }
    }
}

function addDom(data) {
    var detailInfo = data.info;
    var commentList = data.info.comment;
    var str = '';
    $('.bigimg').find('img').attr('src', detailInfo.imgurl);
    $('.linnebg').find('dl>.name').text(detailInfo.name);
    $('.linnebg').find('dl>.des').text(detailInfo.des);
    $('.price-box').find('.price>p>strong').text(detailInfo.price);
    $('.tell').find('#icon-2>strong').text(detailInfo.sale);
    $('.address').find('h4').text(detailInfo.receive);
    $('.address').find('p').text(detailInfo.adderess);
    commentList.forEach(element => {
        str += `<li class="item-evaluate">
                    <div class="foot-user clearfix">
                        <img src="${element.pic}" alt="">
                        <div class="user-strart">
                            <h5>${element.user}</h5>
                        </div>
                        <p class="evaluate-date">${element.date}</p>
                    </div>
                    <div class="evaluate-content">
                        <p>${element.content}</p>
                        <p>
                            <span>
                                <img src="${element.img}" alt="">
                            </span>
                        </p>
                    </div>
                    <div class="locale">
                        <a href="###">西树泡芙（地王广场店）</a>
                    </div>
                </li>`

    });
    $('.food-evaluate').find('ul').html(str);
}
getData();