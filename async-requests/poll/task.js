const pollTitle = document.querySelector("#poll__title");
const polAnswers = document.querySelector("#poll__answers");
const card = document.querySelector(".card");


let xhr = new XMLHttpRequest();
xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
xhr.send();

let xhrPostResponse = new XMLHttpRequest();

//get info about the poll
xhr.onreadystatechange = (e) => {
    if (xhr.readyState === 4 && xhr.status === 200) {
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
                xhrPostResponse.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
                xhrPostResponse.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhrPostResponse.send(`vote=${response.id}&answer=${index}`);
            });

            polAnswers.appendChild(newAnswer);
        });

    }
};

//get info about the results
xhrPostResponse.onreadystatechange = (e) => {
    if (xhrPostResponse.readyState === 4 && xhrPostResponse.status === 201) {
        let responseData = (JSON.parse(xhrPostResponse.responseText)).stat;

        responseData.forEach((item) => {
            divRes = document.createElement("div");
            divRes.textContent = item.answer + ": " + item.votes;
            card.appendChild(divRes);
        });

        polAnswers.remove();
    }
};

