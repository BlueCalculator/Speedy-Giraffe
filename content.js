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
fetchDataFromLocalStorage("form10");
fetchDataFromLocalStorage("form12")
fetchDataFromLocalStorage("BookmarkInfo");
fetchDataFromLocalStorage("currentBookmarkSet");



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
let BookmarkInfo;
let currentBookmarkSet
let startVideoPaused

function setVariables() {
    ffkey = formData["form1"];
    fftime = formData["form2"];
    bbkey = formData["form3"];
    activatePlaybackKey = formData["form4"];
    ffrate = formData["form5"];
    toggleSPEED = formData["form6"];
    MediaControlls = formData["form7"];
    mediawidth = formData["form8"]
    mediaheight = formData["form9"]
    ButtonforBookmark = formData["form10"]
    BookmarkInfo = formData["BookmarkInfo"]
    currentBookmarkSet = formData["currentBookmarkSet"]
    startVideoPaused = formData["form12"]
    MediaController()
    BookmarkTriggerSet()
}




//  ____                           _ 
// / ___| ___ _ __   ___ _ __ __ _| |
//| |  _ / _ \ '_ \ / _ \ '__/ _` | |
//| |_| |  __/ | | |  __/ | | (_| | |
// \____|\___|_| |_|\___|_|  \__,_|_|
                                  
   
setTimeout(() => {
  if (startVideoPaused === true){
    videoID().pause()
  }
}, 1);



addEventListener("keydown", (event) => {
  if (event.key === ffkey && event.altKey) {
    ffskiptime()
  }
  if(event.key === bbkey && event.altKey) {
    bbskiptime()
  }
  if(event.key === ButtonforBookmark && event.altKey) {
    addBookmark()
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

setInterval(time, 1000)
function time() {
    if (document.querySelector("div.ad-showing")) { 
            // videoID().currentTime = videoID().duration;
            // document.querySelector('video').playbackRate = 16.0;
        }
}

// __  __        _ _        ___               _ 
// |  \/  |___ __| (_)__ _  | _ \__ _ _ _  ___| |
// | |\/| / -_) _` | / _` | |  _/ _` | ' \/ -_) |
// |_|  |_\___\__,_|_\__,_| |_| \__,_|_||_\___|_|
                                              
const MediaPanel = document.createElement("div");
const fastForward = document.createElement("button");
const pausePlay = document.createElement("button");
const skipTime = document.createElement("button");
const reverseTime = document.createElement("button");
const bookmarkTime = document.createElement("button");

//Media panel
MediaPanel.id = 'MediaPanel';
MediaPanel.innerHTML = "<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">"

//FastForward Button
fastForward.innerHTML = "<i class=\"material-icons\">fast_forward</i>"
fastForward.addEventListener("mousedown", fforward)
fastForward.addEventListener("mouseup", stopChangingSpeed)
fastForward.className = "FFButton"

// PausePlay Button
 


pausePlay.innerHTML = "<i class=\"material-icons\">pause</i>"
pausePlay.className = "FFButton"
pausePlay.addEventListener("mousedown", PausePlayFunction)

function PausePlayFunction() {
  if (videoID().paused) {
      videoID().play();
      pausePlay.innerHTML = "<i class=\"material-icons\">pause</i>"
    } else {
      videoID().pause();
      pausePlay.innerHTML = "<i class=\"material-icons\">play_arrow</i>"
  }
}

//Bookmark Time 

bookmarkTime.innerHTML = "<i class=\"material-icons\">bookmark</i>"
bookmarkTime.className = "FFButton"
bookmarkTime.addEventListener("mousedown", addBookmark)

videoTimeSavePoint = null;

function addBookmark(){
  videoTimeSavePoint = videoID().currentTime
  BookmarkNotesAssigner.value = document.title + " -- " + formatTime(videoID().currentTime)
  BookmarkPopup.append(formName, BookmarkNotesAssigner, buttonBar)
  document.body.appendChild(BookmarkPopup)
}

//Bookmark Body
const BookmarkPopup = document.createElement("div");
BookmarkPopup.className = "BookmarkPopup"

//form Header
const formName = document.createElement("p");
formName.innerHTML = "Name Your Bookmark"

//bookmark input 
const BookmarkNotesAssigner = document.createElement("input");
BookmarkNotesAssigner.type = "text"
BookmarkNotesAssigner.className = "NotesFormInput"

//Save Bookmark
const saveBookmark = document.createElement("button");
saveBookmark.type = "submit"
saveBookmark.innerHTML = "Save"
saveBookmark.id = "saveBookmarkBookmark"
saveBookmark.addEventListener("mousedown", SaveCurrentBookmark)

function cleanString(str) {
  return str.replace(/([“”"'])/g, '\\$1');
}

var sucsessBookarkCreated = document.createElement("div");
sucsessBookarkCreated.className = "sucsessBookarkCreated"
sucsessBookarkCreated.innerHTML = '<p>Bookmark Successfully Made!</p>'

function SaveCurrentBookmark(){
  document.body.appendChild(sucsessBookarkCreated)
  BookmarkNoteName = BookmarkNotesAssigner.value
  cleanedBookmarknameNote = cleanString(BookmarkNoteName)
  document.body.removeChild(BookmarkPopup)
  BookmarkInfoItem = { Note: cleanedBookmarknameNote, Time: videoTimeSavePoint, link: window.location.href};
  BookmarkInfo.push(BookmarkInfoItem)

  chrome.storage.local.set({
    "BookmarkInfo" : BookmarkInfo
  }, function() {
    console.log("Data saved to local storage");
  });

  setTimeout(deleteBookmarkSucess, 1000)
}

function deleteBookmarkSucess(){
  document.body.removeChild(sucsessBookarkCreated)
}


//Cancel Bookmark
const cancelBookmark = document.createElement("button");
cancelBookmark.type = "submit"
cancelBookmark.innerHTML = "Cancel"
cancelBookmark.id = "cancelBookmarkBookmark"
cancelBookmark.addEventListener("mousedown", cancelClose)

function cancelClose(){
  document.body.removeChild(BookmarkPopup)
}

const buttonBar = document.createElement("div")
buttonBar.className = "ButtonBar"
buttonBar.append(cancelBookmark, saveBookmark)

//Set Time 

function BookmarkTriggerSet(){
  if(currentBookmarkSet.link == window.location.href){
//CHECK FOR ADS ON YOUTUBE
    setTimeout(() => {
      videoID().currentTime = currentBookmarkSet.Time
    chrome.storage.local.set({
      "currentBookmarkSet" : "null"
    }, function() {
      console.log("Data saved to local storage");
    });
    }, 1);
  }
}

//format time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}




//Skip Time
skipTime.innerHTML = "<i class=\"material-icons\">arrow_forward_ios</i>"
skipTime.addEventListener("mousedown", ffskiptime)
skipTime.className = "FFButton"

//Reverse Time
reverseTime.innerHTML = "<i class=\"material-icons\">arrow_back_ios</i>"
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
    MediaPanel.append(reverseTime, pausePlay ,skipTime, fastForward, bookmarkTime);
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