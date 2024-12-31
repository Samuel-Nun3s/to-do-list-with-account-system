<?php
    include "../validate.php";
    // Atualizar as tarefas do banco:
    include_once 'config/database.php';

    header('Content-Type: application/json; charset=utf-8');

    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->id) && isset($data->name) && isset($data->status)) {
        $id = $data->id;
        $name = $data->name;
        $status = $data->status;

        $sql = "UPDATE `tasks` SET `name`= :name,`status`= :status_task WHERE `id` = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':status_task', $status);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Tarefa atualizada com sucesso!"]);
        } else {
            echo json_encode(["message" => "Erro ao atualizar a tarefa"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Dados invalidos ou incompletos"]);
        exit;
    }
?>
