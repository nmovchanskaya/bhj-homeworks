const pollTitle = document.querySelector("#poll__title");
const polAnswers = document.querySelector("#poll__answers");
const card = document.querySelector(".card");
const xhr = new XMLHttpRequest();
const xhrPostResponse = new XMLHttpRequest();


sendXMLHttpRequest(xhr, "GET", "https://students.netoservices.ru/nestjs-backend/poll");

function sendXMLHttpRequest(xhr, method, url, headerType, header, sendStr) {
    xhr.open(method, url);
    if (header) {
        xhr.setRequestHeader(headerType, header);
    }
    if (sendStr) {
        xhr.send(sendStr);
    }
    else {
        xhr.send();
    }
}

//get info about the poll
xhr.onprogress = (e) => {
    if (e.loaded === e.total) {//(xhr.readyState === 4 && xhr.status === 200) {
        let response = (JSON.parse(xhr.responseText));
        let responseData = response.data;

        //set title
        pollTitle.textContent = responseData.title;

        //set buttons
        responseData.answers.forEach((item, index) => {
            let newAnswer = document.createElement("button");
            newAnswer.classList.add("poll__answer");
            newAnswer.textContent = item;
            newAnswer.addEventListener("click", (e) => {
                e.preventDefault();

                alert("Спасибо, ваш голос засчитан!");

                //send request when click the button
                sendXMLHttpRequest(
                    xhrPostResponse, 
                    "POST", 
                    "https://students.netoservices.ru/nestjs-backend/poll", 
                    "Content-type", 
                    "application/x-www-form-urlencoded", 
                    `vote=${response.id}&answer=${index}`
                );
            });

            polAnswers.appendChild(newAnswer);
        });

    }
};

//get info about the results
xhrPostResponse.onprogress = (e) => {
    if (e.loaded === e.total) {//(xhrPostResponse.readyState === 4 && xhrPostResponse.status === 201) {
        let responseData = (JSON.parse(xhrPostResponse.responseText)).stat;

        responseData.forEach((item) => {
            divRes = document.createElement("div");
            divRes.textContent = item.answer + ": " + item.votes;
            card.appendChild(divRes);
        });

        polAnswers.remove();
    }
};

