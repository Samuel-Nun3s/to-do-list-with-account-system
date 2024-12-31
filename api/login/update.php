<?php 
    // Configuração do banco de dados:
    include_once '../config/database.php';

    // Coleta os dados:
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->username) && isset($data->userEmail) && isset($data->userPassword)) {
        $name = $data->username;
        $email = $data->userEmail;
        $password = $data->userPassword;

        $sql = "UPDATE `users` SET `name` = :name, `email` = :email, `password` = :password WHERE `id` = :id" ;
        $stmt = $pdo->prepare($sql);
        session_start();
        $stmt->bindParam(':id', $_SESSION['newsession']);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', password_hash($password,PASSWORD_DEFAULT));

        if ($stmt->execute()) {
            echo json_encode(["message" => "Usuário atualizado com sucesso!"]);
            
            $_SESSION['login'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['password'] = $password;
        } else {
            echo json_encode(["message" => "Erro ao atualizar o usuário!"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Dados invalidos ou incompletos"]);
    }
?>