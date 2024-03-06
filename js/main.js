setInterval(time, 100)
function time() {
    if (document.querySelector("div.ad-showing")) { 
            let vid = document.querySelector('video')
            let skiplength = vid.duration
            vid.currentTime = skiplength;
        }
    }
