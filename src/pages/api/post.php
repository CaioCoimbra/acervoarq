<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include_once 'conexao.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT * FROM `post` WHERE `id` = $id";
$resultado = mysqli_query($conn, $sql);

$post = null;

if ($resultado && mysqli_num_rows($resultado) > 0) {
    $post = mysqli_fetch_assoc($resultado);
}

echo json_encode($post);
?>