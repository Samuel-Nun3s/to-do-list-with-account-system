// Funções do visual:
const buttonVisibility = document.querySelector("#button-visibility");
const spanPassword = document.querySelector("#span-password");
const spanCensored = document.querySelector("#span-censored");
const iconVisibility = document.querySelector("#icon-visibility");

buttonVisibility.addEventListener("click", function() {
    //console.log("tudo certo ate aqui");

    if (spanCensored.classList.contains("hidden")) {
        toggleVisibility();
        iconVisibility.innerHTML = "visibility_off";
    } else {
        toggleVisibility();
        iconVisibility.innerHTML = "visibility";
    }
})

function toggleVisibility() {
    spanCensored.classList.toggle("hidden");
    spanPassword.classList.toggle("hidden");
}

// Funções do Modal:
const divFade = document.querySelector("#fade");

function displayModal(modal) {
    divFade.classList.toggle("hidden");
    modal.classList.toggle("hidden");
}

// Modal Delete:
const openModalDelete = document.querySelector("#open-modal-delete");
const closeModalDelete = document.querySelector("#close-modal-delete");
const modalDelete = document.querySelector("#modal-delete");

openModalDelete.addEventListener("click", function() {
    displayModal(modalDelete);
})

closeModalDelete.addEventListener("click", function() {
    displayModal(modalDelete);
})

// Modal Edit:
const openModalEdit = document.querySelector("#open-modal-edit");
const closeModalEdit = document.querySelector("#close-modal-edit");
const modalEdit = document.querySelector("#modal-edit");

openModalEdit.addEventListener("click", function() {
    displayModal(modalEdit);
})

closeModalEdit.addEventListener("click", function() {
    displayModal(modalEdit);
})

// Funções da conta:
// Exclusão da conta:
const deleteAccount = document.querySelector("#delete-account");

deleteAccount.addEventListener("click", function() {
    deleteUser();
})

async function deleteUser() {
    try {
        const response = await fetch('../api/login/delete.php');

        location.href="../logout.php";

        if (!response.ok) {
            throw new Error(`Erro ao deletar a conta: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (erro) {
        console.error('Erro', erro);
    }
}

// Edição da conta:
const editAccount = document.querySelector("#edit-account");

editAccount.addEventListener("click", function() {
    const userName = document.querySelector("#edit-name");
    const userEmail = document.querySelector("#edit-email");
    const userPassword = document.querySelector("#edit-password");

    editUser(userName.value, userEmail.value, userPassword.value);
})

async function editUser(username, userEmail, userPassword) {
    try {
        const response = await fetch('../api/login/update.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'aplication/json' },
            body: JSON.stringify( {username, userEmail, userPassword} )
        })

        location.reload();

        if (!response.ok) {
            throw new Error(`Erro ao editar a sua conta: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (erro) {
        console.error('Erro:', erro);
    }
}
