//let hole = [];
let success = 0;
let error = 0;

function getHole(i) {
    return document.getElementById("hole" + (i + 1));
}

function refresh() {
    success = 0;
    error = 0;
    document.getElementById("dead").textContent = success.toString();
    document.getElementById("lost").textContent = error.toString();
}

for (let i = 0; i < 9; i++) {
    //getHole(i);
    getHole(i).onclick = () => {
        if (getHole(i).className.includes("hole_has-mole")) {
            success += 1;
            document.getElementById("dead").textContent = success.toString();
        }
        else {
            error += 1;
            document.getElementById("lost").textContent = error.toString();
        }

        if (success === 10) {
            alert("Вы выйграли!");
            refresh();
        }
        if (error === 5) {
            alert("Вы проиграли:(");
            refresh();
        }
    }
}