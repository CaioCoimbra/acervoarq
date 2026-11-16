<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'conexao.php';

$data_json = json_decode(file_get_contents("php://input"), true);

if (!$data_json) {
    echo json_encode(["erro" => "Nenhum dado recebido."]);
    exit();
}

$nome               = mysqli_real_escape_string($conn, $data_json['nome'] ?? '');
$autor              = mysqli_real_escape_string($conn, $data_json['autor'] ?? '');
$data               = mysqli_real_escape_string($conn, $data_json['data'] ?? '');
$localizacao        = mysqli_real_escape_string($conn, $data_json['localizacao'] ?? '');
$categoria          = mysqli_real_escape_string($conn, $data_json['categoria'] ?? '');
$area               = mysqli_real_escape_string($conn, $data_json['area'] ?? '');
$descricao_resumida = mysqli_real_escape_string($conn, $data_json['descricao_resumida'] ?? '');
$texto_explicativo  = mysqli_real_escape_string($conn, $data_json['texto_explicativo'] ?? '');
$criado             = date('Y-m-d H:i:s');

$sql = "INSERT INTO `post` (`nome`, `autor`, `data`, `localizacao`, `categoria`, `area`, `descricao_resumida`, `texto_explicativo`, `criado`) 
        VALUES ('$nome', '$autor', '$data', '$localizacao', '$categoria', '$area', '$descricao_resumida', '$texto_explicativo', '$criado')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["sucesso" => true, "mensagem" => "Cadastrado com sucesso!"]);
} else {
    echo json_encode(["sucesso" => false, "erro" => mysqli_error($conn)]);
}
?>