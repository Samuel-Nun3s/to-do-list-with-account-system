// 1 - Acionamento dos eventos de click:
const buttonAdd = document.querySelector("#button-add");
const buttonEdit = document.querySelector("#button-edit");
const buttonDisplay = document.querySelector("#button-display");

buttonAdd.addEventListener("click", function() {
    addTask();
})

buttonEdit.addEventListener("click", function() {
    edit();
})

buttonDisplay.addEventListener("click", function() {
    changeDisplay();
})

// 2 - Funcionamento Geral do TO-DO list:
let tasks = [];

// Adicionando uma nova tarefa:
function addTask() {
    const input = document.querySelector("#add-task");
    const title = input.value;

    if (title.length == 0) {
        alert("Nome indisponivel, ou inexistente!");
    } else {
        const taskObj = {
            id: Date.now(),
            name: title,
            status: 0
        }
        
        tasks.push(taskObj); 
        addTaskBD(taskObj);
        addTaskDOM(taskObj);

        input.value = "";
        input.focus();
        console.log(tasks);
    }
}

// Adicionando as tarefas no DOM:
function addTaskDOM(taskObj) {
    const list = document.querySelector("#list");

    const task = createTask(taskObj);
    list.appendChild(task);
}

// Criando a div das tarefas:
function createTask(taskObj) {
    let div = document.createElement("div");
    div.setAttribute("class", "tasks");
    div.setAttribute("data-id", taskObj.id);

    let h3 = document.createElement("h3");
    h3.innerHTML = taskObj.name;
    if (taskObj.status) {
        h3.classList.add("completed");
    } else {
        h3.classList.remove("completed");
    }

    div.appendChild(h3);

    insertButtons("close", "cancel", div);
    insertButtons("edit_square", "edit", div);
    insertButtons("check", "check", div);

    return div;

}

// Inserindo os botões na div da tarefa:
function insertButtons(symbol, type, div) {
    const span = document.createElement("span");
    span.setAttribute("class", "material-symbols-outlined");

    const button = document.createElement("button");
    button.setAttribute("class", `button buttons-task ${type}`);

    span.innerHTML = symbol;
    div.appendChild(button);
    button.append(span);

}

// Variaveis para trazer os dados das tarefas para um escopo global:
let titleTask;
let idTask;

// Manipulando as tarefas ja existentes:
document.addEventListener("DOMContentLoaded", function() {
    loadDataBase();

    const list = document.querySelector("#list");

    list.addEventListener("click", function(event) {
        let task = event.target.closest(".tasks");
        let taskId = task.getAttribute("data-id");
        //console.log(taskId);
        
        let taskIndex = tasks.findIndex(t => t.id == taskId);
        console.log(taskIndex);
        if (taskIndex == -1) { // Verificando se a tarefa foi encontrada pelo id
            console.error("Tarefa não encontrada!");
            return;
        }

        if (event.target.closest(".check")) { // Caso o botão "check" tenha sido clicado
            const h3 = task.querySelector("h3");
            h3.classList.toggle("completed");
            tasks[taskIndex].status = h3.classList.contains("completed");
            if (tasks[taskIndex].status) {
                updateTask(taskId, tasks[taskIndex].name, true);
            } else {
                updateTask(taskId, tasks[taskIndex].name, false);
            }

        } else if (event.target.closest(".cancel")) { // Caso o botão "cancel" tenha sido clicado
            tasks.splice(taskIndex, 1);
            deleteTask(taskId);
            task.remove();

        } else if (event.target.closest(".edit")) { // Caso o botão "edit" tenha sido clicado
            const input = document.querySelector("#edit-task");
            input.focus();
            
            const h3 = task.querySelector("h3");
            titleTask = h3;

            idTask = taskIndex;
            
            changeDisplay();
        }
    })
})

// Editando a tarefa:
function edit() {
    const input = document.querySelector("#edit-task").value.trim();
    if (input.length === 0) {
        alert("Nome indisponivel, ou inexistente!");
    } else {
        const task = tasks[idTask];
        task.name = input;
         
        updateTask(task.id, task.name, task.status);

        titleTask.innerHTML = input;
        
        changeDisplay();
    }
}

// Manipulando o display:
function changeDisplay() {
    const add = document.querySelector("#add");
    const edit = document.querySelector("#edit");
    const list = document.querySelector("#list");

    add.classList.toggle("hidden");
    edit.classList.toggle("hidden");
    list.classList.toggle("hidden");
}

// 3 - Conectando com a API para o armazenamento no banco:
// Endpoint de Adição de novas tarefas:
async function addTaskBD(taskObj) {
    try {
        const response = await fetch('../api/add_task.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskObj)
        })

        if (!response.ok) {
            throw new Error(`Erro ao adicionar tarefa: $response.status`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (erro) {
        console.error('Erro:', erro);
    }
    
}

// Endpoint de Coleta das tarefas armazenadas no banco:
async function getTasks() {
    try {
        const response = await fetch('../api/get_tasks.php');

        // Verifique se a resposta é válida
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // Inspecione a resposta bruta
        const texto = await response.text();
        //console.log('Resposta bruta da API:', texto);

        // Tente converter para JSON
        const tasksApi = JSON.parse(texto);
        return tasksApi;
    } catch (erro) {
        console.error('Erro ao obter tarefas:', erro);
    }
}

async function loadDataBase() {
    try {
        const savedTasks = await getTasks();

        if (savedTasks) {
            savedTasks.forEach(task => {
                tasks.push(task);
                addTaskDOM(task);
            });
            console.log(tasks);
        }
    } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
    }
}

// Endpoint de edição de tarefas criadas:
async function updateTask(id, name, status) {
    try {
        const response = await fetch('../api/update_task.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {id, name, status} )
        })

        if (!response.ok) {
            throw new Error(`Erro ao Atualizar a tarefa: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

// Endpoint de Exclusão de tarefas:
async function deleteTask(id) {
    try {
        const response = await fetch('../api/delet_task.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {id} )
        })

        if (!response.ok) {
            throw new Error(`Erro ao Deletar a tarefa: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (erro) {
        console.error('Erro', erro);
    }
}
