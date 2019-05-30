// 渲染数据  img + info + link-btn

(function ($, root) {

    function renderImg(src){
      var img = new Image();
      img.src = src;
      img.onload =function(){
          $(".img-box img").attr('src', src);
          root.blurImg(img,$('body'));
      }
        
    }
    function renderInfo(info){
       var str = '<div class="song-name">'+info.song+ '</div><div class="singer-name">'+info.singer+'</div><div class="album-name">'+info.album+'</div>';
       $(".song-info").html(str);
        
    }
    function renderIslink(link){
        if(link){
            $(".link").addClass('linking')

        }else{
            $(".link").removeClass('linking')

        }
        
        
    }

   root.render = function(data){
    renderImg(data.image);
    renderInfo(data);
    renderIslink(data.isLike)
   }



})(window.Zepto, window.player || (window.player = {}));