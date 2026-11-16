<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include_once 'conexao.php';

$sql = "SELECT * FROM `post`";
$resultado = mysqli_query($conn, $sql);

$admins = [];

if ($resultado) {
    while ($linha = mysqli_fetch_assoc($resultado)) {
        $admins[] = $linha;
    }
}

echo json_encode($admins);
?>