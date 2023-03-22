const items = document.querySelector("#items");
const loader = document.querySelector("#loader");

function renderValutesBlock(arr) {

    //for each item generate html code in currency list
    arr.forEach(item => {
        items.innerHTML += 
            `<div class="item">
                <div class="item__code">
                    ${item.CharCode}
                </div>
                <div class="item__value">
                    ${item.Value}
                </div>
                <div class="item__currency">
                    руб.
                </div>
            </div>`;
    });

    //hide loader
    loader.classList.remove("loader_active");
}

window.onload = (e) => {
    let valutes = JSON.parse(localStorage.getItem("valutes"));
    if (valutes) {
        renderValutesBlock(valutes);
    }
};

//create and send XMLHttpRequest
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");
xhr.send();

//update currency list when get data
xhr.onreadystatechange = (e) => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let arr = Object.values((JSON.parse(xhr.responseText)).response.Valute);
        localStorage.setItem("valutes", JSON.stringify(arr));

        renderValutesBlock(arr);
    }
};
