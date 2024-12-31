<?php include "../validate.php" ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-do List</title>
    <link rel="stylesheet" href="../src/css/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <script type="module" src="../src/js/script.js" defer></script>
</head>
<body>
    <header id="nav-header">
        <div id="navbar">
            <div id="nav-title">
                <span class="material-symbols-outlined">
                    list_alt
                </span>
                <h1>
                    To-do list
                </h1>
            </div>
            <div id="nav-user">
               <span class="material-symbols-outlined">
                    person
               </span>
                <h3>
                    Olá,
                    <a href="profile.php" id="name-user"><?php echo $_SESSION['login'];?></a>
                    <a href="../logout.php">Sair</a>
                </h3>
            </div>
        </div>
    </header>
    <main>
        <section id="title">
            <h1>Minha lista de tarefas</h1>
        </section>
        <section id="add">
            <form>
                <input type="text" name="add-task" id="add-task" class="input" maxlength="22" placeholder="Nova tarefa...">
                <input type="button" value="Adicionar" class="button" id="button-add">
            </form>
        </section>
        <section id="edit" class="hidden">
            <header>
                <h2>Edição:</h2>
            </header>
            <form>
                <input type="text" name="edit-task" id="edit-task" class="input" maxlength="22">
                <button class="button buttons-edit" id="button-edit" type="button">
                    <span class="material-symbols-outlined">
                        check
                    </span>
                </button>
                <button class="button buttons-edit" id="button-display" type="button">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button>
            </form>
        </section>
        <section id="list">
            
        </section>
    </main>
</body>
</html>