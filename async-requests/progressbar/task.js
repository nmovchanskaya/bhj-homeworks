const progress = document.getElementById('progress');
const sendBtn = document.getElementById('send');
const formUpl = document.getElementById('form');

let xhr = new XMLHttpRequest();

sendBtn.addEventListener("click", (e) => {

    e.preventDefault();

    let formUplData = new FormData(formUpl);

    xhr.upload.onprogress = (e) => {
        progress.value = e.loaded / e.total;
    }

    xhr.onerror = (e) => {
        console.log("Error occured: " + xhr.statusText);
    };

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(formUplData);
      
});
