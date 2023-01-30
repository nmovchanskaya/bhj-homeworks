let currentActiveNumber = 0;
let slides = Array.from(document.querySelectorAll(".slider__item"));
let slider_dots = Array.from(document.querySelectorAll(".slider__dot"));

function activate_current() {
    slides[currentActiveNumber].className += " slider__item_active";
    slider_dots[currentActiveNumber].className += " slider__dot_active";
}

function deactivate_previous(previousNum) {
    slides[previousNum].className = "slider__item";
    slider_dots[previousNum].className = "slider__dot";
}

document.querySelector(".slider__arrow_prev").onclick = function() {

    if (currentActiveNumber === 0) {
        currentActiveNumber = slides.length - 1;

        //deactivate previously selected photo and dot
        deactivate_previous(0);
    }
    else {  
        currentActiveNumber--;   

        //deactivate previously selected photo and dot
        deactivate_previous(currentActiveNumber + 1);
    }

    //activate new photo and dot
    activate_current();
};

document.querySelector(".slider__arrow_next").onclick = function() {
    if (currentActiveNumber === slides.length - 1) {
        currentActiveNumber = 0;

        //deactivate previously selected photo and dot
        deactivate_previous(slides.length - 1);
    }
    else {
        currentActiveNumber++;

        //deactivate previously selected photo and dot
        deactivate_previous(currentActiveNumber - 1);
    }

    //activate new photo and dot
    activate_current();
};

slider_dots.forEach((item, index) => {
    item.onclick = function() {
        if (index !== currentActiveNumber) {       
            deactivate_previous(currentActiveNumber);
            currentActiveNumber = index;
            activate_current();
        }
    }
});