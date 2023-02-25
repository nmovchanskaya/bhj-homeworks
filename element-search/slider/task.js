let slides = Array.from(document.querySelectorAll(".slider__item"));
let sliderDots = Array.from(document.querySelectorAll(".slider__dot"));

function activateNew(num) {
    slides[num].classList.add("slider__item_active");
    sliderDots[num].classList.add("slider__dot_active");
}

function deactivateCurrent(num) {
    slides[num].classList.remove("slider__item_active");
    sliderDots[num].classList.remove("slider__dot_active");
}

function setNewImage(index) {
    //find currently active slide
    let currentActiveNumber = slides.findIndex((item) => item.classList.contains("slider__item_active"));
    let newActiveNumber = index;

    //deactivate it
    deactivateCurrent(currentActiveNumber);

    //validate new active slide number
    if (newActiveNumber < 0) {
        newActiveNumber = slides.length - 1;
    }
    else if (newActiveNumber > slides.length - 1) {
        newActiveNumber = 0;
    }

    //activate it
    activateNew(newActiveNumber);
}

document.querySelector(".slider__arrow_prev").onclick = function() {

    let currentActiveNumber = slides.findIndex((item) => item.classList.contains("slider__item_active"));
    
    setNewImage(currentActiveNumber - 1);
};

document.querySelector(".slider__arrow_next").onclick = function() {
    
    let currentActiveNumber = slides.findIndex((item) => item.classList.contains("slider__item_active"));
    
    setNewImage(currentActiveNumber + 1);
};

sliderDots.forEach((item, index) => {
    item.onclick = function() {
        let currentActiveNumber = slides.findIndex((item) => item.classList.contains("slider__item_active"));
        
        if (index !== currentActiveNumber) {  
            
            setNewImage(index);
        }
    }
});
