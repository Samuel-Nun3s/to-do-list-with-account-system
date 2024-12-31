// Animação da tela de login:
const btnSignIn = document.querySelector("#sign-in-button");
const btnSignUp = document.querySelector("#sign-up-button");
const body = document.querySelector("body");

btnSignIn.addEventListener("click", function () {
    body.className = "sign-in-js";
});

btnSignUp.addEventListener("click", function () {
    body.className = "sign-up-js";
});

// Formulário de Registro: 
// Coleta dos dados:
const userName = document.querySelector("#register-name");
const email = document.querySelector("#register-email");
const confirmEmail = document.querySelector("#confirm-email");
const password = document.querySelector("#register-password");
const confirmPassword = document.querySelector("#confirm-password");
const spanRegister = document.querySelectorAll(".span-register");
const buttonRegister = document.querySelector("#register-button");
const formRegister = document.querySelector("#register-form");
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

let validateUserName = 0;
let validateEmail = 0;
let validateConfirmEmail = 0;
let validatePassword = 0;
let validateConfirmPassword = 0;

// Funções para setar/remover a mensagem de erro:
function setError(username, span) {
    username.style.border = '2px solid red';
    span.classList.remove("hidden");
}

function removeError(username, span) {
    username.style.border = 'none';
    span.classList.add("hidden");
}

// Funções para validação do formulario:
function setValidate() { return 1 }

function removeValidate() { return 0 }

// Verificação dos formularios:
function verificationName() { // Nome
    let userNameValue = userName.value;

    if (userNameValue.length <= 1) {
        setError(userName, spanRegister[0]);
        validateUserName = removeValidate();
    } else {
        removeError(userName, spanRegister[0]);
        validateUserName = setValidate();
    }
}

function verificationEmail() {
    let emailValue = email.value;

    if (!emailRegex.test(emailValue)) {
        setError(email, spanRegister[1]);
        validateEmail = removeValidate();
    } else {
        removeError(email, spanRegister[1]);
        validateEmail = setValidate();
    }
}

function verificationConfirmEmail() {
    let confirmEmailValue = confirmEmail.value;

    if (email.value != confirmEmailValue) {
        setError(confirmEmail, spanRegister[2]);
        validateConfirmEmail = removeValidate();
    } else {
        removeError(confirmEmail, spanRegister[2]);
        validateConfirmEmail = setValidate();
    }
}

function verificationPassword() {
    let passwordValue = password.value;

    if (passwordValue.length <= 7) {
        setError(password, spanRegister[3]);
        validatePassword = removeValidate();
    } else {
        removeError(password, spanRegister[3]);
        validatePassword = setValidate();
    }
}

function verificationConfirmPassword() {
    let confirmPasswordValue = confirmPassword.value;

    if (password.value != confirmPasswordValue) {
        setError(confirmPassword ,spanRegister[4]);
        validateConfirmPassword = removeValidate();
    } else {
        removeError(confirmPassword, spanRegister[4]);
        validateConfirmPassword = setValidate();
    }
}

formRegister.addEventListener("input", function() {
    if (validateUserName === 1 && validateEmail === 1 && validateConfirmEmail === 1 && validatePassword === 1 && validateConfirmPassword === 1) {
        console.log("Formulario Aceito!");
        buttonRegister.removeAttribute("disabled" , "none");
    } else {
        console.log("Formulario Negado!");
        buttonRegister.setAttribute("disabled", "disabled");
    }
})

// Formulário de Login:
// Coleta dos dados:
const emailLogin = document.querySelector("#email");
const passwordLogin = document.querySelector("#password");
const buttonLogin = document.querySelector("#login-button");
const formLogin = document.querySelector("#login-form");
const spanLogin = document.querySelector("#login-span");

let validateEmailLogin = 0;
let validatePasswordLogin = 0;

function verificationEmailLogin() {
    let emailValueLogin = emailLogin.value;

    if (!emailRegex.test(emailValueLogin)) {
        validateEmailLogin = removeValidate();
    } else {
        validateEmailLogin = setValidate();
    }
}

function verificationPasswordLogin() {
    let passwordValueLogin = passwordLogin.value;

    if (passwordValueLogin.length <= 7) {
        validatePasswordLogin = removeValidate();
    } else {
        validatePasswordLogin = setValidate();
    }
}

function changeSpanLogin() { spanLogin.classList.remove("hidden"); }

formLogin.addEventListener("input", function() {
    if (validateEmailLogin === 1 && validatePasswordLogin === 1) {
        console.log("Login aceito!");
        buttonLogin.removeAttribute("disabled", "none");
    } else {
        console.log("Login negado!");
        buttonLogin.setAttribute("disabled", "disabled");
    }
})

// Conexões com o Back-end:
// Registro:
function resetValidate() {
    validateUserName = 0;
    validateEmail = 0;
    validateConfirmEmail = 0;
    validatePassword = 0;
    validateConfirmPassword = 0;
    validateEmailLogin = 0;
    validatePasswordLogin = 0;
}

function clearField() {
    const inputsForm = document.querySelectorAll(".input");

    for (let c = 0; c < inputsForm.length; c++) {
        inputsForm[c].value = "";
    }
}

function createAccount() {
    if (userName && email && password) {
        const User = {
            name: userName.value,
            email: email.value,
            password: password.value
        }

        register(User);
        clearField();
        resetValidate();
        userName.focus();    
    } else {
        console.error("Informações inexistentes ou inválidas!");
    }
}

async function register(user) {
    try {
        const response = await fetch('./api/login/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'aplication/json' },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            throw new Error(`Erro ao adicionar tarefa: $response.status`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch {
        console.error('Erro:', erro);
    }
}

// Login:
function login() {
    if (emailLogin && passwordLogin) {
        const User = {
            email: emailLogin.value,
            password: passwordLogin.value
        }

        toEnter(User);
        clearField();
        emailLogin.focus();
    } else {
        console.error("Informações inexistentes ou inválidas!")
    }
}

async function toEnter(user) {
    try {
        const response = await fetch('./api/login/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'aplication/json' },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            throw new Error(`Erro ao adicionar tarefa: $response.status`);
        }

        const data = await response.json();
        console.log(data.message); // sucesso
        if (data.message === "senha incorreta") {
            changeSpanLogin();
        } else {
            location.href="./web/home.php";
            // nameLogin = data.message;
        }
    } catch (erro) {
        console.error('Erro:', erro);
    }
}
