<?php
    include "../validate.php";
    // Coletar as tarefas do banco:
    include_once 'config/database.php';

    $userId = $_SESSION['newsession'];

    if ($userId) {
        $sql = "SELECT * FROM `tasks` WHERE `id-user` = :userId";
        $stmt = $pdo -> prepare($sql);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();

        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
    } else {
        echo json_encode(["message" => "Falha ao coletar as tarefas"]);
    }
?>
