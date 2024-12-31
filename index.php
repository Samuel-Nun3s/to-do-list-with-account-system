<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login To-do list</title>
    <link rel="stylesheet" href="src/css/style.css">
    <script src="src/js/login.js" defer></script>
</head>
<body>
    <main id="container">
        <section id="register" class="content">
            <div class="first-column">
                <h2>Bem-vindo de volta</h2>
                <p>Aperte no botão abaixo para acessar sua conta.</p>
                <button id="sign-in-button" class="button button-login">Entrar</button>
            </div>
            <div class="second-column">
                <h2>Criar Conta</h2>
                <form method="POST" class="form-login" id="register-form">
                        <input type="text" name="register-name" id="register-name" class="input input-login" placeholder="Insira seu nome" oninput="verificationName()">
                        <span class="span-register hidden">O nome deve ter no mínimo 2 letras</span>

                        <input type="email" name="register-email" id="register-email" class="input input-login" placeholder="Insira seu email" oninput="verificationEmail(), verificationConfirmEmail()">
                        <span class="span-register hidden">Insira um email válido</span>
                        <input type="email" name="confirm-email" id="confirm-email" 
                        class="input input-login" placeholder="Confirme seu email" oninput="verificationConfirmEmail()">
                        <span class="span-register hidden">Os emails devem ser iguais</span>
                    
                        <input type="password" name="register-password" id="register-password" class="input input-login" placeholder="Insira sua senha" oninput="verificationPassword(), verificationConfirmPassword()">
                        <span class="span-register hidden">A senha deve ter no mínimo 8 caracteres</span>
                        <input type="password" name="confirm-password" id="confirm-password" class="input input-login" placeholder="Confirme sua senha" oninput="verificationConfirmPassword()">
                        <span class="span-register hidden">As senhas devem ser iguais</span>
                        <button class="button button-login" id="register-button" disabled type="button" onclick="createAccount()">Registrar</button>
                </form>
            </div>
        </section>
        <section id="login" class="content">
            <div class="second-column">
                <h2>Login</h2>
                <form method="POST" class="form-login" id="login-form">
                    <div class="form-group">
                        <input type="email" name="email" id="email" class="input input-login" placeholder="Insira seu email..." oninput="verificationEmailLogin()">
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" id="password" class="input input-login" placeholder="insira sua senha..." oninput="verificationPasswordLogin()">
                    </div>
                    <div class="form-group">
                        <span class="hidden" id="login-span">Usuário ou senha inválidos</span>
                    </div>
                    <button class="button button-login" id="login-button" disabled type="button" onclick="login()">Entrar</button>
                </form>
            </div>
            <div class="first-column">
                <h2>Olá, amigo</h2>
                <p>Aperte no botão abaixo para criar sua conta.</p>
                <button id="sign-up-button" class="button button-login">Cadastre-se</button>
            </div>
        </section>
    </main>
</body>
</html>