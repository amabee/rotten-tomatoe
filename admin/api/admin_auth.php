<?php

require("../../includes/connection.php");

class Admin
{
    function signin($json, $conn)
    {

        $json = json_decode($_POST['json'], true);

        $username = $json['username'];
        $password = $json['password'];
        $hashed_pass = md5($password);

        $sql = "SELECT user_id, username, password, isAdmin FROM tbl_users";
        $sql .= " WHERE (username = :username AND password = :password AND isAdmin = 1)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $hashed_pass);
        $stmt->execute();

        $result = $stmt->rowCount() > 0 ? 1 : 0;

        return $result;
    }

}

$admin = new Admin();
$op = $_POST['op'];
$json = isset($_POST['json']) ? $_POST['json'] : "";

switch ($op) {

    case 'signin':
        echo $admin->signin($json, $conn);
        break;
}

?>