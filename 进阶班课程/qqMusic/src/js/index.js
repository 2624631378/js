 var root = window.player;
 console.log(root);

 var nowIndex = 0;
 var dataList;
 var len;
 var audio = root.audioManager;
 var timer;
 var sporPer;

 function getData(url) {
     $.ajax({
         type: 'GET',
         url: url,
         success: function (data) {
             dataList = data;
             len = dataList.length;
             root.getList(dataList);
             root.render(dataList[0]);
             audio.getAudio(dataList[0].audio);
             root.pro.renderAllTime(dataList[0].duration);
             bindEvent();
             bindTouch();

         },
         error: function () {
             console.log('error');
         }
     })
 }

 getData("../mock/data.json");

 // 渲染数据


 // 点击按钮 暂停播放 切换 列表切换
 function bindEvent() {

     $("body").on("mychange", function () {
         root.render(dataList[nowIndex]);
         audio.getAudio(dataList[nowIndex].audio);
         $('.img-box').attr("data-deg", '0');
         $('.img-box').css({
             "transform": 'rotateZ(0deg)',
             "transition": 'none'
         })
         audio.play();

         rotated(0);
         $(".play").addClass('playing');
         root.pro.renderAllTime(dataList[nowIndex].duration);
         root.pro.start();
     });

     $('.prev').on('click', function () {
         if (nowIndex == 0) {
             nowIndex = len - 1;
         } else {
             nowIndex--;
         }
         $("body").trigger("mychange");
     });

     $('.next').on('click', function () {
         if (nowIndex == len - 1) {
             nowIndex = 0;
         } else {
             nowIndex++;
         }
         $("body").trigger("mychange");
     });

     $(".play").on('click', function () {
         if (audio.status == "pause") {
             var deg = $('.img-box').attr("data-deg");
             audio.play();
             root.pro.start();
             rotated(deg);
             $(".play").addClass('playing');
         } else {
             audio.pause();
             clearInterval(timer);
             root.pro.stop();

             $(".play").removeClass('playing');
         }
     });
     $(".list").on('click', function () {

         $(".list").toggleClass('listing');
         $(".musicList").toggleClass('musicListing');
     })

     $(".musicList  ul li").on('click', function (index) {
         nowIndex = $(this).index();
         $("body").trigger("mychange");
         $('.musicList').css({
             "transition": '3s linear'
         })
         $(".musicList").toggleClass('musicListing');
     })


 }


 function bindTouch() {
     var $spot = $(".spot");
     $spot.on("touchstart", function () {
         audio.pause();
         root.pro.stop();
     });
     $spot.on("touchmove", function (e) {
         audio.pause();
         root.pro.stop();
         var spotAll = e.changedTouches[0].clientX;
         var spotX = spotAll - $('.cur-time').width();
         var proBottomWidth = $(".pro-bottom").width();
         sporPer = spotX / proBottomWidth;
         if (sporPer >= 0 && sporPer <= 1) {
             root.pro.start();
             $('.pro-top').width(sporPer * 100 + "%");
         } else {
             return;
         }

     });
     $spot.on("touchend", function (e) {
         if (sporPer >= 0 && sporPer <= 1) {
             var touchCurTime = sporPer * audio.audio.duration;
             audio.audio.currentTime = touchCurTime;
             root.pro.start();
             audio.play();
         } else {
             return;
         }


     })
 }


 setInterval(function () {
     if (audio.audio.currentTime == audio.audio.duration) {
         nowIndex += 1;
         if (nowIndex > len - 1) {
             nowIndex = 0;
         }
         $("body").trigger("mychange");
     }
 }, 1000);

 // 进度条效果

 // 图片旋转

 function rotated(deg) {
     clearInterval(timer);
     deg = parseInt(deg);
     timer = setInterval(function () {
         deg += 10;
         $('.img-box').attr("data-deg", deg)
         $('.img-box').css({
             "transform": 'rotateZ(' + deg + 'deg)',
             "transition": 'rotateZ 3s linear 2s'
         })
     }, 200)

 }

 // 