let elements = Array.from(document.querySelectorAll(".interest__check"));

function updateChildren(element, checked) {  
    let childList = element.closest("li").querySelector("ul");
    //обновляем дочерние
    if (childList) {
        Array.from(childList.children).forEach((item) => {
            item.querySelector("input").checked = checked;
    
            if (item.closest("li").querySelector("ul")) {
                updateChildren(item, checked);
            }
        });   
    }
}

function checkSiblings(element) {
    let everyChecked = true;
    let someChecked = false;
    let siblingsdList = Array.from(element.closest("ul").children);
    siblingsdList.forEach((item) => {
        everyChecked = everyChecked && item.querySelector("input").checked;
        someChecked = someChecked || item.querySelector("input").checked;
    });

    //если есть родитель - обновляем
    if (element.closest("ul").closest("li")) {
        element.closest("ul").closest("li").querySelector("input").indeterminate = false;
        element.closest("ul").closest("li").querySelector("input").checked = everyChecked;
        
        if (!everyChecked) {
            element.closest("ul").closest("li").querySelector("input").indeterminate = someChecked;
        }
    }
}

elements.forEach((element) => {
    element.addEventListener("change", (e) => {
        updateChildren(element, e.target.checked);  

        //проверить соседние элементы и обновить родителя
        checkSiblings(element);
    });
}); 
