function decreaseTimer() {
    let output = document.getElementById("timer");
    
    let hours = output.textContent.split(":")[0];
    let minutes = output.textContent.split(":")[1];
    let seconds = output.textContent.split(":")[2];
    let time = hours * 3600 + minutes * 60 + seconds * 1;
    
    time -= 1;
    output.textContent = (Math.trunc(time / 3600)).toString().padStart(2, '0') + ':' + (Math.trunc(time % 3600 / 60)).toString().padStart(2, '0') + ':' + (time % 3600 % 60).toString().padStart(2, '0');

    if (time === 0) {
        clearInterval(intervalId);
        document.getElementById("success_link").click();
    }
}

let intervalId = setInterval(decreaseTimer, 1000);