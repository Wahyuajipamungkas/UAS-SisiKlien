<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
include 'connect.php';

$inputData = file_get_contents("php://input");
$data = json_decode($inputData, true); // Decode JSON menjadi array


$id = $data['id'];
$result = mysqli_query($con, "DELETE FROM bencana WHERE
id=" . $id);
if ($result) {
    echo json_encode([
        'statusCode' => 200,
        'message' => 'Data delete successfully'
    ]);
} else {
    echo json_encode([
        'message' => 'Data Failed to delete'
    ]);
}
