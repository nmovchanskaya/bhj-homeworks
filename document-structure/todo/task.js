const tasksInput = document.querySelector(".tasks__input");
const tasksList = document.querySelector(".tasks__list");
const tasksAdd = document.querySelector(".tasks__add");

window.onload = (e) => {
    //load task list when window was loaded
    let tasksListHTML = localStorage.getItem("tasksListHTML");

    if (tasksListHTML) {
        tasksList.innerHTML = tasksListHTML;
        let removeLinks = Array.from(document.querySelectorAll(".task__remove"));
        removeLinks.forEach((item) => {
            item.addEventListener("click", (e) => {
                item.closest("div").remove();

                //save HTML for task list in localStorage
                localStorage.setItem("tasksListHTML", tasksList.innerHTML);
            });
        });
    }
}

tasksAdd.addEventListener("click", (e) => {
    
    e.preventDefault();

    if (tasksInput.value != "") {

        //create new task in HTML
        let newTask = document.createElement("div");
        newTask.classList.add("task");
        let taskTitle = document.createElement("div");
        taskTitle.classList.add("task__title");
        taskTitle.textContent = tasksInput.value;
        let removeLink = document.createElement("a");
        removeLink.classList.add("task__remove");
        removeLink.innerHTML = "&times;";
        removeLink.setAttribute("href", "#");
        removeLink.addEventListener("click", (e) => {
            removeLink.closest("div").remove();
        });

        newTask.appendChild(taskTitle);
        newTask.appendChild(removeLink);

        tasksList.appendChild(newTask);

        //save HTML for task list in localStorage
        localStorage.setItem("tasksListHTML", tasksList.innerHTML);
    }
});
