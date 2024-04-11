let formData = {};

function fetchDataFromLocalStorage(formId) {
  chrome.storage.local.get(formId, function(result) {
    if (result[formId]) {
      // console.log("Data retrieved from local storage for form", formId, ":", result[formId]);
      formData[formId] = result[formId];
      setVariables();
    }
  });
}

fetchDataFromLocalStorage("form1");
fetchDataFromLocalStorage("form2");
fetchDataFromLocalStorage("form3");
fetchDataFromLocalStorage("form4");
fetchDataFromLocalStorage("form5");
fetchDataFromLocalStorage("form6");
fetchDataFromLocalStorage("form7");
fetchDataFromLocalStorage("form8");
fetchDataFromLocalStorage("form9");

chrome.storage.onChanged.addListener(function(changes, areaName) {
  Object.keys(changes).forEach(function(key) {
    console.log("Data in local storage changed for form", key, ":", changes[key].newValue);
    formData[key] = changes[key].newValue; 
    setVariables();
  });
});

let ffkey;
let fftime;
let bbkey;
let activatePlaybackKey;
let ffrate;
let toggleSPEED;
let MediaControlls;
let mediawidth;
let mediaheight;

function setVariables() {
  if (formData["form1"] && formData["form2"] && formData["form3"] && formData["form4"] && formData["form5"] && formData["form6"]) {
    ffkey = formData["form1"];
    fftime = formData["form2"];
    bbkey = formData["form3"];
    activatePlaybackKey = formData["form4"];
    ffrate = formData["form5"];
    toggleSPEED = formData["form6"];
    MediaControlls = formData["form7"];
    mediawidth = formData["form8"]
    mediaheight = formData["form9"]
    console.log(toggleSPEED, MediaControlls)
    MediaController()
  } else {
    console.log("Input data for the form isn't available.");
  }
}

//  ____                           _ 
// / ___| ___ _ __   ___ _ __ __ _| |
//| |  _ / _ \ '_ \ / _ \ '__/ _` | |
//| |_| |  __/ | | |  __/ | | (_| | |
// \____|\___|_| |_|\___|_|  \__,_|_|
                                  
                                  


addEventListener("keydown", (event) => {
  if (event.key === ffkey && event.altKey) {
    ffskiptime()
  }
  if(event.key === bbkey && event.altKey) {
    bbskiptime()
  }
});


  let originalPlaybackSpeed;
  let speedChanged = false;

  function ffskiptime() {
    videoID().currentTime += parseInt(fftime);

  }

  function bbskiptime(){
    videoID().currentTime -= parseInt(fftime);
  }

  function fforward() {
    const vid = document.querySelector("video");
    if (vid) {
      originalPlaybackSpeed = vid.playbackRate;
      vid.playbackRate = parseInt(ffrate);
      speedChanged = true;
    }
  }

  function stopChangingSpeed() {
    const vid = document.querySelector("video");
    if (vid) {
      vid.playbackRate = originalPlaybackSpeed;
      speedChanged = false;
    }
  }

    document.addEventListener("keydown", function(event) {
      if (event.key === activatePlaybackKey && event.altKey && toggleSPEED === true) {
        const vid = document.querySelector("video");
        if (vid) {
          if (!speedChanged) {
            originalPlaybackSpeed = vid.playbackRate;
            vid.playbackRate = parseInt(ffrate); // Example speed: 2.0x faster
            speedChanged = true;
          } else {
            vid.playbackRate = originalPlaybackSpeed;
            speedChanged = false;
          }
        }
      } else {
        document.addEventListener("keydown", function(event) {
          if (event.key === activatePlaybackKey && event.altKey && !speedChanged) {
           fforward()
          }
        });
      
        document.addEventListener("keyup", function(event) {
          if (event.key === activatePlaybackKey && event.altKey && speedChanged) {
           stopChangingSpeed()
          }
        });
      }
    });

setInterval(time, 100)
function time() {
    if (document.querySelector("div.ad-showing")) { 
            videoID().currentTime = videoID().duration;
        }
}

// __  __        _ _        ___               _ 
// |  \/  |___ __| (_)__ _  | _ \__ _ _ _  ___| |
// | |\/| / -_) _` | / _` | |  _/ _` | ' \/ -_) |
// |_|  |_\___\__,_|_\__,_| |_| \__,_|_||_\___|_|
                                              
const MediaPanel = document.createElement("div");
const fastForward = document.createElement("button");
// const reverse = document.createElement("button");
const skipTime = document.createElement("button");
const reverseTime = document.createElement("button");


//Media panel
MediaPanel.id = 'MediaPanel';


//FastForward Button
fastForward.textContent = ">>"
fastForward.addEventListener("mousedown", fforward)
fastForward.addEventListener("mouseup", stopChangingSpeed)
fastForward.className = "FFButton"

//Skip Time
skipTime.textContent = ">"
skipTime.addEventListener("mousedown", ffskiptime)
skipTime.className = "FFButton"

//Reverse Time
reverseTime.textContent = "<"
reverseTime.addEventListener("mousedown", bbskiptime)
reverseTime.className = "FFButton"

//The dragging thing
function handleMouseDown(event) {
    const offsetX = event.clientX - MediaPanel.getBoundingClientRect().left;
    const offsetY = event.clientY - MediaPanel.getBoundingClientRect().top;
    function handleMouseMove(event) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;
        MediaPanel.style.left = newX + "px";
        MediaPanel.style.top = newY + "px";
    }
    function handleMouseUp() {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
}
MediaPanel.addEventListener("mousedown", handleMouseDown);

function MediaController() {
  if(MediaControlls === true && isVideoThere()) {
    document.body.appendChild(MediaPanel);
    MediaPanel.append(reverseTime, skipTime, fastForward);

    MediaPanel.style.width = mediawidth + "px";
    MediaPanel.style.height = mediaheight + "px";
  }else{
    document.body.removeChild(MediaPanel);
  }
}

function isVideoThere(){
  const videoElements = document.querySelectorAll("video");
  return videoElements.length > 0;
}

function videoID() {
  return document.querySelector("video");
}


