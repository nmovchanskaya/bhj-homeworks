const withTooltips = Array.from(document.querySelectorAll(".has-tooltip"));
const body = document.querySelector("body");
const tooltip = document.createElement("div");
let scrolled;
body.appendChild(tooltip);

window.onload = (e) => {
    scrolled = document.documentElement.scrollTop;
}
//
withTooltips.forEach((item) => {
    item.addEventListener("click", (e) => {

        //close tooltip if clicked twice
        if (tooltip.textContent === item.getAttribute("title")) {
            tooltip.classList.remove("tooltip_active");
            e.preventDefault();
            return;
        }

        //set text and position for tooltip
        tooltip.textContent = item.getAttribute("title");
        tooltip.style.left = item.getBoundingClientRect().left + "px";
        tooltip.style.top = (item.getBoundingClientRect().top + 20) + "px";

        tooltip.classList.add("tooltip");
        tooltip.classList.add("tooltip_active");

        //set position if tooltip has to be on the top, left or right
        if (item.dataset.position === "top") {
            tooltip.style.top = (item.getBoundingClientRect().top - 30) + "px";
        }
        else if (item.dataset.position === "left") {
            tooltip.style.left = (item.getBoundingClientRect().left - tooltip.offsetWidth) + 'px';
            tooltip.style.top = item.getBoundingClientRect().top + "px";
        }
        else if (item.dataset.position === "right") {
            tooltip.style.left = item.getBoundingClientRect().right + "px";
            tooltip.style.top = item.getBoundingClientRect().top + "px";
        }
    
        e.preventDefault();
    });
});

/*document.addEventListener("wheel", (e) => {
    tooltip.style.top = (parseInt(tooltip.style.top) + scrolled - document.documentElement.scrollTop) + "px";
    scrolled = document.documentElement.scrollTop;
});*/
