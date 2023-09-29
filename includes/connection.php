<?php

$server = "localhost";
$username = "root";
$password = "";
$dbname = "db_mvreview";

try {
    $conn = new PDO("mysql:host=$server;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    //echo "Connected";
}
catch(PDOException $ex){
    echo $ex->getMessage();
}
?>