<?php include "../validate.php" ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <link rel="stylesheet" href="../src/css/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <script src="../src/js/profile.js" defer></script>
</head>
<body>  
    <main>
        <!-- Voltar para Home -->
        <a href="home.php" id="back">
            <span class="material-symbols-outlined">
                arrow_back
            </span>
        </a>

        <!-- Seção Usuário -->
        <section id="user">
            <div id="user-photo">
                <span class="material-symbols-outlined">
                    person
                </span>
            </div>
            <div id="user-info">
                <h3>Nome: <span><?=$_SESSION['login'];?></span></h3>
                <h3>Email: <span><?=$_SESSION['email'];?></span></h3>
                <h3>
                    Senha: <span id="span-password" class="hidden"><?=$_SESSION['password'];?></span>
                        <span id="span-censored">********</span>
                    <button id="button-visibility">
                        <span id="icon-visibility" class="material-symbols-outlined">
                            visibility_off
                        </span>
                    </button>
                </h3>
            </div>
            <div id="accont-settings">
                <button type="button" id="open-modal-delete" class="button button-login">Apagar conta</button>
                <button type="button" id="open-modal-edit" class="button button-login">Editar</button>
            </div>
        </section>
    </main>
    <!-- Div fade -->
    <div id="fade" class="hidden"></div>
    <!-- Modal de Exclusão da conta -->
    <div id="modal-delete" class="modal hidden">
        <div id="delete-header">
            <h3>Tem certeza que quer excluir a sua conta?</h3>
        </div>
        <div id="delete-body">
            <span>A conta será excluida para sempre (isso é muito tempo)</span>
        </div>
        <div id="delete-footer">
            <button type="button" id="delete-account" class="button button-login">Excluir</button>
            <button type="button" id="close-modal-delete" class="button button-login">Voltar</button>
        </div>
    </div>
    
    <!-- Modal de Edição da conta -->
    <div id="modal-edit" class="modal hidden">
        <div id="edit-header">
            <h3>Edição da Conta</h3>
        </div>
        <div id="edit-body">
            <form action="">
                <div class="form-group">
                    <label for="edit-name">Nome</label>
                    <input type="text" name="edit-name" id="edit-name" class="input" value="<?=$_SESSION['login'];?>">
                </div>
                <div class="form-group">
                    <label for="edit-email">Email</label>
                    <input type="email" name="edit-email" id="edit-email" class="input" value="<?=$_SESSION['email'];?>">
                </div>
                <div class="form-group">
                    <label for="edit-password">Senha</label>
                    <input type="text" name="edit-password" id="edit-password" class="input" value="<?=$_SESSION['password'];?>">
                </div>
                <div class="form-group">
                    <button type="button" id="edit-account" class="button button-login">Editar</button>
                    <button type="button" id="close-modal-edit" class="button button-login">Voltar</button>
                </div>
            </form>
        </div>
    </div>
</body> 
</html>