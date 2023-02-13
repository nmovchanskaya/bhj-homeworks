class Rotator {
    constructor(rotatorElement) {
        this.ads = Array.from(rotatorElement.querySelectorAll(".rotator__case"));
        this.intervalIdx = setInterval(() => {this.changeRotator();}, 1000);
    }

    changeRotator() {
        let currentActive = this.ads.findIndex((item) => item.classList.contains("rotator__case_active"));
    
        //deactivate currently active ad
        this.ads[currentActive].classList.remove("rotator__case_active");
        if (currentActive < this.ads.length - 1) {
            currentActive++;
        }
        else {
            currentActive = 0
        }

        //activate new ad
        this.ads[currentActive].classList.add("rotator__case_active");
        this.ads[currentActive].style.color = this.ads[currentActive].dataset.color;
    
        let delay = this.ads[currentActive].dataset.speed;
        clearInterval(this.intervalIdx);
        this.intervalIdx = setInterval(() => {this.changeRotator();}, delay);
    }
}

let rotators = Array.from(document.querySelectorAll(".rotator"));
rotators.forEach((item) => {new Rotator(item);});
