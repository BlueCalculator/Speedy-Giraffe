setInterval(time, 100)
function time() {
    if (document.querySelector("div.ad-showing")) { 
        //AD IS ACTIVE
        document.querySelector('video').playbackRate = 16.0;
        }
    }
