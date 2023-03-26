const signBtn = document.getElementById("signin__btn");
const form = document.getElementById("signin__form");
const signinDiv = document.getElementById("signin");
const welcome = document.getElementById("welcome");
const spanUserId = document.getElementById("user_id");
const logoutBtn = document.getElementById("logout__btn");
const xhr = new XMLHttpRequest();

//if user is already logged in, show welcome div
window.onload = (e) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
        spanUserId.textContent = userId;
        welcome.classList.add("welcome_active");
        signinDiv.classList.remove("signin_active");
    }
};

//try to login
signBtn.addEventListener("click", (e) => {
    const formData = new FormData(form);

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/auth");
    xhr.send(formData);

    form.reset();

    e.preventDefault();
});

//logout
logoutBtn.addEventListener("click", (e) => {
    localStorage.removeItem("userId");
    welcome.classList.remove("welcome_active");
    signinDiv.classList.add("signin_active");
});

//get response from the server
//if we find user - show welcome div
xhr.onprogress = (e) => {
    if (e.loaded === e.total) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
            spanUserId.textContent = response.user_id;
            welcome.classList.add("welcome_active");
            signinDiv.classList.remove("signin_active");
            localStorage.setItem("userId", response.user_id);
        }
        else {
            alert("Неверный логин/пароль");
        }
    }
};
