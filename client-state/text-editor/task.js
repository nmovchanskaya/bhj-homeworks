const editor = document.getElementById("editor");
const refresh = document.getElementById("refresh");

editor.addEventListener("keyup", (e) => {
    localStorage.setItem("textInEditor", editor.value);
});

refresh.addEventListener("click", (e) => {
    editor.value = "";
    localStorage.removeItem("textInEditor");
});

window.onload = (e) => {
    const text = localStorage.getItem("textInEditor");
    if (text) {
        editor.value = text;
    }
};