<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include 'connect.php';

 $data = mysqli_query($con, "SELECT * FROM bencana");
 $data = mysqli_fetch_all($data, MYSQLI_ASSOC);
 echo json_encode(["statusCode" => 200, "data" => $data]);
?> 
