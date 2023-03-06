let withTooltips = Array.from(document.querySelectorAll(".has-tooltip"));

withTooltips.forEach((item) => {
    item.addEventListener("click", (e) => {

        //deactivate all tooltips
        let tooltips = Array.from(document.querySelectorAll(".tooltip_active"));
        tooltips.forEach((item) => {
            item.classList.remove("tooltip_active");
        });

        //create div
        let containerWithTooltip = document.createElement("span");
        containerWithTooltip.style.position = "relative";

        //insert our link there
        containerWithTooltip.appendChild(item.cloneNode(true));
        
        //insert our tooltip there too
        let tooltip = document.createElement("div");
        tooltip.textContent = item.getAttribute("title");

        tooltip.style.left = 0;
        tooltip.style.top = "100%";

        tooltip.classList.add("tooltip");
        tooltip.classList.add("tooltip_active");
        containerWithTooltip.appendChild(tooltip);
        item.replaceWith(containerWithTooltip);

        if (item.dataset.position === "top") {
            let tooltipTop = document.querySelector(".tooltip_active");
            tooltipTop.style.top = (-1 * tooltip.offsetHeight) + 'px';
        }
        else if (item.dataset.position === "left") {
            //!!В этом случае как-то криво работает((
            tooltip.style.left = (-1 * tooltip.offsetWidth) + 'px';
            tooltip.style.top = 0;
        }
        else if (item.dataset.position === "right") {
            tooltip.style.left = "100%";
            tooltip.style.top = 0;
        }

        e.preventDefault();
    });
});
