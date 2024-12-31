<?php
    include "../validate.php";
    // Adicionar novas tarefas ao banco:
    include_once 'config/database.php';

    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->id) && isset($data->name) && isset($data->status)) {
        $id = $data->id;
        $name = $data->name;
        $status = $data->status;
        $userId = $_SESSION['newsession'];

        $sql = "INSERT INTO `tasks` (`id`, `name`, `status`, `id-user`) VALUES (:id, :name, :status_task, :userId)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':status_task', $status);
        $stmt->bindParam(':userId', $userId);

        if ($stmt -> execute()) {
            echo json_encode(["message" => "Tarefa adicionada com sucesso!"]);
        } else {
            echo json_encode(["message" => "Erro ao adicionar tarefa."]);
        }
    }
?>
