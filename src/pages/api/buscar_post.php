<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include_once 'conexao.php';

mysqli_set_charset($conn, "utf8mb4");

$busca = isset($_GET['q']) ? trim($_GET['q']) : '';

if ($busca === '') {
    echo json_encode([]);
    exit;
}

$termo = mysqli_real_escape_string($conn, $busca);

$sql = "SELECT * FROM `post` 
        WHERE `nome` LIKE '%$termo%' 
           OR `autor` LIKE '%$termo%' 
           OR `data` LIKE '%$termo%' 
           OR `localizacao` LIKE '%$termo%' 
           OR `categoria` LIKE '%$termo%' 
           OR `area` LIKE '%$termo%' 
           OR `descricao_resumida` LIKE '%$termo%' 
        ORDER BY `id` DESC 
        LIMIT 8";

$resultado = mysqli_query($conn, $sql);

$posts = [];

if ($resultado) {
    while ($linha = mysqli_fetch_assoc($resultado)) {
        $posts[] = $linha;
    }
}

echo json_encode($posts, JSON_UNESCAPED_UNICODE);
?>