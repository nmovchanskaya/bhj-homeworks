
Array.from(document.querySelectorAll(".menu__link")).forEach((item) => {
    item.onclick = function() {
        let menuSub = item.parentElement.querySelector(".menu_sub");
        if (menuSub) {
            //deactivate opened item
            Array.from(document.querySelectorAll(".menu_active")).forEach(
                (item) => {
                    item.className = "menu menu_sub";
                });

            //activate new
            menuSub.className += " menu_active";

            return false;
        }
    }
});