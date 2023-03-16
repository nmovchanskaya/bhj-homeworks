const withTooltips = Array.from(document.querySelectorAll(".has-tooltip"));
const body = document.querySelector("body");
const tooltip = document.createElement("div");
body.appendChild(tooltip);

withTooltips.forEach((item) => {
    item.addEventListener("click", (e) => {

        //close tooltip if clicked twice
        if (tooltip.textContent === item.getAttribute("title") && tooltip.classList.contains("tooltip_active")) {
            tooltip.classList.remove("tooltip_active");
            e.preventDefault();
            return;
        }

        //set text and position for tooltip
        tooltip.textContent = item.getAttribute("title");
        tooltip.style.left = item.offsetLeft + "px";
        tooltip.style.top = (item.offsetTop + 20) + "px";

        tooltip.classList.add("tooltip");
        tooltip.classList.add("tooltip_active");

        //set position if tooltip has to be on the top, left or right
        if (item.dataset.position === "top") {
            tooltip.style.top = (item.offsetTop - 30) + "px";
        }
        else if (item.dataset.position === "left") {
            tooltip.style.left = (item.offsetLeft - tooltip.offsetWidth) + 'px';
            tooltip.style.top = item.offsetTop + "px";
        }
        else if (item.dataset.position === "right") {
            tooltip.style.left = (item.offsetLeft + item.offsetWidth) + "px";
            tooltip.style.top = item.offsetTop + "px";
        }
    
        e.preventDefault();
    });
});

