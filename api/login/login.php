<?php
    // Configuração do banco de dados:
    include_once '../config/database.php';

    // Coleta dos dados:
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->email) && isset($data->password)) {
        $userEmail = $data->email;
        $userPassword = $data->password;

        
        $sql = "SELECT * FROM `users` WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $userEmail);
        $stmt->execute();
        
        $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($user) === 1) {
            $user = $user[0];

            // Verificando a senha:
            if (!password_verify($userPassword, $user["password"])) {
                echo json_encode(["message" => "senha incorreta"]);
            } else {
                session_status();
                session_start();
                $_SESSION['login'] = $user["name"];
                $_SESSION['newsession'] = $user["id"];
                $_SESSION['email'] = $user["email"];
                $_SESSION['password'] = $userPassword;
                echo json_encode(["message" => "Sucesso ao logar!"]);
            }
        } else {
            echo json_encode(["message" => "Usuario não encontrado!"]);
        }
    }
?>
