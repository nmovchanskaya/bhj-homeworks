document.querySelector("#modal_main").className += " modal_active";

Array.from(document.querySelectorAll(".modal__close")).forEach((item) => {
    item.onclick = function() {
        item.parentElement.parentElement.className = "modal";
    }
});

document.querySelector(".show-success").onclick = function() {
    document.querySelector("#modal_success").className += " modal_active";
    this.parentElement.parentElement.className = "modal";
}
