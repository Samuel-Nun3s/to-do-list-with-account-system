<?php
    include "../validate.php";
    // Deletar as tarefas do banco
    include_once 'config/database.php';
    
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->id)) {
        $id = $data->id;

        $sql = "DELETE FROM `tasks` WHERE `id` = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Tarefa excluída com sucesso!"]);
        } else {
            echo json_encode(["message" => "Erro ao excluir a tarefa."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Dados invalidos ou incompletos"]);
        exit;
    }
?>