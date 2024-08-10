document.addEventListener('DOMContentLoaded', function() {
    const mediaSettings = document.getElementById("mediaSettings")
    const advSettings = document.getElementById("advancedSettings")
    const advancedButton = document.getElementById("advancedButton");
    const body = document.body;
    body.style.height = "355px";
    advSettings.style.display = "none";
    setTimeout(MediaControllerWorker, 10)



    submitButton.addEventListener("click", function(event) {
        MediaControllerWorker()
    })

    function MediaControllerWorker(){
        let onScreen = document.getElementById("onScreen").checked;
    if(onScreen === true) {
        body.style.height = "430px";
        mediaSettings.style.display = "block"
    }else{
        body.style.height = "355px";
        mediaSettings.style.display = "none"

   }
    }


    //something is worng here :/
    advancedButton.addEventListener("click", function(event) {
        let onScreen = document.getElementById("onScreen").checked;
        if (advSettings.style.display === "block") {
            if (onScreen !== true) {
                document.body.style.height = "355px";
            } else {
                document.body.style.height = "430px";
            }
            advSettings.style.display = "none";
        } else {
            if (onScreen !== true) {
                document.body.style.height = "400px";
            } else {
                document.body.style.height = "480px";
            }
            advSettings.style.display = "block";
        }
    })
});    