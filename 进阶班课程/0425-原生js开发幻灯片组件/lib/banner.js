function createBannerArea(dom, imgArr) {

    var obannerArea = document.createElement('div');
    var oList = document.createElement('div');

    //初始化样式
    dom.style.cursor = 'pointer';
    curIndex = 0;


    //初始化图片样式
    obannerArea.style.width = '100%';
    obannerArea.style.height = '100%';
    obannerArea.style.display = 'flex';



    //初始化切换图标样式
    oList.style.textAlign = 'center';
    oList.style.marginTop = '-25px';





    //创建图片区域
    for (var attr in imgArr) {
        var img = document.createElement('img');
        img.src = imgArr[attr].url;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.marginLeft = "0%";
        img.addEventListener('click', function () {
            if (imgArr[attr].link) {
                location.href = imgArr[attr].link;
            }

        })
        obannerArea.append(img)

    }

    //创建切换图标
    for (var attr in imgArr) {
        var span = document.createElement('span');
        span.style.width = '20px';
        span.style.height = '20px';
        span.style.background = 'lightgray';
        span.style.borderRadius = '50%';
        span.style.display = 'inline-block';
        span.style.margin = ' 0 7px';
        oList.append(span)
    }

    for (var i = 0; i < oList.children.length; i++) {
        var ele = oList.children[i];
        if (i == curIndex) {
            oList.children[i].style.background = '#be926f'
        } else {
            oList.children[i].style.background = 'lightgray'
        }
    }
    var curMarginLeft = parseInt(obannerArea.children[0].style.marginLeft);
    var widthSpee = dom.offsetWidth;
    var timer = setInterval(function () {

        curMarginLeft += widthSpee;
        console.log(curMarginLeft);
        
        if( curMarginLeft >= imgArr.length * widthSpee ){
            clearInterval(timer);
            obannerArea.style.marginLeft = 0 + 'px';
        }else{
            obannerArea.style.marginLeft = -curMarginLeft + 'px';
        }
      
    }, 2000)






    dom.append(obannerArea);
    dom.append(oList)

}