const tasksInput = document.querySelector(".tasks__input");
const tasksList = document.querySelector(".tasks__list");
const tasksAdd = document.querySelector(".tasks__add");

function saveTitles() {
    //save titles for task list in localStorage
    let titlesArray = [];
    Array.from(tasksList.querySelectorAll(".task__title")).forEach((item) => {
        titlesArray.push(item.textContent.trim());
    })

    localStorage.setItem("titlesArray", JSON.stringify(titlesArray));
}

function newTask(text) {
    //add task in HTML
    let newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.innerHTML = 
        `<div class="task__title">
            ${text}
        </div>
        <a href="#" class="task__remove">&times;</a>`;

    //add remove button
    newTask.querySelector(".task__remove").addEventListener("click", (e) => {
        e.target.closest("div").remove();
        saveTitles();
    });

    tasksList.appendChild(newTask);
    tasksInput.value = "";
}

window.onload = (e) => {
    //load task list when window was loaded
    let titlesArray = JSON.parse(localStorage.getItem("titlesArray"));

    if (titlesArray) {
        titlesArray.forEach(item => {
            newTask(item);
        });
    }
}

tasksAdd.addEventListener("click", (e) => {
    
    e.preventDefault();

    if (tasksInput.value.trim() != "") {

        newTask(tasksInput.value);

        //save titles for task list in localStorage
        saveTitles();
    }
});
