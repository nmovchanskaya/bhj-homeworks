const items = document.querySelector("#items");
const loader = document.querySelector("#loader");
const xhr = new XMLHttpRequest();

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

function sendXMLHttpRequest(xhr, method, url) {
    xhr.open(method, url);
    xhr.send();
}

window.onload = (e) => {
    let valutes = JSON.parse(localStorage.getItem("valutes"));
    if (valutes) {
        renderValutesBlock(valutes);
    }

    //create and send XMLHttpRequest
    sendXMLHttpRequest(xhr, "GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");
};

//update currency list when get data
xhr.onprogress = (e) => {
    if (e.loaded === e.total) {
        let arr = Object.values((JSON.parse(xhr.responseText)).response.Valute);
        localStorage.setItem("valutes", JSON.stringify(arr));

        renderValutesBlock(arr);
    }
};
