// 音频播放 暂停 获取音频
(function ($, root) {

    function AudioManager() {
        this.audio = new Audio();
        // this.src = src;
        this.status = 'pause';

    }

    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play'

        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause'

        },
        getAudio: function (src) {            
            this.audio.src = src;
            this.audio.load();

        }
    }

    root.audioManager =new AudioManager();




})(window.Zepto, window.player || (window.player = {}));