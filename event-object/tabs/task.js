let tabs = Array.from(document.querySelectorAll(".tabs"));

tabs.forEach((item) => {
    item.addEventListener("click", (e) => {
        let tabsButtons = Array.from(e.currentTarget.querySelectorAll(".tab"));
        
        //get index of new button and current active button
        let newIdx = tabsButtons.indexOf(e.target);
        let currentActiveIdx =  tabsButtons.indexOf(e.currentTarget.querySelector(".tab_active"));
    
        //if we selected new button, which was not selected previously
        if (newIdx !== currentActiveIdx && newIdx >= 0) {
            e.currentTarget.querySelector(".tab_active").className = "tab";
            e.target.className += " tab_active";
            console.log(newIdx);
        
            //deactivate previous active tab, activate currently selected
            let tabsContent = Array.from(e.currentTarget.querySelectorAll(".tab__content"));
            e.currentTarget.querySelector(".tab__content_active").className = "tab__content";
            tabsContent[newIdx].className += " tab__content_active";
        }
    
    });
});
