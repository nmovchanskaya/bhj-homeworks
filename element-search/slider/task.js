let slides = Array.from(document.querySelectorAll(".slider__item"));
let sliderDots = Array.from(document.querySelectorAll(".slider__dot"));

function activateCurrent(currentActiveNumber) {
    slides[currentActiveNumber].className += " slider__item_active";
    sliderDots[currentActiveNumber].className += " slider__dot_active";
}

function deactivatePrevious(previousNum) {
    slides[previousNum].className = "slider__item";
    sliderDots[previousNum].className = "slider__dot";
}

document.querySelector(".slider__arrow_prev").onclick = function() {

    let currentActiveNumber = slides.findIndex((item) => item.className.includes("slider__item_active"));
    if (currentActiveNumber === 0) {
        currentActiveNumber = slides.length - 1;

        //deactivate previously selected photo and dot
        deactivatePrevious(0);
    }
    else {  
        currentActiveNumber--;   

        //deactivate previously selected photo and dot
        deactivatePrevious(currentActiveNumber + 1);
    }

    //activate new photo and dot
    activateCurrent(currentActiveNumber);
};

document.querySelector(".slider__arrow_next").onclick = function() {
    
    let currentActiveNumber = slides.findIndex((item) => item.className.includes("slider__item_active"));
    if (currentActiveNumber === slides.length - 1) {
        currentActiveNumber = 0;

        //deactivate previously selected photo and dot
        deactivatePrevious(slides.length - 1);
    }
    else {
        currentActiveNumber++;

        //deactivate previously selected photo and dot
        deactivatePrevious(currentActiveNumber - 1);
    }

    //activate new photo and dot
    activateCurrent(currentActiveNumber);
};

sliderDots.forEach((item, index) => {
    item.onclick = function() {
        let currentActiveNumber = slides.findIndex((item) => item.className.includes("slider__item_active"));
        
        if (index !== currentActiveNumber) {       
            deactivatePrevious(currentActiveNumber);
            currentActiveNumber = index;
            activateCurrent(currentActiveNumber);
        }
    }
});