let clickerCounter = document.getElementById("clicker__counter");
let cookie = document.getElementById("cookie");
let clickerFreq = document.getElementById("clicker__freq");
let prevTime;

cookie.onclick = () => {
    let counter = Number(clickerCounter.textContent) + 1;
    clickerCounter.textContent = counter;
    //cookie.width = cookie.width + Math.pow(-1, counter % 2) * (-100);
    cookie.width = counter % 2 ? 300 : 200;
    if (prevTime === undefined) {
        prevTime = new Date();
    }
    else {
        let newTime = new Date();
        clickerFreq.textContent = 1000 / (new Date() - prevTime);
        prevTime = newTime;
    }
};