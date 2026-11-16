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

if (!$data_json || !isset($data_json['acao']) || !isset($data_json['id'])) {
    echo json_encode(["sucesso" => false, "erro" => "Dados incompendentes ou ação não informada."]);
    exit();
}

$acao = $data_json['acao'];
$id   = intval($data_json['id']);

if ($acao === 'deletar') {
    $sql = "DELETE FROM `post` WHERE `id` = $id";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(["sucesso" => true, "mensagem" => "Registro deletado com sucesso!"]);
    } else {
        echo json_encode(["sucesso" => false, "erro" => mysqli_error($conn)]);
    }
} elseif ($acao === 'atualizar') {

    $nome               = mysqli_real_escape_string($conn, $data_json['nome'] ?? '');
    $autor              = mysqli_real_escape_string($conn, $data_json['autor'] ?? '');
    $data               = mysqli_real_escape_string($conn, $data_json['data'] ?? '');
    $localizacao        = mysqli_real_escape_string($conn, $data_json['localizacao'] ?? '');
    $categoria          = mysqli_real_escape_string($conn, $data_json['categoria'] ?? '');
    $area               = mysqli_real_escape_string($conn, $data_json['area'] ?? '');
    $descricao_resumida = mysqli_real_escape_string($conn, $data_json['descricao_resumida'] ?? '');

    $sql = "UPDATE `post` SET 
            `nome` = '$nome', 
            `autor` = '$autor', 
            `data` = '$data', 
            `localizacao` = '$localizacao', 
            `categoria` = '$categoria', 
            `area` = '$area', 
            `descricao_resumida` = '$descricao_resumida' 
            WHERE `id` = $id";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(["sucesso" => true, "mensagem" => "Registro atualizado com sucesso!"]);
    } else {
        echo json_encode(["sucesso" => false, "erro" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["sucesso" => false, "erro" => "Ação inválida."]);
}
