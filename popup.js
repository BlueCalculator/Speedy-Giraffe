document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function(event) {
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

    chrome.storage.local.set({
      "form1": inputData1,
      "form2": skipAmount,
      "form3": inputData3,
      "form4": inputData4,
      "form5": skipSpeed,
      "form6": toggleable,
      "form7": onScreen,
      "form8": mediawidth,
      "form9": mediaheight
    }, function() {
      console.log("Data saved to local storage");
    });

   if(onScreen === true) {
    MediaOptionsController()
   }else{
    Mediawidthselector.classList.remove('active')
    Mediawidthselector.classList.add('hidden')
    Mediaheighgtselector.classList.remove('active')
    Mediaheighgtselector.classList.add('hidden')
   }

});

const Mediaheighgtselector = document.getElementById("form9")
const Mediawidthselector = document.getElementById("form8");
Mediawidthselector.classList.add('hidden')
Mediaheighgtselector.classList.add('hidden')


function MediaOptionsController() {
  Mediawidthselector.classList.remove('hidden')
  Mediawidthselector.classList.add('active')
  Mediaheighgtselector.classList.remove('hidden')
  Mediaheighgtselector.classList.add('active')

}




  // Load previously saved data for each form on popup open
  chrome.storage.local.get(["form1", "form2", "form3", "form4", "form5", "form6", "form7", "form8", "form9"], function(result) {
    if (result.form1) {
      document.getElementById("inputData1").value = result.form1;
    } else {
      document.getElementById("inputData1").value = "a";
    }
    if (result.form2) {
      document.getElementById("skipAmount").value = result.form2;
    } else {
      document.getElementById("skipAmount").value = "30";
    }
    if (result.form3) {
      document.getElementById("inputData3").value = result.form3;
    } else {
      document.getElementById("inputData3").value = "s";
    }
    if (result.form4) {
      document.getElementById("inputData4").value = result.form4;
    } else {
      document.getElementById("inputData4").value = "z";
    }
    if (result.form5) {
      document.getElementById("skipSpeed").value = result.form5;
    } else {
      document.getElementById("skipSpeed").value = "2";
    }
    if (result.form6) {
      document.getElementById("toggleable").checked = result.form6;
    } else {
      document.getElementById("toggleable").checked = false;
    }
    if (result.form7) {
      document.getElementById("onScreen").checked = result.form7;
      if(result.form7 === true){
        MediaOptionsController() 
      }
    } else {
      document.getElementById("onScreen").checked = false;
    }
    if (result.form8){
      document.getElementById("mediawidth").value = result.form8;
    }else {
      document.getElementById("mediawidth").value = "150";
    }
    if (result.form9){
      document.getElementById("mediaheight").value = result.form9;
    }else {
      document.getElementById("mediaheight").value = "80";
    }
  });
});




  