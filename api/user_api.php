<?php
session_start();
require('../includes/connection.php');

class User
{
    function user_login($conn, $json)
    {
        $json = json_decode($_POST['json'], true);

        $username = $json['username'];
        $password = $json['password'];

        $hashed_password = md5($password);

        $sql = "SELECT `user_id`, `username`, `password` FROM `tbl_users`";
        $sql .= " WHERE username = :username AND password = :password";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $hashed_password);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return json_encode($result);
        } else {
            return 0;
        }


    }

    function user_registration($conn, $json)
    {
        $json = json_decode($_POST['json'], true);

        $fname = $json['fname'];
        $lname = $json['lname'];
        $username = $json['username'];
        $password = $json['password'];
        $hashed_password = md5($password);

        $check_sql = "SELECT COUNT(*) FROM `tbl_users` WHERE `username` = :username";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bindParam(":username", $username);
        $check_stmt->execute();
        $user_exists = (int) $check_stmt->fetchColumn();

        if ($user_exists > 0) {
            return "Username already exists";
        } else {
            $insert_sql = "INSERT INTO `tbl_users` (`user_fname`, `user_lname`, `username`, `password`)";
            $insert_sql .= " VALUES (:fname, :lname, :username, :password)";
            $insert_stmt = $conn->prepare($insert_sql);
            $insert_stmt->bindParam(":fname", $fname);
            $insert_stmt->bindParam(":lname", $lname);
            $insert_stmt->bindParam(":username", $username);
            $insert_stmt->bindParam(":password", $hashed_password);

            $result = $insert_stmt->execute() ? 1 : 0;
        }
        echo $result;
    }

}

$user = new User();
$json = isset($_POST['json']) ? $_POST['json'] : "";
$op = $_POST['op'];

switch ($op) {
    case "signup":
        echo $user->user_registration($conn, $json);
        break;
    
    case "signin":
        echo $user->user_login($conn, $json);
        break;
}

?>