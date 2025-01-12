<?php
include 'connect.php';

$inputData = file_get_contents("php://input"); // Ambil JSON dari body
$data = json_decode($inputData, true); // Decode JSON

if (!$data) {
    echo json_encode(['message' => 'Invalid JSON']);
    http_response_code(400);
    exit;
}

$id = $data['id'];
$name = $data['nama'];
$tanggal = $data['tanggal'];
$tempat = $data['tempat'];
$keterangan = $data['keterangan'];

$query = "UPDATE product SET judul='$judul', nama='$name', tanggal='$tanggal', tempat='$tempat', keterangan='$keterangan' WHERE id='$id'";
$result = mysqli_query($con, $query);

if ($result) {
    echo json_encode(['message' => 'Data updated successfully']);
} else {
    echo json_encode(['message' => 'Failed to update data']);
}
?>
