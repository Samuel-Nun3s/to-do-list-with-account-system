const btnSignIn = document.querySelector("#sign-in-button");
const btnSignUp = document.querySelector("#sign-up-button");
const body = document.querySelector("body");

btnSignIn.addEventListener("click", function () {
    body.className = "sign-in-js";
});

btnSignUp.addEventListener("click", function () {
    body.className = "sign-up-js";
});
