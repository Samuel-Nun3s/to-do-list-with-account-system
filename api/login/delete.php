<?php 
    // Deletar o usuario do banco:
    include_once '../config/database.php';

    session_start();
    $email = $_SESSION['email'];
    
    if ($email) {
        $sql = "DELETE FROM `users` WHERE `email` = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Usuário deletado com sucesso!"]);
        } else {
            echo json_encode(["message" => "Erro ao deletar o usuário!"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Dados inválidos ou incompletos"]);
        exit;
    }
?>