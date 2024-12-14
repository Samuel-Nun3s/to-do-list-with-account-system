<?php
    // Coletar as tarefas do banco:
    include_once 'config/database.php';

    $sql = "SELECT * FROM `tasks`";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();

    $tasks = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tasks);
?>
