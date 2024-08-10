
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", theGoods)

  document.querySelector("input")

  function theGoods(){
    event.preventDefault();

    const inputData1 = document.getElementById("inputData1").value;
    const skipAmount = document.getElementById("skipAmount").value;
    const inputData3 = document.getElementById("inputData3").value;
    const inputData4 = document.getElementById("inputData4").value;
    const skipSpeed = document.getElementById("skipSpeed").value;
    const toggleable = document.getElementById("toggleable").checked;
    const onScreen = document.getElementById("onScreen").checked;
    const mediawidth = document.getElementById("mediawidth").value;
    const mediaheight = document.getElementById("mediaheight").value;
    const Bookmark = document.getElementById("Bookmark").value;
    const videoPause = document.getElementById("videoPause").checked;

    chrome.storage.local.set({
      "form1": inputData1,
      "form2": skipAmount,
      "form3": inputData3,
      "form4": inputData4,
      "form5": skipSpeed,
      "form6": toggleable,
      "form7": onScreen,
      "form8": mediawidth,
      "form9": mediaheight,
      "form10" : Bookmark,
      "form12" : videoPause,
      "BookmarkInfo" : []
    }, function() {
      console.log("Data saved to local storage");
    });

};


  // Load previously saved data for each form on popup open
  chrome.storage.local.get(["form1", "form2", "form3", "form4", "form5", "form6", "form7", "form8", "form9", "form10"], function(result) {
    document.getElementById("inputData1").value = result.form1 || "a";
    document.getElementById("skipAmount").value = result.form2 || "30";
    document.getElementById("inputData3").value = result.form3 || "s";
    document.getElementById("inputData4").value = result.form4 || "z";
    document.getElementById("skipSpeed").value = result.form5 || "2";
    document.getElementById("toggleable").checked = result.form6 || false;
    document.getElementById("onScreen").checked = result.form7 || false;
    document.getElementById("mediawidth").value = result.form8 || "150";
    document.getElementById("mediaheight").value = result.form9 || "80";
    document.getElementById("Bookmark").value = result.form10 || "x";
    document.getElementById("videoPause").checked = result.form12 || false;
  });
});




  