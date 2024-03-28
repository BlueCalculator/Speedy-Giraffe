setInterval(time, 100)
function time() {
    if (document.querySelector("div.ad-showing")) { 
            videoID().currentTime = videoID().duration;
        }
    }

function videoID() {
  return document.querySelector("video");
}
