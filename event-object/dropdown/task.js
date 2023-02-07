let dropdown = Array.from(document.querySelectorAll(".dropdown"));

dropdown.forEach((item) => {
    item.addEventListener("click", (e) => {
        if (e.target.className === "dropdown__value") {
            e.currentTarget.querySelector(".dropdown__list").className += " dropdown__list_active";
        }
        else if (e.target.className === "dropdown__link") {
            e.currentTarget.querySelector(".dropdown__value").textContent = e.target.textContent;
            e.currentTarget.querySelector(".dropdown__list").className = "dropdown__list";
            e.preventDefault();
        }
    });
});