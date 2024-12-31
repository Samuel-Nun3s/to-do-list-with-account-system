<?php
    include "../../validate.php";
    // Configuração do banco de dados:
    include_once '../config/database.php';

    // Coleta de dados:
    $data = json_decode(file_get_contents("php://input"));
    
    // Inserindo os dados no banco:
    if ($data && isset($data->name) && isset($data->email) && isset($data->password)) {
        $userName = $data->name;
        $userEmail = $data->email;
        $userPassword = $data->password;

        // Criptografando a senha:
        $userPassword = password_hash($userPassword, PASSWORD_DEFAULT);

        $sql = "SELECT `email` FROM `users` WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $userEmail);
        $stmt->execute();

        $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($user) === 1) {
            echo json_encode(["message" => "Email ja cadastrado!"]);
        } else {
            $sql = "INSERT INTO `users`(`name`, `email`, `password`) VALUES (:name, :email, :password)";  
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name', $userName);
            $stmt->bindParam(':email', $userEmail);
            $stmt->bindParam(':password', $userPassword);
            
            if ($stmt->execute()) {
                echo "Usuário Cadastrado com sucesso";
            } else {
                echo "Erro ao cadastras o usuário";
            }
        }
    } else {
        echo "As informações estão incompletas";
    }
    
?>
