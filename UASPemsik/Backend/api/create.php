<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
include 'connect.php';
$inputData = file_get_contents("php://input");
$data = json_decode($inputData, true); // Decode JSON menjadi array

$judul = $data['judul'];
$name = $data['nama'];
$tanggal = $data['tanggal'];
$tempat = $data['tempat'];
$keterangan = $data['keterangan'];

if (!is_null($name)) {
    $result = mysqli_query($con, "INSERT INTO bencana (judul, nama, tanggal, tempat, keterangan)
VALUES ('$judul', '$name', '$tanggal', '$tempat', '$keterangan')");
    if ($result) {
        echo json_encode([
            'statusCode' => 200,
            'message' => 'Data input successfully'
        ]);
    } else {
        echo json_encode([
            'message' => 'Data Failed to input'
        ]);
    }
} else {
    echo json_encode(['message' => "Method undefined"]);
}
