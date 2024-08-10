let formData = {};

function fetchDataFromLocalStorage(formId) {
  chrome.storage.local.get(formId, function(result) {
    if (result[formId]) {
      formData[formId] = result[formId];
      setVariables();
    }
  });
}

fetchDataFromLocalStorage("BookmarkInfo");

chrome.storage.onChanged.addListener(function(changes, areaName) {
  Object.keys(changes).forEach(function(key) {
    formData[key] = changes[key].newValue; 
    setVariables();
  });
});

let bookmarkInfo = [];

function setVariables() {
    bookmarkInfo = formData["BookmarkInfo"] || [];
    populateSide();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

var container = document.getElementById("container");

function populateSide() {
  container.innerHTML = "";
  for (var i = 0; i < bookmarkInfo.length; i++) {
    var div = document.createElement("div");
    div.className = "BookmarkI";
    div.id = `bookmark-${i}`;

    const currentBookmark = bookmarkInfo[i];

    div.innerHTML = `
      <div class="BookmartItext">
        <a href="${currentBookmark.link}" target="_blank">
          <h3>${currentBookmark.Note.replace(/\\/g, '')}</h3>
          <p class="time">Time: ${formatTime(currentBookmark.Time)}</p>
          <p>${currentBookmark.link}</p>
        </a>
      </div>
      <div class="delete">
        <i class="material-icons">delete</i>
      </div>
    `;

    div.querySelector('.delete').addEventListener('click', (function(index) {
      return function() {
        deleteBookmark(index);
      };
    })(i));

    div.addEventListener('click', function() {
      chrome.storage.local.set({
        "currentBookmarkSet": currentBookmark
      }, function() {
        console.log("Data saved to local storage");
      });
    });

    container.appendChild(div);
  }
}

function deleteBookmark(index) {
  bookmarkInfo.splice(index, 1);
  chrome.storage.local.set({ "BookmarkInfo": bookmarkInfo }, function() {
    console.log("Bookmark deleted and local storage updated");
    populateSide();
  });
}

const Bookmarks = document.getElementById("Bookmarks");
Bookmarks.style.display = "none";
const body = document.body;

const BookmarkButton = document.getElementById("BookmarkButton");
BookmarkButton.addEventListener("click", function(event) {
  if (Bookmarks.style.display === "block") {
    body.style.width = "190px";
    Bookmarks.style.display = "none";
  } else {
    body.style.width = "400px";
    Bookmarks.style.display = "block";
  }
});
