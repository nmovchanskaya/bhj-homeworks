
Array.from(document.querySelectorAll(".menu__link")).forEach((item) => {
    item.onclick = function() {
        let menuSub = item.parentElement.querySelector(".menu_sub");
        if (menuSub) {
            //close submenu if it was clicked for 2 times
            if (menuSub.className.includes("menu_active")) {
                menuSub.className = "menu menu_sub";
            }

            //deactivate active submenu and activate new one
            else {
                Array.from(document.querySelectorAll(".menu_active")).forEach(
                    (item) => {
                        //check if we work with one menu or with differrent
                        if (item.parentElement.parentElement.id === menuSub.parentElement.parentElement.id) {
                            item.className = "menu menu_sub";
                        }
                    });
                menuSub.className += " menu_active";
            }

            return false;
        }
    }
});